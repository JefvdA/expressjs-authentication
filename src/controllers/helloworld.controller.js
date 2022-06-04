const helloworldMessage = require('../services/helloworld.service');

function get(req, res, next) {
    try {
        message = helloworldMessage.get();

        res.json({'message': message});
    } catch (error) {
        console.error(`Error in helloworld.controller.get: ${error}`);
        next(error);
    }
}

module.exports = {
    get
}