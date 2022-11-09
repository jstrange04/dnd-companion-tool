import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../constants/auth';

const handleTest = (res: Response, next: NextFunction) => {
  res.locals.user = 1;
  return next();
};
const verifyToken = async (res: Response, req: Request, next: NextFunction) => {
  if (process.env.NODE_ENV === "test") return handleTest(res, next);

  if ((req.path === "/auth" || req.path === "/user") && req.method == "POST")
  return next();

  const splitAuth = req.headers.authorization?.split(" ");
  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];

  if (token) {
    try {
      const tokenVerified = checkTokenValidity(
        token,
        req.path === "/auth/refresh"
          ? REFRESH_TOKEN_SECRET
          : ACCESS_TOKEN_SECRET
      );

      if (tokenVerified) {
        res.locals.user = tokenVerified.sub;
        return next();
      }
    } catch {
      return res.status(401).json({
        error: "Access Denied",
      });
    }
    res.status(401).json({
      error: "Access Denied",
    });
  }
};

const checkTokenValidity = (token: string, secret: string): string | jwt.JwtPayload => {
  return jwt.verify(token, secret);
};

export {
  verifyToken,
};
