const prisma = require("../utils/prisma.js");

async function getAllCharacters() {
  return await prisma.characters.findMany();
}

async function getCharacter(id) {
  return await prisma.characters.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      race: true,
      character_class: true,
      subclass: true,
      level: true,
      strength: true,
      dexterity: true,
      constitution: true,
      intelligence: true,
      wisdom: true,
      charisma: true,
      hit_points: true,
      armour_class: true,
      movement_speed: true
    },
  });
}

async function getCharacterByName(name) {
  const characters = await prisma.characters.findMany({
    where: {
      name: name
    },
    select: {
      id: true,
      name: true,
      race: true,
      character_class: true,
      subclass: true,
      level: true,
      strength: true,
      dexterity: true,
      constitution: true,
      intelligence: true,
      wisdom: true,
      charisma: true,
      hit_points: true,
      armour_class: true,
      movement_speed: true
    },
  });

  return characters && characters.length > 0 && characters[0];
}

async function createCharacter(
    name,
    race,
    character_class,
    subclass,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    hit_points,
    armor_class,
    movement_speed
  ) {
  await prisma.characters.create({
    data: {
      name: name,
      race: race,
      character_class: character_class,
      subclass: subclass,
      level: level,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      hit_points: hit_points,
      armor_class: armor_class,
      movement_speed: movement_speed,
    },
  });
}

async function updateCharacter(
  id,
  name,
  race,
  character_class,
  subclass,
  level,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  hit_points,
  armor_class,
  movement_speed
) {
  return await prisma.characters.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      race: race,
      character_class: character_class,
      subclass: subclass,
      level: level,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      hit_points: hit_points,
      armor_class: armor_class,
      movement_speed: movement_speed
    },
  });
}

async function deleteCharacter(id) {
  return await prisma.characters.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getAllCharacters,
  getCharacter,
  getCharacterByName,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
