const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        res.status(401).send({ 
            auth: false, 
            message: 'No token provided.' 
        });
        return;
    }
    jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
        if (err) {
            res.status(401).send({ 
                auth: false, 
                message: 'Failed to authenticate token.' 
            });
            return;
        }
        req.userId = decoded.id;
        next();
    });
}

isModerator = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            res.status(500).send({ 
                message: err 
            });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if(err) {
                    res.status(500).send({ 
                        message: err 
                    });
                    return;
                }

                if(roles.indexOf('moderator') > -1) {
                    next();
                    return;
                }

                res.status(403).send({ 
                    message: 'You are not authorized to perform this action.' 
                });
                return;
            }
        )
    });
}

const authJwt = {
    verifyToken,
    isModerator
}

module.exports = authJwt;