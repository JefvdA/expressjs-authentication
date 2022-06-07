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

module.exports = {
    registerUser,
}