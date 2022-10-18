const prisma = require("../utils/prisma.js");

async function getAllParties() {
  return await prisma.parties.findMany();
}

async function getParty(id) {
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

async function createParty(
  name,
  party_level
) {
await prisma.parties.create({
  data: {
    name: name,
    party_level: party_level,
    date_created: CURRENT_TIMESTAMP()
  },
});
}

async function updateParty(
  id,
  name, 
  party_level
  ) {
  return await prisma.parties.update({
    where: {
      id: parseInt(id),
  },
    data: {
      name: name,
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

module.exports = {
  getAllParties,
  getParty,
  createParty,
  updateParty,
  deleteParty
};
