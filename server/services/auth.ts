import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from './users';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../constants/auth';

async function authenticate(email: string, password: string) {
  const user = await userService.getUserByEmail(email, true);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      return await generateTokens(user);
    }
  }
  throw Error(`Authentication failed: ${email}`);
}

async function refresh(userId: number) {
  const user = await userService.getUser(userId);
  if (user) {
    return await generateTokens(user);
  }
  throw Error(`Token could not be generated`);
}

function generateTokens(user: any) {
  return new Promise((response, reject) => {
    try {
      const accessToken = jwt.sign({ sub: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: 1500,
      });
      const refreshToken = jwt.sign({ sub: user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: 90000,
      });
      response({ accessToken, refreshToken });
    } catch (error) {
      reject(error);
    }
  });
}

const authService = {
  authenticate,
  refresh,
}

export { authService };