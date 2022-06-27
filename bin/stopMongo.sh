#!/bin/bash
DB_CONTAINER_NAME=mongodb

if [ ! "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "$DB_CONTAINER_NAME is not running"
else
    docker stop $DB_CONTAINER_NAME
    echo "Stopped container $DB_CONTAINER_NAME"
    docker rm $DB_CONTAINER_NAME
    echo "Removed exited container $DB_CONTAINER_NAME"
fi