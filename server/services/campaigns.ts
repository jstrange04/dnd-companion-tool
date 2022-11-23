import { prisma } from '../utils'

async function getAllCampaigns() {
  return await prisma.campaigns.findMany();
}

async function getCampaign(id: number) {
  return await prisma.campaigns.findUnique({
    where: {
      id: id,
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

async function getCampaignByName(name: string) {
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

async function addPartyToCampaign(campaign_id: number, party_id: number) {
  await prisma.campaign_parties.create({
    data: {
      campaign_id: campaign_id,
      party_id: party_id,
    }
  })
}

async function createCampaign(
    name: string,
    description: string
  ) {
  await prisma.campaigns.create({
    data: {
      name: name,
      description: description,
    },
  });
}

async function updateCampaign(
    id: number,
    name: string, 
    description: string
    ) {
   await prisma.campaigns.update({
      where: {
        id: id,
    },
      data: {
        name: name,
        description: description
    },
  });
}

async function deleteCampaign(id: number) {
  return await prisma.campaigns.delete({
    where: {
      id: id,
    },
  });
}

const campaignService = {
  getAllCampaigns,
  getCampaign,
  getCampaignByName,
  addPartyToCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
}

export { campaignService };
