#!/bin/bash
sudo docker run \
--name mongodb \
-d -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=admin \
mongo