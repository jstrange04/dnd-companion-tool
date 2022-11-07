const { prisma } = require("../utils")

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

async function getParty(id) {
  return await prisma.parties.findUnique({
    where: {
      id: parseInt(id),
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
  party_name,
  party_level
) {
await prisma.parties.create({
  data: {
    party_name: party_name,
    party_level: party_level,
  },
});
}

async function addCharacterToParty(
  party_id,
  character_id
) {
await prisma.party_characters.create({
  data: {
    party_id: party_id,
    character_id: character_id
  },
});
}

async function updateParty(
  id,
  party_name, 
  party_level
  ) {
  return await prisma.parties.update({
    where: {
      id: parseInt(id),
  },
    data: {
      party_name: party_name,
      party_level: party_level
  },
});
}

async function deleteParty(id) {
  return await prisma.parties.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function deleteCharacterFromParty(id) {
  return await prisma.party_characters.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getAllParties,
  getParty,
  createParty,
  addCharacterToParty,
  updateParty,
  deleteParty,
  deleteCharacterFromParty
};
