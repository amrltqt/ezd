#!/bin/bash

# This script is used to run the integration tests for EZD
workdir=$(pwd)
echo "Start integration tests"
echo "Workdir: $workdir"

branch_name=$(git branch --show-current)
test_id="$branch_name-$(date +%s)"
echo "Test ID: $test_id"

mkdir -p ./server/boards
VITE_PLAYGROUND_PANEL=true npm --prefix ./board run build
mv ./board/dist/index.html ./server/boards/playground.html

# Build the board without playground panel
VITE_PLAYGROUND_PANEL=false npm --prefix ./board run build
mv ./board/dist/index.html ./server/boards/index.html

# Transpile typescript to javascript
npm --prefix ./server run build

# Build the docker image
docker build -t amrltqt/ezd:$test_id .

# test if something is already running on port 8611
if [ "$(lsof -i :8611)" ]; then
    echo "Port 8611 is already in use"
    exit 1
fi

docker run -d -p 8611:8611 -e SLACK_ACCESS_TOKEN=$SLACK_ACCESS_TOKEN --name $test_id amrltqt/ezd:$test_id

# Wait until curl on status gives us a status: "OK"
server_status=$(curl -s http://localhost:8611/status | jq '.status')
echo "Status: $server_status"
while [ "$server_status" != "\"ok\"" ]; do
    echo "Waiting for the server to start"
    sleep 1
    server_status=$(curl -s http://localhost:8611/status | jq '.status')
done

response=$(curl -s -X POST -H "Content-Type: application/json" \
    -d @./tests/integration/payload.json \
    http://localhost:8611/render)

echo "Response: $response"

echo "Test the status response"
if [ "$(echo $response | jq 'has("id")')" == "true" ]; then
    echo "Integration tests passed"
else
    echo "Integration tests failed"
    echo $response
    exit 1
fi

echo "Waiting for log with 'queue.process.distributed'..."
while true; do
    logs=$(docker logs $test_id 2>&1 | grep "queue.process.distributed")
    echo $logs | jq '.task_id'
    if [[ -n $logs ]]; then
        echo "Log found:"
        echo "$logs"
        break
    fi
    sleep 1
done


echo "Stop and remove the docker container"
docker kill $test_id
docker rm $test_id
docker image rm -f amrltqt/ezd:$test_id