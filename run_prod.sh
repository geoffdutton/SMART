#!/usr/bin/env bash

# make sure dev env is down
docker-compose rm -fsv redis
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
docker-compose -f docker-compose.yml -f docker-compose.prod.yml rm -fsv redis
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
