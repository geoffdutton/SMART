#!/usr/bin/env bash

# make sure dev env is down
docker-compose rm -fsv redis
docker-compose down
if [[ $* == --build ]]; then
  docker-compose up
else
  echo "Rebuilding containers with option: --build"
  docker-compose up --build
fi

docker-compose rm -fsv redis
docker-compose down
