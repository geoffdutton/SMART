FROM node:16-alpine
RUN apk add --no-cache python3 make g++
RUN mkdir /code
WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

