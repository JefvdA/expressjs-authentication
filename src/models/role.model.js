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
            else if (err){
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

module.exports = {
    Role,
    init
};