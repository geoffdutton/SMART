#!/usr/bin/env bash

# make sure dev env is down
docker-compose rm -fsv redis
docker-compose down
if [[ $* == --build ]]; then
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
else
  echo "Rebuilding containers with option: --build"
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
fi

docker-compose -f docker-compose.yml -f docker-compose.prod.yml rm -fsv redis
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
