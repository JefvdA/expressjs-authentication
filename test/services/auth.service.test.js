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
            const message = await authService.registerUser(username, email, password)
            expect(message).to.be.equal(`${username} was registered successfully!`);
        });
        it("Should fail registering a user when no username was given", async () => {
            const message = await authService.registerUser("", email, password)
            .catch((err) => {
                expect(err).to.be.equal("Username is required");
            });

            expect(message).to.be.not.equal(`${username} was registered successfully!`);
        });
        it("Should fail registering a user when no email was given", async () => {
            const message = await authService.registerUser(username, "", password)
                .catch((err) => {
                    expect(err).to.be.equal("Email is required");
                });

            expect(message).to.be.not.equal(`${username} was registered successfully!`);
        });
        it("Should fail registering a user when no password was given", async () => {
            const message = await authService.registerUser(username, email, "")
            .catch((err) => {
                expect(err).to.be.equal("Password is required");
            });

            expect(message).to.be.not.equal(`${username} was registered successfully!`);
        });
    });

    describe("loginUser()", () => {
        // As the "admin" user is already registered in the database, we can use it to test the login function
        const correctUsername = "admin";
        const correctPassword = "admin";
        const wrongUsername = "wrongUsername";
        const wrongPassword = "wrongPassword";

        it("Should successfully login a user with correct credentials given", async () => {
            const user = await authService.loginUser(correctUsername, correctPassword);
            expect(user.username).to.be.equal(correctUsername);
        });
        it("Should fail to login a user with wrong password given", async () => {
            const user = await authService.loginUser(correctUsername, wrongPassword)
            .catch((err) => {
                expect(err).to.be.equal("Invalid password");
            });

            expect(user).to.be.undefined;
        });
        it("Should fail to login a user with wrong username given", async () => {
            const user = await authService.loginUser(wrongUsername, correctPassword)
            .catch((err) => {
                expect(err).to.be.equal("User not found");
            });

            expect(user).to.be.undefined;
        });
    });

    describe("assignRoleToUser()", () => {
        // Test account which we will try to assing a role
        const username = "test";
        const email = "test@gmail.com"
        const password = "test1234!";
        const role = "moderator";

        const wrongUsername = "wrongUsername";
        const wrongRole = "wrongRole";

        it("Should successfully assign a role to a user, if the user exists, and doesn't have the role yet", async () => {
            await authService.registerUser(username, email, password) // Register the user
            .then(async () => {
                // Assign the "moderator" role to the test account
                const message = await authService.assignRoleToUser(username, role);
                expect(message).to.be.equal(`${username} was assigned ${role} role successfully!`);
            });
        });

        it("Should fail to assign a role to a user, if the user doesn't exist", async () => {
            // Assign the "moderator" role to the test account, which doesn't exist
            const message = await authService.assignRoleToUser(username, role)
            .catch((err) => {
                expect(err).to.be.equal("User not found");
            });

            expect(message).to.be.undefined;
        });

        it("Should fail to assign a role to a user, if the role doesn't exist", async () => {
            await authService.registerUser(username, email, password) // Register the user
            .then(async () => {
                // Assign a role that doesn't exist to the test account
                const message = await authService.assignRoleToUser(username, wrongRole)
                .catch((err) => {
                    expect(err).to.be.equal("Role not found");
                });

                expect(message).to.be.undefined;
            });
        });

        it("Should fail to assign a role to a user, if the user already has the role", async () => {
            await authService.registerUser(username, email, password) // Register the user
            .then(async () => {
                // Assign the "moderator" role to the test account
                await authService.assignRoleToUser(username, role)
                .then(async () => {
                    // Try to assign the "moderator" role to the test account again
                    const message = await authService.assignRoleToUser(username, role)
                    .catch((err) => {
                        expect(err).to.be.equal(`${username} already has ${role} role.`);
                    });

                    expect(message).to.be.undefined;
                });
            });
        });
    });
}

module.exports = suite;