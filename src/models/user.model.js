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

async function init() {
    return new Promise(async (resolve, reject) => {
        User.estimatedDocumentCount()
        .then((count, err) => {
            if(!err && count === 0){
                Role.findOne({
                    name: 'admin'
                })
                .exec((err, role) => {
                    if (err) {
                        return reject(err);
                    }

                    if(!role) {
                        return reject('There is no role named "admin"');
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
            else if (err){
                reject(err);
            }
            else {
                resolve();
            }
        })
    });
}

module.exports = {
    User,
    init
};