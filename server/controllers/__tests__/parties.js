const partyController = require("../party");
const partyService = require("../../services/parties");
const { when } = require("jest-when");

jest.mock("../../services/parties");

describe("party controller", () => {
  describe("getAllParties", () => {
    it("should return 204 when no parties are available", async () => {
      const res = {
        sendStatus: jest.fn(),
      };

      await partyController.getAllParties(undefined, res);

      expect(partyService.getAllParties).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 200 when parties are available", async () => {
      const parties = [{ id: 1 }];
      const res = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      partyService.getAllParties.mockReturnValueOnce(parties);

      await partyController.getAllParties(undefined, res);

      expect(partyService.getAllParties).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(parties);
    });
  });

  describe("getParty", () => {
    it("should return 404 when no party is available with the id provided", async () => {
      const partyId = 1;
      const req = {
        params: {
            party_id: partyId,
        },
      };
      const res = {
        sendStatus: jest.fn(),
      };

      await partyController.getParty(req, res);

      expect(partyService.getParty).toHaveBeenCalledTimes(1);
      expect(partyService.getParty).toHaveBeenCalledWith(partyId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it("should return 200 when a party is available for the party id provided", async () => {
      const partyId = 1;
      const party = { id: partyId };
      const req = {
        params: {
            party_id: partyId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(partyService.getParty)
        .calledWith(partyId)
        .mockReturnValueOnce(party);

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
      const partyLevel = "";

      const req = {
        body: {
          party_name: name,
          party_level: partyLevel,
        },
      };

      partyService.createParty.mockRejectedValue(
        new Error("Create Party Failed")
      );

      await expect(
        partyController.createParty(req, undefined)
      ).rejects.toThrow();

      expect(partyService.createParty).toHaveBeenCalledTimes(1);
      expect(partyService.createParty).toHaveBeenCalledWith(
        name,
        partyLevel
      );
    });

    it("should return 201 when a party is created successfully", async () => {
      const name = "test party";
      const partyLevel = 3;

      const req = {
        body: {
          name: name,
          party_level: partyLevel,
        },
      };
      const res = {
        sendStatus: jest.fn(),
      };

      when(partyService.createParty)
        .calledWith(name, partyLevel)
        .mockReturnValueOnce({ name, partyLevel });

      await partyController.createParty(req, res);

      expect(partyService.createParty).toHaveBeenCalledTimes(1);
      expect(partyService.createParty).toHaveBeenCalledWith(
        name,
        partyLevel
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });

  describe("updateParty", () => {
    it("should respond with an error if the party updating fails", async () => {
      const partyId = 1;
      const name = "test party";
      const partyLevel = 3;

      const req = {
        body: {
          name: name,
          party_level: partyLevel,
        },
        params: {
          id: partyId,
        },
      };

      partyService.updateParty.mockRejectedValue(
        new Error("Update Party Failed")
      );

      await expect(
        partyController.updateParty(req, undefined)
      ).rejects.toThrow();

      expect(partyService.updateParty).toHaveBeenCalledTimes(1);
      expect(partyService.updateParty).toHaveBeenCalledWith(
        partyId,
        name,
        partyLevel
      );
    });

    it("should return 200 when the party is updated successfully", async () => {
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
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(partyService.updateParty)
        .calledWith(name, partyLevel)
        .mockReturnValueOnce({ name, partyLevel });

      await partyController.updateParty(req, res);

      expect(partyService.updateParty).toHaveBeenCalledTimes(1);
      expect(partyService.updateParty).toHaveBeenCalledWith(
        name,
        partyLevel
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json), toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteParty", () => {
    it("should respond with an error if the party deletion fails", async () => {
      const partyId = 1;
      const req = {
        params: {
          id: partyId,
        },
      };

      partyService.deleteParty.mockRejectedValue(
        new Error("Party failed to delete")
      );

      await expect(
        partyController.removeParty(req, undefined)
      ).rejects.toThrow();

      expect(partyService.deleteParty).toHaveBeenCalledTimes(1);
      expect(partyService.deleteParty).toHaveBeenCalledWith(partyId);
    });

    it("should return 201 when a party is deleted successfully", async () => {
      const partyId = 1;
      const party = { id: partyId };
      const req = {
        params: {
          id: partyId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(partyService.deleteParty)
        .calledWith(partyId)
        .mockReturnValueOnce(party);

      await partyController.removeParty(req, res);

      expect(partyService.deleteParty).toHaveBeenCalledTimes(1);
      expect(partyService.deleteParty).toHaveBeenCalledWith(partyId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
