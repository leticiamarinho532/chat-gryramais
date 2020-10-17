FROM node:12.18.3-alpine3.9

RUN apk add --no-cache bash yarn

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn

EXPOSE 4000

ENTRYPOINT ["yarn", "start"]