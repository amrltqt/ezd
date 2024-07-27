# Use the official Node.js Alpine image as the base image
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
ENV BOARD_URL=file:////usr/app/board/dist/index.html

# Set the working directory inside the container
WORKDIR /usr/app

RUN chmod -R 777 /tmp

# Copy the package.json and package-lock.json files to the container
COPY ./server/package*.json ./

# Install the project dependencies
RUN npm ci --omit=dev

COPY ./board/dist /usr/app/board/dist

# Copy the rest of the application code to the container
COPY ./server/src /usr/app/server/src

# Expose the port on which your Express server is running (default is 3000)
EXPOSE 3000

# Start the Express server
CMD [ "dumb-init", "node", "/usr/app/server/src/index.js" ]