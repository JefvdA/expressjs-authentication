const { mongoose } = require("../../src/models");
const { options } = require("../../src/config/db.config");
const chai = require("chai");

// Assertion style
const expect = chai.expect;

const authService = require("../../src/services/auth.service");
const db = require("../../src/models");

// Before starting tests, make connection to test db
before((done) => {
    mongoose.connect("mongodb://localhost:27017/chat-app_TESTING", options);
    mongoose.connection
    .once("open", () => done())
    .on("error", (err) => console.error(err));
});

// After finishing a test, drop all collections
afterEach(async () => {
    await mongoose.connection.db.collections()
        .then(async (collections) => {
            for (let collection of collections) {
                await collection.drop();
            }
        })
        .catch((err) => console.log(err));
});

// Before a test, initialize the database
beforeEach((done) => {
    db.init()
    .then(() => done());
});

// **********TESTS**********
describe("Auth service", () => {
    describe("registerUser()", () => {
        it("Should successfully register a user", () => {
            const username = "test";
            const email = "test@gmail.com"
            const password = "test1234!";

            return authService.registerUser(username, email, password);
        });
    });
});