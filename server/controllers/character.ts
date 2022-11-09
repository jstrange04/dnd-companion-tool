import { Response, Request } from 'express';
import { characterService } from '../services';

async function getAllCharacters(req: Request, res: Response) {
  const characters = await characterService.getAllCharacters();
  if (characters && characters.length > 0) {
    res.status(200).json(characters);
  } else {
    res.sendStatus(204);
  }
}

async function getCharacter(req: Request, res: Response) {
  const { character_id } = req.params;
  const getCharacter = await characterService.getCharacter(parseInt(character_id));
  if (getCharacter) {
    res.status(200).json(getCharacter);
  } else {
    res.sendStatus(404);
  }
}

async function getCharacterByName(req: Request, res: Response) {
    const getCharacterByName = await characterService.getCharacterByName(req.body.email);
    if (getCharacterByName) {
        res.status(200).json(getCharacterByName)
    } else {
        res.sendStatus(404);
    }
}

async function createCharacter(req: Request, res: Response) {
  const {          
    name,
    race,
    char_class,
    sub_class,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    hit_points,
    armour_class,
    movement_speed,
  user_id } = req.body;
  await characterService.createCharacter(
    name,
    race,
    char_class,
    sub_class,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    hit_points,
    armour_class,
    movement_speed,
    user_id
  );
  res.sendStatus(201);
}

async function updateCharacter(req: Request, res: Response) {
  const { character_id } = req.params;
  const {     
    name,
    race,
    char_class,
    sub_class,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    hit_points,
    armour_class,
    movement_speed } = req.body;
  const updatedCharacter = await characterService.updateCharacter(
    parseInt(character_id),
    name,
    race,
    char_class,
    sub_class,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    hit_points,
    armour_class,
    movement_speed,
    //date_modified = new Date().getUTCDate(),
  );
  res.status(200).json(updatedCharacter);
}

async function removeCharacter(req: Request, res: Response) {
  const { id } = req.params;
  const removeCharacter = await characterService.deleteCharacter(parseInt(id));
  res.status(200).json(removeCharacter);
}

export {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getCharacter,
    getCharacterByName,
    removeCharacter
};
