# Chat-app-BE
Back-end system for a chat-app made in nodejs, using expressjs.

As databse, this project uses mongodb, more on how to set that up later in this guide.

If you want to know more about the project structure, naming conventions... look at our [wiki](https://github.com/JefvdA/Chat-app-BE/wiki).

In this guide, you will be explained how to run this project on your own device.

* [Setup mongodb](#Mongodb-Setup)
* [Run the project](#Setup)
* [Running tests](#Testing)

***

# Mongodb Setup
In this part of the guide, the setup for [mongodb](https://www.mongodb.com/docs/manual/installation/) is explained.

*Ofcourse, you can use any tutorial you want to setup a mongodb installation.*

It is recommended that you install mongodb in a docker container, as it's much easier, and makes the install non-permanent. It's very easy to delete the docker container when you don't want to use mongodb anymore.

Setup mongodb without authentication (a root user account):
```
sudo docker run --name mongodb -d -p 27017:27017 mongo
```

Setup mongodb with a root user account (of course you can change the uesrname and password to your liking):
```
sudo docker run \
--name mongodb \
-d -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=admin \
mongo
```

[Mongosh](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install) is a new addition for mongodb, it's an interactive shell to interact with your database.

This can also be used to test your database connection, and to test if the authentication was succesfull.

To test the connection, run following command:
```
mongosh
```

To test a connection, and also login as the created root user:
```
mongosh -u [username] -p [password]
```

To start, stop or remove the docker container, use following commands:
```
sudo docker start [containerName]
sudo docker stop [containerName]
sudo docker rm [containerName]
```

***

# Setup
After cloning the repo, and setting up the database, it's very easy to run the application.

**install the node modules**: `npm install` <br>
**run the application**: `npm start` or `node index.js` or use [nodemon](https://www.npmjs.com/package/nodemon) to make use of hot-reloading: `nodemon`

***

# Testing
If you are contributing to this project, but don't want to manualy test to see if everything still works, you can just run the tests this project has.

***Unfortunatly, we don't have tests currently so this is a feature for later!***
