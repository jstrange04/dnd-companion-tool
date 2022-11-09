import { Request, Response } from 'express';
import { authService } from '../services';

async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;
  const authenticationTokens = await authService.authenticate(email, password);
  res.status(200).json(authenticationTokens);
}

async function refresh(req: Request, res: Response) {
  const authenticationTokens = await authService.refresh(res.locals.user);
  res.status(200).json(authenticationTokens);
}

export {
  authenticate,
  refresh,
};
