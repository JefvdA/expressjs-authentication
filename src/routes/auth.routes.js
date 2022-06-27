const express = require('express');
const router = express.Router();
const verifySignup = require('../middlewares/verifySignup.middleware');
const authJwt = require('../middlewares/authJwt.middleware');
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth endpoints for user management
 */

/**
 * @swagger
 * definitions:
 *   Signup:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         description: Username of the user
 *       email:
 *         type: string
 *         description: Email of the user
 *       password:
 *         type: string
 *         description: Password of the user
 *   Signin:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         description: Username of the user
 *       password:
 *         type: string
 *         description: Password of the user
 *   AssigngRole:
 *     type: object
 *     required:
 *       - username
 *       - role
 *     properties:
 *       username:
 *         type: string
 *         description: Username of the user
 *       role:
 *         type: string
 *         description: Name of the role you want to assign to the user
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     description: Signup a new user
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/Signup"
 *     responses:
 *       200:
 *         description: User successfully registered
 *       400:
 *         description: Username or email already exists
 */            
router.post(
    '/signup', 
    [
        verifySignup.checkDuplicateUsernameOrEmail,
        verifySignup.checkRolesExist
    ], 
    authController.signup
);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     description: Signin with username and password
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/Signin"
 *     responses:
 *       200:
 *         description: Succesful login
 *       500:
 *         description: Error when logging in / wrong credentials
 */     
router.post('/signin', authController.signin);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     description: Signout the user from the application
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Succesfully logged out
 *       500:
 *         description: Error when logging out
 */
router.post('/signout', authController.signout);

/**
 * @swagger
 * /api/auth/assignrole:
 *   post:
 *     description: Assign a role to a user. Only users with the role 'admin' are authorized to preform this action.
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/AssigngRole"
 *     responses:
 *       200:
 *         description: Succesfullly assigned role to user
 *       500:
 *         description: Error when assigning role / role or user don't exist / user already has the role
 */  
router.post(
    '/assignrole',
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ], 
    authController.assignRole
);

module.exports = router;