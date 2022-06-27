require('dotenv').config();

var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;

var options = {
    "authSource": "admin",
    "user": username,
    "pass": password
}

module.exports = {
    url: `${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`,
    options: options,
}