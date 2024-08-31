# EZD

EZD stands for Easy Dashboard. It is a software that produce dashboard images that can be distributed on communication channels like Slack, Email, etc.

## How it works

It's a web server that accept a rendering request with all the required information to produce a dashboard image. The server will render the dashboard and distribute the image to the configured channels.

## Installation

### Docker (Recommended)

```shell
docker run -p 8611:8611 amrltqt/ezd:latest
```

If you want to use the Slack integration, you need to provide a Slack access token.

```shell
SLACK_ACCESS_TOKEN=xoxb-xxxx-xxxx-xxxx
docker run -p 8611:8611 -e SLACK_ACCESS_TOKEN=$SLACK_ACCESS_TOKEN amrltqt/ezd:latest
```

## Contribute

### Integration tests

The integration tests is the easiest way to start developing on ezd. It will start the server and run some tests against it.

```shell
make integration-tests
```
