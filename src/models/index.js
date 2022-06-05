const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "moderator"];

db.init = function() {
    db.role.init(db.ROLES);
}

module.exports = db;
