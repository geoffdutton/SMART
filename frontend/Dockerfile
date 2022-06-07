FROM node:16-alpine
RUN apk add --no-cache python3 make g++
RUN mkdir /code
ADD ./package.json /code/package.json
ADD ./yarn.lock /code/yarn.lock
WORKDIR /code
RUN yarn install
RUN yarn add --force node-sass
