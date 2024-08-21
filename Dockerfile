FROM node:alpine 

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    dumb-init

ARG SLACK_ACCESS_TOKEN
ARG BOARDS_PATH=./server/boards

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV GOOGLE_CHROME_BIN=/usr/bin/chromium-browser
ENV BOARD_URL=/usr/app/boards/index.html
ENV PLAYGROUND_BOARD_URL=/usr/app/boards/playground.html
ENV SLACK_ACCESS_TOKEN=$SLACK_ACCESS_TOKEN

WORKDIR /usr/app

RUN chmod -R 777 /tmp
COPY ./server/package*.json ./

RUN npm ci --omit=dev
COPY ./server/dist /usr/app/src

COPY ${BOARDS_PATH} /usr/app/boards

EXPOSE 8611


CMD [ "dumb-init", "node", "/usr/app/src/index.js" ]