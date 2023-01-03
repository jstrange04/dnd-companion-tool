import instance from "../utils/axios";

const getCampaigns = async () => {
    return await instance
      .get('/campaigns')
      .then((response) => {
        return response;
      });
  };

  const createCampaign = async (name: string, description: string) => {
    return await instance
      .post("/campaigns", { name, description})
      .then((response) => {
        return response;
      });
  };

const CampaignService = {
    getCampaigns: getCampaigns,
    createCampaign: createCampaign
}

export default CampaignService;
