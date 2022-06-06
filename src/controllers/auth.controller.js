const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });

    if (req.body.roles) {
        Role.find({ 
                name: { $in: req.body.roles }
        })
        .exec((err, roles) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            
            user.roles = roles.map(role => role._id);
        });
    } else {
        Role.findOne({
            name: 'user'
        })
        .exec((err, role) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            user.roles = [role._id];
        });
    }

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        return res.send({ message: 'User was registered successfully!' });
    });
}

signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate('roles', '-__v')
    .exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ 
                accessToken: null,
                message: 'Invalid Password!' 
            });
        }

        var token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`); // "user" -> "ROLE_USER"

        req.session.token = token;
        req.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    });
}

signout = (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: 'Your logged out successfully!' });
    } catch (error) {
        this.next(error);
    }
}

module.exports = {
    signup,
    signin,
    signout
}