const { mongoose } = require("../src/models");
const { options } = require("../src/config/db.config");

const db = require("../src/models");

// Import tests
const authServiceTest = require("./services/auth.service.test");

// Before starting tests, make connection to test db
before((done) => {
    mongoose.connect("mongodb://localhost:27017/chat-app_TESTING", options);
    mongoose.connection
    .once("open", () => {
        done();
    })
    .on("error", (err) => console.error(err));
});

// After finishing a test, drop all collections
afterEach((done) => {
    dropCollections()
    .then(() => done())
    .catch((err) => console.error(err));
});

// Helper function to drop all collections
dropCollections = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.collections()
        .then(async (collections) => {
            for (let collection of collections) {
                await collection.drop();
            }
            resolve();
        })
        .catch((err) => reject(err));
    });
}

// Before a test, initialize the database
beforeEach((done) => {
    db.init()
    .then(() => {
        done();
    })
    .catch((err) => console.log(err));
});

// **********TESTS**********
describe("Services", () => {
    describe("authService", authServiceTest.bind(this));
});