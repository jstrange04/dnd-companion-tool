const { userService } = require("../services");

async function getAllUsers(req, res) {
  const users = await userService.getAllUsers();
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function createUser(req, res) {
  const { email, forename, surname } = req.body;
  await userService.createUser(
    email,
    forename, 
    surname
  );
  res.sendStatus(201);
}

async function updateUser(req, res) {
  const { user_id } = req.params;
  const { forename, surname, email } = req.body;
  const updatedUser = await userService.updateUser(
    user_id,
    forename, 
    surname, 
    email
  );
  res.status(200).json(updatedUser);
}

async function getUser(req, res) {
  const { user_id } = req.params;
  const getUser = await userService.getUser(user_id);
  if (getUser) {
    res.status(200).json(getUser);
  } else {
    res.sendStatus(404);
  }
}

async function getUserByEmail(req, res) {
    const getUserByEmail = await userService.getUserByEmail(req.body.email);
    if (getUserByEmail) {
        res.status(200).json(getUserByEmail)
    } else {
        res.sendStatus(404);
    }
}

async function removeUser(req, res) {
  const { id } = req.params;
  const removeUser = await userService.deleteUser(id);
  res.status(200).json(removeUser);
}

module.exports = {
    getUser,
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUser,
    removeUser
};
