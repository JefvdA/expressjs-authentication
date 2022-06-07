const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authService = require('../services/auth.service');

signup = (req, res) => {
    const { username, email, password } = req.body;

    authService.registerUser(username, email, password)
    .then(message => {
        res.status(200).send(message);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the user.'
        });
    });
}

signin = (req, res) => {
    const { username, password } = req.body;

    authService.getUserByName(username)
    .then(user => {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ 
                accessToken: null,
                message: 'Invalid Password!' 
            });
        }

        var token = jwt.sign({ id: user.id }, authConfig.jwtSecret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`); // "user" -> "ROLE_USER"

        req.session.token = token;
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err || 'Some error occurred while retrieving your user.'
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

assignRole = (req, res) => {
    const { username, role } = req.body;

    authService.assignRoleToUser(username, role)
    .then(message => {
        res.status(200).send(message);
    })
    .catch(err => {
        res.status(500).send({
            message: err || 'Some error occurred while assigning the role.'
        });
    });
}

module.exports = {
    signup,
    signin,
    signout,
    assignRole
}