const userController = require("../user");
const userService = require("../../services/users");

jest.mock("../../services/users");

describe("user controller", () => {
  describe("getAllUsers", () => {
    it("should return 204 when no users are available", async () => {
      const res = {
        sendStatus: jest.fn(),
      };

      await userController.getAllUsers(undefined, res);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 200 when users are available", async () => {
      const users = [{ id: 1 }];
      const res = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      userService.getAllUsers.mockReturnValueOnce(users);

      await userController.getAllUsers(undefined, res);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("getUser", () => {
    it("should return 404 when no user is available with the id provided", async () => {
      const userId = 1;
      const req = {
        params: {
          user_id: userId,
        },
      };
      const res = {
        sendStatus: jest.fn(),
      };

      await userController.getUser(req, res);

      expect(userService.getUser).toHaveBeenCalledTimes(1);
      expect(userService.getUser).toHaveBeenCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    // it("should return 200 when a user is available for the user id provided", async () => {
    //   const userId = 1;
    //   const user = { id: userId };
    //   const req = {
    //     params: {
    //       user_id: userId,
    //     },
    //   };
    //   const res = {};
    //   res.status = jest.fn().mockReturnValue(res);
    //   res.json = jest.fn().mockReturnValue(res);

    //   when(userService.getUser).calledWith(userId).mockReturnValueOnce(user);

    //   await userController.getUser(req, res); 
      
    // });
  });
});
