import instance from "../utils/axios";

const getParties = async () => {
    return await instance
      .get('/parties')
      .then((response) => {
        return response;
      });
  };

const getParty = async (partyId: number) => {
    return await instance
      .get(`/parties/${partyId}`)
      .then((response) => {
        return response;
      });
  };

const createParty = async (party_name: string, party_level: number) => {
    return await instance
      .post("/parties", { party_name, party_level })
      .then((response) => {
        return response;
      });
  };

const addToParty = async (party_id: number, character_id: number) => {
    return await instance
      .post("/parties/add", { party_id, character_id })
      .then((response) => {
        return response;
      });
  };

const PartyService = {
    getParties: getParties,
    getParty: getParty,
    createParty: createParty,
    addToParty: addToParty,
}

export default PartyService;
