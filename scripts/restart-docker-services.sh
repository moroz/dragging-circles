#!/bin/sh -e

DOCKER_COMPOSE_PATH=/usr/local/shida/docker-compose.yml
docker-compose -f $DOCKER_COMPOSE_PATH restart nginx
