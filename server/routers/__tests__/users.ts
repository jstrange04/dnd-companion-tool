import { Response } from "express";
import request from "supertest";
import { app } from "../../app";

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
    });
  });

  describe("POST /users", () => {
    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(400);
    });

    it("respond with 201 with user created successfully", async () => {
      const newUser = {
       email: "newuser@user.com",
       username: "user1",
       password: "Password@123"
      }
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send(newUser)
        .expect("Content-type","text/plain; charset=utf-8")
        .expect(201);
    });
  });

//   const verifyUserValidation = (res: any) => {
//     expect(res.body).toEqual(
//         expect.objectContaining({
//             errors: expect.arrayContaining([
//                 expect.objectContaining({
//                     location: "body",
//                     param: "email",
//                     msg: "the email must have minimum length of 3",
//                 }),
//                 expect.objectContaining({
//                     location: "body",
//                     param: "username",
//                     msg: "username must be entered",
//                 }),
//                 expect.objectContaining({
//                     location: "body",
//                     param: "password",
//                     msg: "password is a required field",
//                 }),
//             ]),
//         })
//     );
// };

  describe("PUT /users/:id", () => {
    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send({
          email: "newuser@user.com",
          username: "user1",
          password: "password"
        })
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(400)
        //.expect(verifyUserValidation);
    });

    it("respond with 204 with user updated successfully", async () => {
      const updatedUser = {
        email: "newuser@user.com",
        username: "user1",
        password: "Password@123"
      };
      await request(app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send(updatedUser)
        .expect(204);
    });
  });
});
