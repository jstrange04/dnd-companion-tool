const { characterService } = require("../services");

async function getCharacters(req, res) {
  const characters = await characterService.getCharacters();
  if (characters && characters.length > 0) {
    res.status(200).json(characters);
  } else {
    res.sendStatus(204);
  }
}

async function createCharacter(req, res) {
  const {  } = req.body;
  await characterService.createCharacter(

  );
  res.sendStatus(201);
}

async function updateCharacter(req, res) {
  const { character_id } = req.params;
  const {  } = req.body;
  const updatedCharacter = await characterService.updateCharacter(

  );
  res.status(200).json(updatedCharacter);
}

async function getCharacter(req, res) {
  const { character_id } = req.params;
  const getCharacter = await characterService.geCharacterById(character_id);
  if (getCharacter) {
    res.status(200).json(getCharacter);
  } else {
    res.sendStatus(404);
  }
}

async function getCharacterByName(req, res) {
    const getCharacterByName = await characterService.getCharacterByName(req.body.email);
    if (getCharacterByName) {
        res.status(200).json(getCharacterByName)
    } else {
        res.sendStatus(404);
    }
}

async function removeCharacter(req, res) {
  const { id } = req.params;
  const removeCharacter = await characterService.removeCharacter(id);
  res.status(200).json(removeCharacter);
}

module.exports = {
    getCharacters,
    createCharacter,
    updateCharacter,
    getCharacter,
    getCharacterByName,
    removeCharacter
};
