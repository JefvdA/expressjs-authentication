const express = require('express');
const router = express.Router();
const verifySignup = require('../middlewares/verifySignup.middleware');
const authJwt = require('../middlewares/authJwt.middleware');
const authController = require('../controllers/auth.controller');

router.post(
    '/signup', 
    [
        verifySignup.checkDuplicateUsernameOrEmail,
        verifySignup.checkRolesExist
    ], 
    authController.signup
);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.post(
    '/assignrole',
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ], 
    authController.assignRole
);

module.exports = router;