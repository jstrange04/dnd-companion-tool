import request from 'supertest';
import { app } from '../../app';

describe("/campaigns", () => {
    describe("GET /campaigns", () => {
        it("respond with json containing a list of campaigns", async () => {
            await request(app)
                .get("/campaigns")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });

    describe("GET /campaigns/{campaignId}", () => {
        it("respond with json containing a single campaign found by id", async () => {
            await request(app)
                .get("/campaigns/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        })
    });

    describe("POST /campaigns", () => {
        it("respond with 400 for missing data", async () => {
            await request(app)
                .post("/campaigns")
                .set("Accept", "application/json; charset=utf-8")
                .send({})
                .expect("Content-type", "application/json; charset=utf-8")
                .expect(400);
        });

        it("respond with 201 with campaign created successfully", async () => {
            const newCampaign = {
                name: "testcampaign",
                description: "testdesc",
            }
            await request(app)
            .post("/campaigns")
            .set("Accept", "application/json")
            .send(newCampaign)
            .expect("Content-type", "text/plain; charset=utf-8")
            .expect(201);
        });
    });

    describe("PUT /campaigns/:id", () => {
        it("respond with 400 for missing data", async () => {
            await request(app)
                .put("/campaigns/100")
                .set("Accept", "application/json; charset=utf-8")
                .send({})
                .expect("Content-type", /json/)
                .expect(400);
        });

        it("respond with 204 with campaign updated successfully", async () => {
            const updatedcampaign = {
                name: "testcampaign",
                description: "testdesc",
            }
            await request(app)
            .put("/campaigns/1")
            .set("Accept", "application/json")
            .send(updatedcampaign)
            .expect(204);
        });
    });
})

