import instance from "../utils/axios";

const getCampaigns = async () => {
    return await instance
      .get('/campaigns')
      .then((response) => {
        return response;
      });
  };

const CampaignService = {
    getCampaigns: getCampaigns,
}

export default CampaignService;
