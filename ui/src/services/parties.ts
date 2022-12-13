import instance from "../utils/axios";

const getParties = async () => {
    return await instance
      .get('/parties')
      .then((response) => {
        return response;
      });
  };

const createParty = async (name: string, description: string, image: string, parties: string[]) => {
    return await instance
      .post("/parties", { name, description, image, parties })
      .then((response) => {
        return response;
      });
  };

const PartyService = {
    getParties: getParties,
    createParty: createParty
}

export default PartyService;
