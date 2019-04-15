#!/bin/bash
# Usage: bash docker_run.sh [TAG] [HTTP_PORT] [NODEJS_PORT] 

TAG=${1:-latest}
HTTP_PORT=${2:-80}
NODEJS_PORT=${3:-3000}
HOST_IP=$(ip route get 1 | awk '{ print $NF; exit }')

# Run container, add host ip to container's /etc/hosts, and publish ports
docker run -it \
	-p ${HTTP_PORT}:${HTTP_PORT} -p ${NODEJS_PORT}:${NODEJS_PORT} \
	--env HOST_IP=${HOST_IP} \
	--env HTTP_PORT=${HTTP_PORT} \
	--env NODEJS_PORT=${NODEJS_PORT} \
	graph-theory:${TAG}
