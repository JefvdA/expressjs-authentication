const express = require('express');
const router = express.Router();
const helloworldController = require('../controllers/helloworld.controller');

router.get('/', helloworldController.get);

module.exports = router