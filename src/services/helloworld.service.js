var message = "Hello World!";

function get() {
    return message;
}

function set(newMessage) {
    message = newMessage;
}

module.exports = {
    get,
    set
}