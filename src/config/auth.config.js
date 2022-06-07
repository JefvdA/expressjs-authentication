require('dotenv').config();

module.exports = {
    cookieSecret: process.env.COOKIE_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: 86400, // 24 hours
}