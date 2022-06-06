const db = require('../models');
const User = db.user;
const Role = db.role;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (user) {
            res.status(400).send({
                message: 'Username already exists'
            });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            if (user) {
                res.status(400).send({
                    message: 'Email already exists'
                });
                return;
            }

            next();
        });
    });
}

checkRoleExists = (req, res, next) => {
    Role.findOne({
        name: req.body.role
    })
    .exec((err, role) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (!role) {
            res.status(400).send({
                message: 'Role does not exist'
            });
            return;
        }

        next();
    });
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExists
}

module.exports = verifySignUp;