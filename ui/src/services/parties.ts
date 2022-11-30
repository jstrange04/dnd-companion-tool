import instance from "../utils/axios";

const getParties = async () => {
    return await instance
      .get('/parties')
      .then((response) => {
        return response;
      });
  };

const PartyService = {
    getParties: getParties,
}

export default PartyService;
