#!/bin/bash
DB_CONTAINER_NAME=mongodb

if [ ! "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
        # Cleanup
        docker rm $DB_CONTAINER_NAME
        echo "Removed exited container $DB_CONTAINER_NAME"
    fi
    sudo docker run \
    --name $DB_CONTAINER_NAME \
    -d -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    mongo
    echo "Started container $DB_CONTAINER_NAME"
else
    echo "$DB_CONTAINER_NAME is already running"
fi