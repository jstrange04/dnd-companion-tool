import { Request, Response } from "express";
import { partyController } from "../party";
import { partyService } from "../../services/parties";
import { when } from "jest-when";

jest.mock("../../services/parties");
jest.mock("bcrypt");

describe("party controller", () => {
  describe("getAllParties", () => {
    it("should return 204 when no parties are available", async () => {
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;
      const req = {} as Request;

      await partyController.getAllParties(req, res);

      expect(partyService.getAllParties).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 200 when parties are available", async () => {
      const res = {} as Response;
      const req = {} as Request;

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const mockReturnValue = [
        {
          id: 1,
          party_name: "string",
          party_level: 2,
          date_created: new Date("07/08/2022 09:30:00"),
          date_modified: new Date("07/08/2022 09:30:00"),
          party_characters: [
            {
              id: 1,
              party_id: 1,
              character_id: 1,
              characters: {
                id: 1,
                name: "string",
                image: "image",
                race: "race",
                char_class: "class",
                sub_class: "",
                level: 3,
                strength: 20,
                dexterity: 20,
                constitution: 20,
                intelligence: 20,
                wisdom: 20,
                charisma: 20,
                hit_points: 20,
                armour_class: 20,
                movement_speed: 20,
                date_modified: new Date("07/08/2022 09:30:00")
              },
            },
          ],
        },
      ];

      when(partyService.getAllParties)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await partyController.getAllParties(req, res);

      expect(partyService.getAllParties).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });

  describe("getParty", () => {
    it("should return 404 when no party is available with the id provided", async () => {
      const partyId = 1;
      const req = {
        params: {
          party_id: partyId,
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      await partyController.getParty(req, res);

      expect(partyService.getParty).toHaveBeenCalledTimes(1);
      expect(partyService.getParty).toHaveBeenCalledWith(partyId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it("should return 200 when a party is available for the party id provided", async () => {
      const partyId = 1;
      const req = {
        params: {
          party_id: partyId,
        },
      } as unknown as Request;
      const res = {} as unknown as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const mockReturnValue =
        {
          id: 1,
          party_name: "string",
          party_level: 2,
          date_created: new Date("07/08/2022 09:30:00"),
          date_modified: new Date("07/08/2022 09:30:00"),
          party_characters: [
            {
              id: 1,
              party_id: 1,
              character_id: 1,
              characters: {
                id: 1,
                name: "string",
                image: "image",
                race: "race",
                char_class: "class",
                sub_class: "",
                level: 3,
                strength: 20,
                dexterity: 20,
                constitution: 20,
                intelligence: 20,
                wisdom: 20,
                charisma: 20,
                hit_points: 20,
                armour_class: 20,
                movement_speed: 20,
                date_modified: new Date("07/08/2022 09:30:00")
              },
            },
          ],
        };

      when(partyService.getParty)
        .calledWith(partyId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await partyController.getParty(req, res);

      expect(partyService.getParty).toHaveBeenCalledTimes(1);
      expect(partyService.getParty).toHaveBeenCalledWith(partyId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("createParty", () => {
    it("should respond with an error if the party creation fails", async () => {
      const name = "";
      const partyLevel = 0;

      const req = {
        body: {
          party_name: name,
          party_level: partyLevel,
        },
      } as unknown as Request;
      const res = {} as unknown as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      when(partyService.createParty)
      .calledWith(name, partyLevel)
      .mockRejectedValue(new Error("Create Party Failed"));

      await expect(partyController.createParty(req, res)).rejects.toThrowError("Create Party Failed");

      expect(partyService.createParty).toHaveBeenCalledTimes(1);
      expect(partyService.createParty).toHaveBeenCalledWith(name, partyLevel);
    });

    it("should return 201 when a party is created successfully", async () => {
      const name = "test party";
      const partyLevel = 3;

      const req = {
        body: {
          name: name,
          party_level: partyLevel,
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      await partyController.createParty(req, res);

      expect(partyService.createParty).toHaveBeenCalledTimes(1);
      expect(partyService.createParty).toHaveBeenCalledWith(name, partyLevel);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });

  describe("updateParty", () => {
    it("should respond with an error if the party updating fails", async () => {
      const partyId = 1;
      const name = "";
      const partyLevel = 3;

      const req = {
        body: {
          name: name,
          party_level: partyLevel,
        },
        params: {
          id: partyId,
        },
      } as unknown as Request;
      const res = {} as unknown as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      when(partyService.updateParty)
      .calledWith(partyId, name, partyLevel)
      .mockRejectedValueOnce((new Error("Update Party Failed")));

      await expect(partyController.updateParty(req, res)).rejects.toThrowError("Update Party Failed");

      expect(partyService.updateParty).toHaveBeenCalledTimes(1);
      expect(partyService.updateParty).toHaveBeenCalledWith(
        partyId,
        name,
        partyLevel
      );
    });

    it("should return 204 when the party is updated successfully", async () => {
      const partyId = 1;
      const name = "test party";
      const partyLevel = 3;

      const req = {
        body: {
          party_name: name,
          party_level: partyLevel,
        },
        params: {
          id: partyId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      await partyController.updateParty(req, res);

      expect(partyService.updateParty).toHaveBeenCalledTimes(1);
      expect(partyService.updateParty).toHaveBeenCalledWith(partyId, name, partyLevel);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("deleteParty", () => {
    it("should respond with an error if the party deletion fails", async () => {
      const partyId = 0;
      const req = {
        params: {
          id: partyId,
        },
      } as unknown as Request;
      const res = {} as unknown as Response;

      when(partyService.deleteParty)
      .calledWith(partyId)
      .mockRejectedValueOnce((new Error("Party failed to delete")));

      await expect(partyController.removeParty(req, res)).rejects.toThrowError("Party failed to delete");

      expect(partyService.deleteParty).toHaveBeenCalledTimes(1);
      expect(partyService.deleteParty).toHaveBeenCalledWith(partyId);
    });

    it("should return 204 when a party is deleted successfully", async () => {
      const partyId = 1;
      const req = {
        params: {
          id: partyId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      await partyController.removeParty(req, res);

      expect(partyService.deleteParty).toHaveBeenCalledTimes(1);
      expect(partyService.deleteParty).toHaveBeenCalledWith(partyId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
