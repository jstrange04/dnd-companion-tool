import { prisma } from '../utils'

async function getAllParties() {
  return await prisma.parties.findMany({
    include: {
      party_characters: {
        include: {
          characters: true
        }
      }
    }
  });
}

async function getParty(id: number) {
  return await prisma.parties.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      party_name: true,
      party_level: true,
      date_created: true,
      party_characters: {
        select: {
          characters: {
            select: {
              name: true,
            }
          }
        }
      }
    },
  });
}

async function createParty(
  party_name: string,
  party_level: number
) {
await prisma.parties.create({
  data: {
    party_name: party_name,
    party_level: party_level,
  },
});
}

async function addCharacterToParty(
  party_id: number,
  character_id: number
) {
await prisma.party_characters.create({
  data: {
    party_id: party_id,
    character_id: character_id
  },
});
}

async function updateParty(
  id: number,
  party_name: string, 
  party_level: number
  ) {
  return await prisma.parties.update({
    where: {
      id: id,
  },
    data: {
      party_name: party_name,
      party_level: party_level
  },
});
}

async function deleteParty(id: number) {
  return await prisma.parties.delete({
    where: {
      id: id,
    },
  });
}

async function deleteCharacterFromParty(id: number) {
  return await prisma.party_characters.delete({
    where: {
      id: id,
    },
  });
}

const partyService = {
  getAllParties,
  getParty,
  createParty,
  addCharacterToParty,
  updateParty,
  deleteParty,
  deleteCharacterFromParty
}

export { partyService };
