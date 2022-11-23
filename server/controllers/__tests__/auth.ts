import { Request, Response } from 'express';
import { authService } from '../../services/auth';
import { authController } from '../auth';
import { when } from 'jest-when';

jest.mock("../../services/auth");
jest.mock("bcrypt");

describe("auth controller", () => {
  describe("authenticate", () => {
    it("should return 200 Response when member authenticated", async () => {
      const email = "";
      const password = "";
      const req = {
        body: {
          email: email,
          password: password,
        },
      } as Request;
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const mockReturnValue = {
        email: 'test',
        password: 'test'
      }

      when(authService.authenticate)
        .calledWith(email, password)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await authController.authenticate(req, res);

      expect(authService.authenticate).toHaveBeenCalledWith(email, password);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("refresh", () => {
    it("should return 200 Response when member refresh is authenticated", async () => {
      const userId = 1;
      const tokens = {};
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.locals = { user: userId };
      const req = {} as Request

      when(authService.refresh).calledWith(userId).mockReturnValueOnce(Promise.resolve(tokens));

      await authController.refresh(req, res);

      expect(authService.refresh).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(tokens);
    });
  });
});
