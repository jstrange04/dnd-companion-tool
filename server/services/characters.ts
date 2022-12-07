import { prisma } from '../utils'

async function getAllCharacters() {
  return await prisma.characters.findMany();
}

async function getCharactersByUser(user_id: number) {
  return await prisma.user_characters.findMany({
    where: {
      user_id: user_id,
    },
  }
  );
}

async function getCharacter(id: number) {
  return await prisma.characters.findUnique({
    where: {
      id: id,
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

async function getCharacterByName(name: string) {
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
  name: string,
  race: string,
  char_class: string,
  sub_class: string,
  level: number,
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
  hit_points: number,
  armour_class: number,
  movement_speed: number,
  user_id: number
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
    return await tx.user_characters.create({
      data: {
        user_id: user_id,
        character_id: new_character_id
      }
    })
  })
}

async function updateCharacter(
  id: number,
  name: string,
  race: string,
  char_class: string,
  sub_class: string,
  level: number,
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
  hit_points: number,
  armour_class: number,
  movement_speed: number,
) {
 await prisma.characters.update({
    where: {
      id: id,
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

async function deleteCharacter(id: number) {
  return await prisma.characters.delete({
    where: {
      id: id,
    },
  });
}

const characterService = {
  getAllCharacters,
  getCharactersByUser,
  getCharacter,
  getCharacterByName,
  createCharacter,
  updateCharacter,
  deleteCharacter,
}

export { characterService };

