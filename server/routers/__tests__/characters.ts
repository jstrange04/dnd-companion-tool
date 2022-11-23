import request from 'supertest';
import { app } from '../../app';

describe("/characters", () => {
    describe("GET /characters", () => {
        it("respond with json containing a list of characters", async () => {
            await request(app)
                .get("/characters")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });

    describe("GET /characters/{characterId}", () => {
        it("respond with json containing a single character found by id", async () => {
            await request(app)
                .get("/characters/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        })
    });

    describe("POST /characters", () => {
        it("respond with 400 for missing data", async () => {
            await request(app)
                .post("/characters")
                .set("Accept", "application/json")
                .send({})
                .expect("Content-type", "application/json; charset=utf-8")
                .expect(400);
        });

        it("respond with 201 with character created successfully", async () => {
            const newCharacter = {
                name: "Jarlaxle Baenre",
                race: "Drow",
                char_class: "Rogue",
                sub_class: "Arcane Trickster",
                level: 15,
                strength: 16,
                dexterity: 20,
                constitution: 12,
                intelligence: 18,
                wisdom: 16,
                charisma: 20,
                hit_points: 134,
                armour_class: 19,
                movement_speed: 35,
                user_id: 3
          }
            await request(app)
            .post("/characters")
            .set("Accept", "application/json")
            .send(newCharacter)
            .expect("Content-type", "text/plain; charset=utf-8")
            .expect(201);
        });
    });

    describe("PUT /characters/:id", () => {
        it("respond with 400 for missing data", async () => {
            await request(app)
                .put("/characters/1")
                .set("Accept", "application/json; charset=utf-8")
                .send({})
                .expect("Content-type", /json/)
                .expect(400);
        });

        it("respond with 204 with character updated successfully", async () => {
            const updatedCharacter = {
                name: "Drizzt DoUrden",
                race: "Drow",
                char_class: "Range",
                sub_class: "Beast Master",
                level: 15,
                strength: 16,
                dexterity: 20,
                constitution: 12,
                intelligence: 18,
                wisdom: 16,
                charisma: 20,
                hit_points: 134,
                armour_class: 19,
                movement_speed: 45,
                user_id: 3
          }
            await request(app)
            .put("/characters/1")
            .set("Accept", "application/json")
            .send(updatedCharacter)
            .expect(204);
        });
    });
})

