const express = require('express');
const router = express.Router();
const authJwt = require('../middlewares/authJwt.middleware');
const testController = require('../controllers/test.controller');

router.get('/all', testController.allAcces);
router.get('/user', [authJwt.verifyToken], testController.userBoard);
router.get(
    '/moderator', [
        authJwt.verifyToken,
        authJwt.isModerator
    ],
    testController.moderatorBoard
);

module.exports = router;