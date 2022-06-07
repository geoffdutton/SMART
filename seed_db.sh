#!/usr/bin/env bash

docker-compose build
docker-compose run --rm smart_backend ./migrate.sh
docker-compose run --rm smart_backend ./seed_smart.sh
