import { Request, Response } from 'express';
import { authService } from '../services';

async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;
  const authenticationTokens = await authService.authenticate(email, password);
  res.status(200).json(authenticationTokens);
}

async function refresh(req: Request, res: Response) {
  const userId  = res.locals.user as number;
  const authenticationTokens = await authService.refresh(userId);
  res.status(200).json(authenticationTokens);
}

const authController = {
  authenticate,
  refresh,
}

export { authController };
