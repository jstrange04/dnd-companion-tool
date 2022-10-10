const prisma = require("../utils/prisma.js");

async function getCampaigns() {
  return await prisma.campaigns.findMany({
    select: {
        id: true,
        name: true,
        party_level: true,
        date_created: true
      }
  });
}

async function getCampaignById(id) {
  return await prisma.campaigns.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      party_level: true,
      date_created: true
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
      name: true,e,
      date_created: true
    },
  });

  return campaigns && campaigns.length > 0 && campaigns[0];
}

async function createCampaign(
    id,
    name,
  ) {
  await prisma.campaigns.create({
    data: {
      name: name,
      date_created: CURRENT_TIMESTAMP()
    },
  });
}

async function updateCampaign(
    id, 
    name, 
    ) {
    return await prisma.campaigns.update({
      where: {
        id: parseInt(id),
    },
      data: {
        name: name,
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
  getCampaigns,
  getCampaignById,
  getCampaignByName,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
