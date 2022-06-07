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
                return reject(err.message);
            }

            if (!role) {
                return reject('There is no role named "user"');
            }
    
            user.roles.push(role._id);
    
            user.save((err, user) => {
                if (err) {
                    return reject(err.message);
                }
        
                return resolve(`${user.username} was registered successfully!`);
            });
        });
    });
}

loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username
        })
        .populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                return reject(err.message);
            }

            if (!user) {
                return reject('User not found');
            }

            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return reject('Invalid password');
            }

            return resolve(user);
        });
    });
}

assignRoleToUser = (username, newRole) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username
        })
        .populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                return reject(err.message);
            }

            if (!user) {
                return reject('User not found');
            }

            var roles = user.roles.map(role => role.name);
            if(roles.includes(newRole)) {
                return reject(`${username} already has ${newRole} role.`);
            }

            Role.findOne({
                name: newRole
            })
            .exec((err, role) => {
                if (err) {
                    return reject(err.message);
                }

                if (!role) {
                    return reject('Role not found');
                }

                user.roles.push(role._id);

                user.save((err, user) => {
                    if (err) {
                        return reject(err.message);
                    }

                    return resolve(`${username} was assigned ${newRole} role successfully!`);
                });
            });
        });
    });
}

module.exports = {
    registerUser,
    loginUser,
    assignRoleToUser
}