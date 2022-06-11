const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Role } = require('./role.model');

const User = mongoose.model(
    'User', 
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
    }),
);

function init() {
    return new Promise((resolve, reject) => {
        User.estimatedDocumentCount((err, count) => {
            if(!err && count === 0){
                Role.findOne({
                    name: 'admin'
                })
                .exec((err, role) => {
                    if (err) {
                        return reject(err);
                    }

                    new User({
                        username: 'admin',
                        email: 'admin@gmail.com',
                        password: bcrypt.hashSync('admin'),
                        roles: [role._id],
                    })
                    .save((err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(`${user.username} user created`);
                    });
                });
            }
        });
    });
}

module.exports = {
    User,
    init
};