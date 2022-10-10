const prisma = require("../utils/prisma.js");

async function getParties() {
  return await prisma.parties.findMany({
    select: {
        id: true,
        name: true,
        party_level: true,
        date_created: true
      }
  });
}

async function getPartyById(id) {
  return await prisma.parties.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      party_level: true,
      date_created: true
    },
  });
}

async function getPartyByName(name) {
  const parties = await prisma.parties.findMany({
    where: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      party_level: true,
      date_created: true
    },
  });

  return parties && parties.length > 0 && parties[0];
}

async function createParty(
    name,
    party_level,
  ) {
  await prisma.parties.create({
    data: {
      email: email,
      party_level: party_level,
      date_created: CURRENT_TIMESTAMP()
    },
  });
}

async function updateParty(
    id, 
    name, 
    party_level, 
    ) {
    return await prisma.parties.update({
      where: {
        id: parseInt(id),
    },
      data: {
        name: name,
        party_level: party_level,
        date_created: date_created
    },
  });
}

async function deleteParty(id) {
  return await prisma.party.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getParties,
  getPartyById,
  getPartyByName,
  createParty,
  updateParty,
  deleteParty,
};
