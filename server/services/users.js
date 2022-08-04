const prisma = require("../utils/prisma.js");

async function getUsers() {
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

async function getUserById(id) {
  return await prisma.user.findUnique({
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
  const users = await prisma.user.findMany({
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

  return users && users.length > 0 && members[0];
}

async function createUser(
    email,
    forename,
    surname,
  ) {
  await prisma.user.create({
    data: {
      forename: forename,
      surname: surname,
      email: email,
      date_created: CURRENT_TIMESTAMP()
    },
  });
}

async function updateUser(id, email, forename, surname, date_created) {
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      email: email,
      forename: forename,
      surname: surname,
      date_created: date_created
    },
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
