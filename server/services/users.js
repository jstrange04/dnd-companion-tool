const { prisma } = require("../utils");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  return await prisma.users.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      date_created: true,
    },
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
      username: true,
      date_created: true,
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
      username: true,
      password: true,
      date_created: true,
    },
  });

  return users && users.length > 0 && users[0];
}

async function createUser(email, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.users.create({
    data: {
      email: email,
      usernname: username,
      password: hashedPassword,
    },
  });
}

async function updateUser(id, email, username, password ) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      email: email,
      username: username,
      password: hashedPassword,
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
