const request = require("supertest");
const app = require("../../app");

describe("/users", () => {
    describe("GET /users", () => {
        it("respond with json containing a list of users", async () => {
            await request(app)
                .get("/users")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });

    describe("GET /users/{userId}", () => {
        it("respond with json containing a single user found by id", async () => {
            await request(app)
                .get("/users/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        })
    });

    describe("POST /users", () => {
        const verifyUserValidation = (res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    error: expect.arrayContaining([
                        expect.objectContaining({
                            param: "email",
                            msg: "the last name must have minimum length of 3"
                        }),
                        expect.objectContaining({
                            param: "username",
                            msg: "the username must have minimum length of 3"
                        }),
                        expect.objectContaining({
                            param: "password",
                            msg: "the last name must have minimum length of 3"
                        }),
                    ]),
                })
            );
        };
        it("respond with 400 for missing data", async () => {
            await request(app)
                .post("/users")
                .set("Accept", "application/json")
                .send({})
                .expect("Content-type", /json/)
                .expect(verifyUserValidation);
        });

        it("respond with 201 with user created successfully", async () => {
            const newUser = {
                email: "email@test.com",
                username: "testuser",
                password: "testpassword"
            }
            await request(app)
            .post("/users")
            .set("Accept", "application/json")
            .send(newUser)
            .expect("Content-type", /json/)
            .expect(201);
        });
    });

    describe("PUT /users/:id", () => {
        const verifyUserValidation = (res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    error: expect.arrayContaining([
                        expect.objectContaining({
                            param: "email",
                            msg: "the last name must have minimum length of 3"
                        }),
                        expect.objectContaining({
                            param: "username",
                            msg: "the username must have minimum length of 3"
                        }),
                        expect.objectContaining({
                            param: "password",
                            msg: "the last name must have minimum length of 3"
                        }),
                    ]),
                })
            );
        };

        it("respond with 400 for missing data", async () => {
            await request(app)
                .post("/users/1")
                .set("Accept", "application/json")
                .send({})
                .expect("Content-type", /json/)
                .expect(verifyUserValidation);
        });

        it("respond with 204 with user updated successfully", async () => {
            const updatedUser = {
                email: "email@test.com",
                username: "testuser",
                password: "testpassword",
            }
            await request(app)
            .post("/users/1")
            .set("Accept", "application/json")
            .send(updatedUser)
           // .expect("Content-type", /json/)
            .expect(204);
        });
    });
})

