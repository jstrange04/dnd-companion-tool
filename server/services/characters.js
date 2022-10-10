const prisma = require("../utils/prisma.js");

async function getCharacters() {
  return await prisma.characters.findMany({
    select: {
      id: true,
      name: true,
      race: true,
      class: true,
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

async function getCharacter(id) {
  return await prisma.characters.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      race: true,
      class: true,
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
      class: true,
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
    charClass,
    subclass,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    hit_points,
    movement_speed,
    armor_class
  ) {
  await prisma.characters.create({
    data: {
      name: name,
      race: race,
      class: charClass,
      subclass: subclass,
      level: level,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      hit_points: hit_points,
      movement_speed: movement_speed,
      armor_class: armor_class
    },
  });
}

async function updateCharacter(
  id,
  name,
  race,
  charClass,
  subclass,
  level,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  hit_points,
  movement_speed,
  armor_class
) {
  return await prisma.characters.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      race: race,
      class: charClass,
      subclass: subclass,
      level: level,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      hit_points: hit_points,
      movement_speed: movement_speed,
      armor_class: armor_class
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
  getCharacters,
  getCharacter,
  getCharacterByName,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
