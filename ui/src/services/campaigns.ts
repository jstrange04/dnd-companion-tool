import instance from "../utils/axios";

const getCampaigns = async () => {
    return await instance
      .get('/campaigns')
      .then((response) => {
        return response;
      });
  };

  const createCampaign = async (name: string, description: string, image: string, parties: string[]) => {
    return await instance
      .post("/characters", { name, description, image, parties })
      .then((response) => {
        return response;
      });
  };

const CampaignService = {
    getCampaigns: getCampaigns,
    createCampaign: createCampaign
}

export default CampaignService;
