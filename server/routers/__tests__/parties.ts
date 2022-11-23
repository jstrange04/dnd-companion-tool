import request from 'supertest';
import { app } from '../../app';

describe("/parties", () => {
    describe("GET /parties", () => {
        it("respond with json containing a list of parties", async () => {
            await request(app)
                .get("/parties")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });

    describe("GET /parties/{userId}", () => {
        it("respond with json containing a single party found by id", async () => {
            await request(app)
                .get("/parties/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        })
    });

    describe("POST /parties", () => {
        it("respond with 400 for missing data", async () => {
            await request(app)
                .post("/parties")
                .set("Accept", "application/json")
                .send({})
                .expect("Content-type", "application/json; charset=utf-8")
                .expect(400);
        });

        it("respond with 204 with party created successfully", async () => {
            const newParty = {
                party_name: "party",
                party_level: 2,
            }
            await request(app)
            .post("/parties")
            .set("Accept", "application/json")
            .send(newParty)
            .expect("Content-type", "text/plain; charset=utf-8")
            .expect(201);
        });
    });

    describe("PUT /parties/:id", () => {
        it("respond with 400 for missing data", async () => {
            const updatedParty = {
                party_name: "",
                party_level: 2,
            }
            await request(app)
                .put("/parties/1")
                .set("Accept", "application/json; charset=utf-8")
                .send(updatedParty)
                .expect("Content-type", "application/json; charset=utf-8")
                .expect(400);
        });

        it("respond with 204 with party updated successfully", async () => {
            const updatedParty = {
                party_name: "party",
                party_level: 2,
            }
            await request(app)
            .put("/parties/1")
            .set("Accept", "application/json")
            .send(updatedParty)
            .expect(204);
        });
    });
})

