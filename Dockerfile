FROM node:alpine 

WORKDIR /app/serverClient

COPY ./serverClient/ ./

RUN apk update && apk add --no-cache git && npm i && npm install -g bower && bower install --allow-root

WORKDIR /app/restapi

COPY ./restapi/ ./

RUN npm i

EXPOSE 4000

CMD ["npm", "start"]