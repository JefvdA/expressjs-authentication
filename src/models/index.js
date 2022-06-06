const mongoose = require('mongoose');
const RoleModel = require('./role.model');
const UserModel = require('./user.model');

const db = {};
db.mongoose = mongoose;

db.user = UserModel.User;
db.role = RoleModel.Role;

db.ROLES = ["user", "moderator", "admin"];

db.init = function() {
    RoleModel.init(db.ROLES);
    UserModel.init();
}

module.exports = db;
