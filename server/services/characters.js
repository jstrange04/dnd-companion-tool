const { prisma } = require("../utils");
const { user_characters } = require("../utils/prisma");

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
      char_class: true,
      sub_class: true,
      level: true,
      strength: true,
      dexterity: true,
      constitution: true,
      intelligence: true,
      wisdom: true,
      charisma: true,
      hit_points: true,
      armour_class: true,
      movement_speed: true,
    },
  });
}

async function getCharacterByName(name) {
  const characters = await prisma.characters.findMany({
    where: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      race: true,
      char_class: true,
      sub_class: true,
      level: true,
      strength: true,
      dexterity: true,
      constitution: true,
      intelligence: true,
      wisdom: true,
      charisma: true,
      hit_points: true,
      armour_class: true,
      movement_speed: true,
    },
  });

  return characters && characters.length > 0 && characters[0];
}

async function createCharacter(
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
) {
  await prisma.$transaction(async (tx) => {
    const newCharacter = await tx.characters.create({
      data: {
        name: name,
        race: race,
        char_class: char_class,
        sub_class: sub_class,
        level: level,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
        hit_points: hit_points,
        armour_class: armour_class,
        movement_speed: movement_speed
      },
    });
    const new_character_id = newCharacter.id;
    return tx.user_characters.create({
      data: {
        user_id: user_id,
        character_id: new_character_id
      }
    })
  })
}

async function updateCharacter(
  id,
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
  movement_speed
) {
  return await prisma.characters.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      race: race,
      char_class: char_class,
      sub_class: sub_class,
      level: level,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      hit_points: hit_points,
      armour_class: armour_class,
      movement_speed: movement_speed,
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
