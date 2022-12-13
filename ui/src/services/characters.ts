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

const createCharacter = async (name: string, race: string, charClass: string, subClass: string, level: number, strength: number, dexterity: number, constitution: number, wisdom: number, intelligence: number, charisma: number, armourClass: number, hitPoints: number, movementSpeed: number) => {
    return await instance
      .post("/characters", { name, race, charClass, subClass, level, strength, dexterity, constitution, wisdom, intelligence, charisma, armourClass, hitPoints, movementSpeed })
      .then((response) => {
        return response;
      });
  };

const CharacterService = {
    getCharacters: getCharacters,
    getCharactersByUser: getCharactersByUser,
    createCharacter: createCharacter
}

export default CharacterService;