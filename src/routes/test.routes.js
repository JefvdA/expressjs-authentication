const express = require('express');
const router = express.Router();
const authJwt = require('../middlewares/authJwt.middleware');
const testController = require('../controllers/test.controller');

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test endpoints with authentication
 */

/**
 * @swagger
 * /api/test/all:
 *   get:
 *     description: Simple endpoint that's available for everyone, no authentication required.
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/all', testController.allAcces);

/**
 * @swagger
 * /api/test/user:
 *   get:
 *     description: Simple endpoint that's available for authenticated users.
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Forbidden (no authentication)
 */
router.get('/user', [authJwt.verifyToken], testController.userBoard);

/**
 * @swagger
 * /api/test/moderator:
 *   get:
 *     description: Simple endpoint that's available for authenticated moderators.
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Forbidden (no authentication)
 *       403:
 *         description: Forbidden (no moderator role or higher role)
 */
router.get(
    '/moderator', [
    authJwt.verifyToken,
    authJwt.isModerator
],
    testController.moderatorBoard
);

/**
 * @swagger
 * /api/test/admin:
 *   get:
 *     description: Simple endpoint that's available for authenticated admins.
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: A successful response
 *       401:
 *         description: Forbidden (no authentication)
 *       403:
 *         description: Forbidden (no admin role)
 */
router.get(
    '/admin', [
    authJwt.verifyToken,
    authJwt.isAdmin
],
    testController.adminBoard
);

module.exports = router;