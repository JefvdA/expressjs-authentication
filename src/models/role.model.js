const mongoose = require('mongoose');

const Role = mongoose.model(
    'Role', 
    new mongoose.Schema({
        name: String,
    }),
);

function init(roleNames){
    return new Promise((resolve, reject) => {
        Role.estimatedDocumentCount((err, count) => {
            if(!err && count === 0){
                let roles = [];
                roleNames.forEach(role => {
                    roles.push(new Role({name: role}));
                });
                Role.insertMany(roles)
                .then(() => resolve())
                .catch(err => reject(err));
            }
        });
    });
}

module.exports = {
    Role,
    init
};