build:
	mkdir -p ./server/boards
	VITE_PLAYGROUND_PANEL=true npm --prefix ./board run build
	mv ./board/dist/index.html ./server/boards/playground.html

	# Build the board without playground panel
	VITE_PLAYGROUND_PANEL=false npm --prefix ./board run build
	mv ./board/dist/index.html ./server/boards/index.html

	# Transpile typescript to javascript
	npm --prefix ./server run build

	# Build the docker image
	docker build -t amrltqt/ezd:latest .

dev-board:
	npm --prefix ./board run dev

dev-server:
	mkdir -p ./server/boards
	VITE_PLAYGROUND_PANEL=true npm --prefix ./board run build
	mv ./board/dist/index.html ./server/boards/playground.html

	# Build the board without playground panel
	VITE_PLAYGROUND_PANEL=false npm --prefix ./board run build
	mv ./board/dist/index.html ./server/boards/index.html

	npm --prefix ./server start

integration-tests:
	bash ./tests/integration/test.sh

push-image:
	docker push amrltqt/ezd:latest

publish: integration-tests build push-image