FROM node:12.18.3-alpine3.9

RUN apk add --no-cache bash

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]