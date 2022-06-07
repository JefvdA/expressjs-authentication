const authConfig = require('../config/auth.config');

const jwt = require('jsonwebtoken');

const authService = require('../services/auth.service');

signup = (req, res) => {
    const { username, email, password } = req.body;

    authService.registerUser(username, email, password)
    .then(message => {
        res.status(200).send({
            message: message
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the user.'
        });
    });
}

signin = (req, res) => {
    const { username, password } = req.body;

    authService.loginUser(username, password)
    .then(user => {
        var authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`); // "user" -> "ROLE_USER"

        var token = jwt.sign({ id: user.id }, authConfig.jwtSecret, {
            expiresIn: authConfig.jwtExpiration
        });

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
        res.status(200).send({
            message: message
        });
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