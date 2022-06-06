const authJwt = require('./authJwt.middleware');
const verifySignup = require('./verifySignup.middleware');

module.exports = {
    authJwt,
    verifySignup
}