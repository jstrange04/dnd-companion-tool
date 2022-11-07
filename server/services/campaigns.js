const { prisma } = require("../utils")

async function getAllCampaigns() {
  return await prisma.campaigns.findMany();
}

async function getCampaign(id) {
  return await prisma.campaigns.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      description: true,
      date_created: true,
      campaign_parties: {
        select: {
          parties: true,
        }
      }
    },
  });
}

async function getCampaignByName(name) {
  const campaigns = await prisma.campaigns.findMany({
    where: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      description: true,
      date_created: true,
      campaign_parties: {
        select: {
          parties: true,
        }
      }
    },
  });

  return campaigns && campaigns.length > 0 && campaigns[0];
}

async function addPartyToCampaign(campaign_id, party_id) {
  await prisma.campaign_parties.create({
    data: {
      campaign_id: campaign_id,
      party_id: party_id,
    }
  })
}

async function createCampaign(
    name,
    description
  ) {
  await prisma.campaigns.create({
    data: {
      name: name,
      description: description,
    },
  });
}

async function updateCampaign(
    id,
    name, 
    description
    ) {
    return await prisma.campaigns.update({
      where: {
        id: parseInt(id),
    },
      data: {
        name: name,
        description: description
    },
  });
}

async function deleteCampaign(id) {
  return await prisma.campaigns.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getAllCampaigns,
  getCampaign,
  getCampaignByName,
  addPartyToCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
