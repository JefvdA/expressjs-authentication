const db = require('../models');
const User = db.user;
const Role = db.role;

const bcrypt = require('bcryptjs');

registerUser = (username, email, password) => {
    const user = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password),
    });

    return new Promise((resolve, reject) => {
        Role.findOne({
            name: 'user'
        })
        .exec((err, role) => {
            if (err) {
                reject(err.message);
            }

            if (!role) {
                reject('There is no role named "user"');
            }
    
            user.roles.push(role._id);
    
            user.save((err, user) => {
                if (err) {
                    reject(err.message);
                }
        
                resolve(`${user.username} was registered successfully!`);
            });
        });
    });
}

getUserByName = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username
        })
        .populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                reject(err.message);
            }

            if (!user) {
                reject('User not found');
            }

            resolve(user);
        });
    });
}

module.exports = {
    registerUser,
    getUserByName
}