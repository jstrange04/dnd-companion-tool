import instance from "../utils/axios";

const getCharacters = async () => {
    return await instance
      .get('/characters')
      .then((response) => {
        return response;
      });
  };

const getCharactersByUser = async (user_id: number) => {
    return await instance
      .get(`/characters/${user_id}`)
      .then((response) => {
        return response;
      });
  };

const CharacterService = {
    getCharacters: getCharacters,
    getCharactersByUser: getCharactersByUser
}

export default CharacterService;