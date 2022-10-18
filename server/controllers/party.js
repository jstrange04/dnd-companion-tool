const { partyService } = require("../services");

async function getAllParties(req, res) {
  const parties = await partyService.getAllParties();
  if (parties && parties.length > 0) {
    res.status(200).json(parties);
  } else {
    res.sendStatus(204);
  }
}

async function getParty(req, res) {
  const { party_id } = req.params;
  const getParty = await partyService.getParty(party_id);
  if (getParty) {
    res.status(200).json(getParty);
  } else {
    res.sendStatus(404);
  }
}

async function createParty(req, res) {
  const { name, party_level, date_created } = req.body;
  await campaignService.createCampaign(
    name,
    party_level, 
    date_created
  );
  res.sendStatus(201);
}

async function updateParty(req, res) {
  const { party_id } = req.params;
  const { name, party_level} = req.body;
  const updatedParty = await partyService.updateParty(
    party_id,
    name, 
    party_level, 
    date_created
  );
  res.status(200).json(updatedParty);
}

async function removeParty(req, res) {
  const { id } = req.params;
  const removeParty = await partyService.deleteParty(id);
  res.status(200).json(removeParty);
}

module.exports = {
    getAllParties,
    getParty,
    createParty,
    updateParty,
    removeParty
};
