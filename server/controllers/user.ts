import { Response, Request } from 'express';
import { userService } from '../services'

async function getAllUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function createUser(req: Request, res: Response) {
  const { email, username, password } = req.body;
  await userService.createUser(
    email,
    username, 
    password
  );
  res.sendStatus(201);
}

async function updateUser(req: Request, res: Response) {
  const { user_id } = req.params;
  const { email, username, password } = req.body;
  await userService.updateUser(
    parseInt(user_id),
    email,
    username,
    password
  );
  res.sendStatus(204);
}

async function getUser(req: Request, res: Response) {
  const { user_id } = req.params;
  const getUser = await userService.getUser(parseInt(user_id));
  if (getUser) {
    res.status(200).json(getUser);
  } else {
    res.sendStatus(404);
  }
}

async function getUserByEmail(req: Request, res: Response) {
    const getUserByEmail = await userService.getUserByEmail(req.body.email);
    if (getUserByEmail) {
        res.status(200).json(getUserByEmail)
    } else {
        res.sendStatus(404);
    }
}

async function removeUser(req: Request, res: Response) {
  const { id } = req.params;
  await userService.deleteUser(parseInt(id));
  res.sendStatus(204);
}

const userController = {
  getUser,
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  removeUser
}

export { userController };
