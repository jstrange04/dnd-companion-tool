import { Request, Response } from "express";
import { campaignController } from "../campaign";
import { campaignService } from "../../services/campaigns";
import { partyService } from "../../services";
import { when } from "jest-when";

jest.mock("../../services/campaigns");
jest.mock("bcrypt");

describe("campaign controller", () => {
  describe("getAllCampaigns", () => {
    it("should return 204 when no campaigns are available", async () => {
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;
      const req = {} as Request;

      await campaignController.getAllCampaigns(req, res);

      expect(campaignService.getAllCampaigns).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 200 when campaigns are available", async () => {
      const res = {} as Response;
      const req = {} as Request;

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const mockReturnValue = [
        {
          id: 1,
          name: "test",
          image: "image",
          description: "desc",
          date_created: new Date("07/08/2022 09:30:00"),
          date_modified: new Date("07/08/2022 09:30:00"),
        },
      ];

      const mockedService = campaignService as jest.Mocked<
        typeof campaignService
      >;

      mockedService.getAllCampaigns.mockReturnValueOnce(
        Promise.resolve(mockReturnValue)
      );

      await campaignController.getAllCampaigns(req, res);

      expect(campaignService.getAllCampaigns).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });

  describe("getCampaign", () => {
    it("should return 404 when no campaign is available with the id provided", async () => {
      const campaignId = 1;
      const req = {
        params: {
          campaign_id: campaignId,
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      await campaignController.getCampaign(req, res);

      expect(campaignService.getCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.getCampaign).toHaveBeenCalledWith(campaignId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it("should return 200 when a campaign is available for the campaign id provided", async () => {
      const campaignId = 1;
      const campaign = {
        id: 1,
        image: "image",
        name: "name",
        description: "description",
        date_created: new Date("07/08/2022 09:30:00"),
        date_modified: new Date("07/08/2022 09:30:00"),
        campaign_parties: {
          parties: {
            id: 1,
            party_name: 'party',
            party_level: 1,
            date_created: new Date("07/08/2022 09:30:00"),
            date_modified: new Date("07/08/2022 09:30:00"),
          }
        }
      };
      const req = {
        params: {
          campaign_id: campaignId,
        },
      } as unknown as Request;
      const res = {} as unknown as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.sendStatus = jest.fn().mockReturnValue(res);

      when(campaignService.getCampaign)
        .calledWith(campaignId)
        .mockRejectedValueOnce(Promise.resolve(campaign));

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
      } as unknown as Request;
      const res = {} as Response;

      when(campaignService.createCampaign)
        .calledWith(name, description)
        .mockRejectedValue(new Error("Create Campaign Failed"));

      await expect(
        campaignController.createCampaign(req, res)
      ).rejects.toThrowError("Create Campaign Failed");

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
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

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
          campaign_id: campaignId,
        },
      } as unknown as Request;
      const res = {} as Response;

      when(campaignService.updateCampaign)
        .calledWith(campaignId, name, description)
        .mockRejectedValue(new Error("Update Campaign Failed"));

      await expect(
        campaignController.updateCampaign(req, res)
      ).rejects.toThrowError("Update Campaign Failed");

      expect(campaignService.updateCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.updateCampaign).toHaveBeenCalledWith(
        campaignId,
        name,
        description
      );
    });

    it("should return 204 when the campaign is updated successfully", async () => {
      const campaignId = 1;
      const name = "test campaign";
      const image = "testimage.url.com";
      const description = "testing campaigns";

      const req = {
        body: {
          id: campaignId,
          name: name,
          image: image,
          description: description,
          date_created: "",
          campaign_parties: [],
        },
        params: {
          id: campaignId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      await campaignController.updateCampaign(req, res);

      expect(campaignService.updateCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.updateCampaign).toHaveBeenCalledWith(
        campaignId,
        name,
        description
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("deleteCampaign", () => {
    it("should respond with an error if the campaign deletion fails", async () => {
      const campaignId = 1;
      const req = {
        params: {
          id: campaignId,
        },
      } as unknown as Request;
      const res = {} as Response;

      when(campaignService.deleteCampaign)
        .calledWith(campaignId)
        .mockRejectedValueOnce(new Error("Campaign failed to delete"));

      await expect(
        campaignController.removeCampaign(req, res)
      ).rejects.toThrowError("Campaign failed to delete");

      expect(campaignService.deleteCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.deleteCampaign).toHaveBeenCalledWith(campaignId);
    });

    it("should return 204 when a campaign is deleted successfully", async () => {
      const campaignId = 1;
      const req = {
        params: {
          id: campaignId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      await campaignController.removeCampaign(req, res);

      expect(campaignService.deleteCampaign).toHaveBeenCalledTimes(1);
      expect(campaignService.deleteCampaign).toHaveBeenCalledWith(campaignId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
