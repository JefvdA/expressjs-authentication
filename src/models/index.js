const mongoose = require('mongoose');
const RoleModel = require('./role.model');
const UserModel = require('./user.model');

const db = {};
db.mongoose = mongoose;

db.user = UserModel.User;
db.role = RoleModel.Role;

db.ROLES = ["user", "moderator", "admin"];

db.init = function() {
    return new Promise(async (resolve, reject) => {
        await RoleModel.init(db.ROLES);
        await UserModel.init();
        resolve();
    });
}

module.exports = db;
