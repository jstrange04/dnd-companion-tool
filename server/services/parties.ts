import { idText } from 'typescript';
import { prisma } from '../utils'

async function getAllParties() {
  return await prisma.parties.findMany({
    include: {
      party_characters: {
        select: {
          characters: true
        }
      }
    }
  });
}

async function getUserParties(id: number[]) {
  return await prisma.parties.findMany({
    where: {
      id: { in: id },
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
    // first get users characters
    // then get the characters partys
    // then return parties
  });
}

async function getCharacterParties(id: number) {
  return await prisma.party_characters.findMany({
    where: {
      character_id: id,
    }
  })
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
 await prisma.parties.update({
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
   await prisma.parties.delete({
    where: {
      id: id,
    },
  });
}

async function deleteCharacterFromParty(id: number) {
   await prisma.party_characters.delete({
    where: {
      id: id,
    },
  });
}

const partyService = {
  getAllParties,
  getUserParties,
  getCharacterParties,
  getParty,
  createParty,
  addCharacterToParty,
  updateParty,
  deleteParty,
  deleteCharacterFromParty
}

export { partyService };
