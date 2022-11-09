import { Response, Request } from 'express';
import { campaignService } from '../services';

async function getAllCampaigns(req: Request, res: Response) {
  const campaign = await campaignService.getAllCampaigns();
  if (campaign && campaign.length > 0) {
    res.status(200).json(campaign);
  } else {
    res.sendStatus(204);
  }
}

async function getCampaign(req: Request, res: Response) {
    const { campaign_id } = req.params;
    const getCampaign = await campaignService.getCampaign(parseInt(campaign_id));
    if (getCampaign) {
      res.status(200).json(getCampaign);
    } else {
      res.sendStatus(404);
    }
  }

async function getCampaignByName(req: Request, res: Response) {
    const getCampaignByName = await campaignService.getCampaignByName(req.body.name);
    if (getCampaignByName) {
        res.status(200).json(getCampaignByName)
    } else {
        res.sendStatus(404);
    }
}

async function addPartyToCampaign(req: Request, res: Response) {
  const { campaign_id, party_id } = req.body;
  await campaignService.addPartyToCampaign(
    campaign_id,
    party_id, 
  );
  res.sendStatus(201);
}

async function createCampaign(req: Request, res: Response) {
  const { name, description } = req.body;
  await campaignService.createCampaign(
    name,
    description, 
  );
  res.sendStatus(201);
}

async function updateCampaign(req: Request, res: Response) {
  const { campaign_id } = req.params;
  const { name, description} = req.body;
  const updatedCampaign = await campaignService.updateCampaign(
    parseInt(campaign_id),
    name, 
    description,
    //date_modified = new Date().getUTCDate(),
  );
  res.status(200).json(updatedCampaign);
}

async function removeCampaign(req: Request, res: Response) {
  const { id } = req.params;
  const removeCampaign = await campaignService.deleteCampaign(parseInt(id));
  res.status(200).json(removeCampaign);
}

export {
    getAllCampaigns,
    getCampaign,
    getCampaignByName,
    addPartyToCampaign,
    createCampaign,
    updateCampaign,
    removeCampaign,
};
