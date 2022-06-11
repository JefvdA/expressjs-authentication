const mongoose = require('mongoose');

const Role = mongoose.model(
    'Role', 
    new mongoose.Schema({
        name: String,
    }),
);

function init(roles){
    return new Promise((resolve, reject) => {
        Role.estimatedDocumentCount((err, count) => {
            if(!err && count === 0){
                roles.forEach(role => {
                    new Role({
                        name: role,
                    })
                    .save(err => {
                        if (err) {
                            return reject(err);
                        }
                        
                        return resolve(`${role} role created`);
                    })
                });
            }
        });
    });
}

module.exports = {
    Role,
    init
};