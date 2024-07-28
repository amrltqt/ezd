# EZD

EZD stands for Easy Dashboard. It is a software that produce dashboard images that can be distributed on communication channels like Slack, Email, etc.

## How it works

The board contains a react app that used to render dashboard.

A server is used to require the rendering of dashboard thanks to puppeteer. The server is a nodejs server that uses express to handle requests.

Each rendering request is pushed to a local queue and processed by as soon as possible by pupeteer.

The image is stored in a local file and the path is returned to the client.

The client can then download the image to the target location. (Slack, Email, etc.)

## Installation

### Docker (Recommended)

```shell
docker run -p 8611:8611 amrltqt/ezd:latest
```

## Development

### Build the app

Building the app create a single index.html bundle that can be served by a web server.

```bash
cd board
VITE_DEBUG_PANEL=false npm run build
```

### Configure Slack

```shell
SLACK_ACCESS_TOKEN=xoxb-xxxx-xxxx-xxxx
docker run -p 8611:8611 -e SLACK_ACCESS_TOKEN=$SLACK_ACCESS_TOKEN amrltqt/ezd:latest
```
