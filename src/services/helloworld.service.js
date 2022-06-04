var message = "Hello World!";

function get() {
    return message;
}

function set(newMessage) {
    message = newMessage;

    return message;
}

module.exports = {
    get,
    set
};