const { prisma } = require("../utils")

async function getAllUsers() {
  return await prisma.users.findMany({
    select: {
        id: true,
        email: true,
        forename: true,
        surname: true,
        date_created: true
      }
  });
}

async function getUser(id) {
  return await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      email: true,
      forename: true,
      surname: true,
      date_created: true
    },
  });
}

async function getUserByEmail(email) {
  const users = await prisma.users.findMany({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      forename: true,
      surname: true,
      date_created: true
    },
  });

  return users && users.length > 0 && users[0];
}

async function createUser(
    forename,
    surname,
    email
  ) {
  await prisma.users.create({
    data: {
      forename: forename,
      surname: surname,
      email: email,
    },
  });
}

async function updateUser(
    id, 
    email, 
    forename, 
    surname, 
    ) {
    return await prisma.users.update({
      where: {
        id: parseInt(id),
    },
      data: {
        email: email,
        forename: forename,
        surname: surname,
    },
  });
}

async function deleteUser(id) {
  return await prisma.users.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
