const campaignController = require("../campaign");
const campaignService = require("../../services/campaigns");
const { when } = require("jest-when");

jest.mock("../../services/campaigns");

describe("campaign controller", () => {
  describe("getAllCampaigns", () => {
    it("should return 204 when no campaigns are available", async () => {
      const res = {
        sendStatus: jest.fn(),
      };

      await campaignController.getAllCampaigns(undefined, res);

      expect(campaignService.getAllCampaigns).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 200 when campaigns are available", async () => {
      const campaigns = [{ id: 1 }];
      const res = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      campaignService.getAllCampaigns.mockReturnValueOnce(campaigns);

      await campaignController.getAllCampaigns(undefined, res);

      expect(campaignService.getAllCampaigns).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(campaigns);
    });
  });

  describe("getCampaign", () => {
    it("should return 404 when no campaign is available with the id provided", async () => {
      const campaignId = 1;
      const req = {
        params: {
          campaign_id: campaignId,
        },
      };
      const res = {
        sendStatus: jest.fn(),
      };

      await campaignController.getCampaign(req, res);

      expect(campaignService.getCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.getCampaign).toHaveBeenCalledWith(campaignId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it("should return 200 when a campaign is available for the campaign id provided", async () => {
      const campaignId = 1;
      const campaign = { id: campaignId };
      const req = {
        params: {
          campaign_id: campaignId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(campaignService.getCampaign)
        .calledWith(campaignId)
        .mockReturnValueOnce(campaign);

      await campaignController.getCampaign(req, res);

      expect(campaignService.getCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.getCampaign).toHaveBeenCalledWith(campaignId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("createCampaign", () => {
    it("should respond with an error if the campaign creation fails", async () => {
      const name = "";
      const description = "";
      const req = {
        body: {
          name: name,
          description: description,
        },
      };

      campaignService.createCampaign.mockRejectedValue(
        new Error("Create Campaign Failed")
      );

      await expect(
        campaignController.createCampaign(req, undefined)
      ).rejects.toThrow();

      expect(campaignService.createCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.createCampaign).toHaveBeenCalledWith(
        name,
        description
      );
    });

    it("should return 201 when a campaign is created successfully", async () => {
      const name = "test campaign";
      const description = "testing campaigns";

      const req = {
        body: {
          name: name,
          description: description,
        },
      };
      const res = {
        sendStatus: jest.fn(),
      };

      when(campaignService.createCampaign)
        .calledWith(name, description)
        .mockReturnValueOnce({ name, description });

      await campaignController.createCampaign(req, res);

      expect(campaignService.createCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.createCampaign).toHaveBeenCalledWith(
        name,
        description
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });

  describe("updateCampaign", () => {
    it("should respond with an error if the campaign udpating fails", async () => {
      const campaignId = 1;
      const name = "test campaign";
      const description = "testing campaigns";

      const req = {
        body: {
          name: name,
          description: description,
        },
        params: {
          id: campaignId,
        },
      };

      campaignService.updateCampaign.mockRejectedValue(
        new Error("Update Campaign Failed")
      );

      await expect(
        campaignController.updateCampaign(req, undefined)
      ).rejects.toThrow();

      expect(campaignService.updateCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.updateCampaign).toHaveBeenCalledWith(
        name,
        description
      );
    });

    it("should return 200 when the campaign is updated successfully", async () => {
      const campaignId = 1;
      const name = "test campaign";
      const description = "testing campaigns";

      const req = {
        body: {
          name: name,
          description: description,
        },
        params: {
          id: campaignId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(campaignService.updateCampaign)
        .calledWith(name, description)
        .mockReturnValueOnce({ name, description });

      await campaignController.updateCampaign(req, res);

      expect(campaignService.updateCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.updateCampaign).toHaveBeenCalledWith(
        name,
        description
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json), toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteCampaign", () => {
    it("should respond with an error if the campaign deletion fails", async () => {
      const campaignId = 1;
      const req = {
        params: {
          id: campaignId,
        },
      };

      campaignService.deleteCampaign.mockRejectedValue(
        new Error("Campaign failed to delete")
      );

      await expect(
        campaignController.removeCampaign(req, undefined)
      ).rejects.toThrow();

      expect(campaignService.deleteCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.deleteCampaign).toHaveBeenCalledWith(campaignId);
    });

    it("should return 201 when a campaign is deleted successfully", async () => {
      const campaignId = 1;
      const campaign = { id: campaignId };
      const req = {
        params: {
          id: campaignId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(campaignService.deleteCampaign)
        .calledWith(campaignId)
        .mockReturnValueOnce(campaign);

      await campaignController.removeCampaign(req, res);

      expect(campaignService.deleteCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.deleteCampaign).toHaveBeenCalledWith(campaignId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
