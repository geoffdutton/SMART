#!/usr/bin/env bash

docker-compose build --no-cache smart_frontend
docker-compose run --rm smart_frontend npm run build
