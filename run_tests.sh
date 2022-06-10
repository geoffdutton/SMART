#!/usr/bin/env bash

export EXTERNAL_POSTGRES_PORT=5499
export EXTERNAL_REDIS_PORT=6399
export EXTERNAL_BACKEND_PORT=8999
# make sure dev env is down
docker-compose down
docker-compose -p smart_backend_tests down -v
docker-compose -p smart_backend_tests build
docker-compose -p smart_backend_tests run --rm smart_backend ./run_tests.sh
docker-compose -p smart_backend_tests down -v
