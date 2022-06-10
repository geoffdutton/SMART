FROM node:16-alpine
#RUN apk add --no-cache python3 make g++
RUN mkdir /code
WORKDIR /code
ADD ./package.json .
ADD ./package-lock.json .
ADD ./server.js .
RUN npm install
