import instance from "../utils/axios";

const getCharacters = async () => {
    return await instance
      .get('/characters')
      .then((response) => {
        return response;
      });
  };

const CharacterService = {
    getCharacters: getCharacters,
}

export default CharacterService;
