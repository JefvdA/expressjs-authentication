const express = require('express');
const router = express.Router();
const verifySignup = require('../middlewares/verifySignup.middleware');
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

module.exports = router;