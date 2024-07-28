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

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV GOOGLE_CHROME_BIN=/usr/bin/chromium-browser
ENV BOARD_URL=file:///usr/app/dist/index.html

WORKDIR /usr/app


RUN chmod -R 777 /tmp
COPY ./server/package*.json ./

RUN npm ci --omit=dev
COPY ./server/dist /usr/app/src

COPY ./board/dist /usr/app/dist

EXPOSE 8611


ENV SLACK_ACCESS_TOKEN $SLACK_ACCESS_TOKEN


CMD [ "dumb-init", "node", "/usr/app/src/index.js" ]