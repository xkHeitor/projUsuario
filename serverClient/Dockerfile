FROM node:alpine

WORKDIR /app/

COPY bower.json ./

RUN apk update && apk add --no-cache git

RUN npm i && npm install -g bower && bower install --allow-root

COPY . .