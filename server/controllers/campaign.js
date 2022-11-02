const { campaignService } = require("../services");

async function getAllCampaigns(req, res) {
  const campaign = await campaignService.getAllCampaigns();
  if (campaign && campaign.length > 0) {
    res.status(200).json(campaign);
  } else {
    res.sendStatus(204);
  }
}

async function getCampaign(req, res) {
    const { campaign_id } = req.params;
    const getCampaign = await campaignService.getCampaign(campaign_id);
    if (getCampaign) {
      res.status(200).json(getCampaign);
    } else {
      res.sendStatus(404);
    }
  }

async function getCampaignByName(req, res) {
    const getCampaignByName = await campaignService.getCampaignByName(req.body.name);
    if (getCampaignByName) {
        res.status(200).json(getCampaignByName)
    } else {
        res.sendStatus(404);
    }
}

async function createCampaign(req, res) {
  const { name, description } = req.body;
  await campaignService.createCampaign(
    name,
    description, 
  );
  res.sendStatus(201);
}

async function updateCampaign(req, res) {
  const { campaign_id } = req.params;
  const { name, description} = req.body;
  const updatedCampaign = await campaignService.updateCampaign(
    campaign_id,
    name, 
    description,
    date_modified = new Date().getUTCDate(),
  );
  res.status(200).json(updatedCampaign);
}

async function removeCampaign(req, res) {
  const { id } = req.params;
  const removeCampaign = await campaignService.deleteCampaign(id);
  res.status(200).json(removeCampaign);
}

module.exports = {
    getAllCampaigns,
    getCampaign,
    getCampaignByName,
    createCampaign,
    updateCampaign,
    removeCampaign,
};
