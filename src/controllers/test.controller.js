allAcces = (req, res, next) => {
    res.status(200).send("Public content.");
}

userBoard = (req, res, next) => {
    res.status(200).send("User content.");
}

moderatorBoard = (req, res, next) => {
    res.status(200).send("Moderator content.");
}

adminBoard = (req, res, next) => {
    res.status(200).send("Admin content.");
}

module.exports = {
    allAcces,
    userBoard,
    moderatorBoard,
    adminBoard
}