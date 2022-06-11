const chai = require("chai");

// Assertion style
const expect = chai.expect;

const authService = require("../../src/services/auth.service");

// **********TESTS**********
function suite() {
    describe("registerUser()", () => {
        const username = "test";
        const email = "test@gmail.com"
        const password = "test1234!";
        it("Should successfully register a user", async () => {
            const result = await authService.registerUser(username, email, password)
            expect(result).to.be.equal(`${username} was registered successfully!`);
        });
        it("Should fail registering a user when no username was given", async () => {
            const result = await authService.registerUser("", email, password)
            expect(result).to.be.equal("Username is required");
        });
        it("Should fail registering a user when no email was given", async () => {
            const result = await authService.registerUser(username, "", password)
            expect(result).to.be.equal("Email is required");
        });
        it("Should fail registering a user when no password was given", async () => {
            const result = await authService.registerUser(username, email, "")
            expect(result).to.be.equal("Password is required");
        });
    });
}

module.exports = suite;