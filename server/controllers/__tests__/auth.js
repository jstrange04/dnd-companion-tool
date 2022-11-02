const authController = require("../auth");
const authService = require("../../services/auth");
const { when } = require("jest-when");

jest.mock("../../services/auth");

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
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(authService.authenticate)
        .calledWith(email, password)
        .mockReturnValueOnce({ email, password });

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
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.locals = { user: userId };

      when(authService.refresh).calledWith(userId).mockReturnValueOnce(tokens);

      await authController.refresh(undefined, res);

      expect(authService.refresh).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(tokens);
    });
  });
});
