const userController = require("../user");
const userService = require("../../services/users");
const { when } = require("jest-when");

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

    it("should return 200 when a user is available for the user id provided", async () => {
      const userId = 1;
      const user = { id: userId };
      const req = {
        params: {
          user_id: userId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(userService.getUser).calledWith(userId).mockReturnValueOnce(user);

      await userController.getUser(req, res);

      expect(userService.getUser).toHaveBeenCalledTimes(1);
      expect(userService.getUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("createUser", () => {
    it("should respond with an error if the user creation fails", async () => {
      const forename = "";
      const surname = "";
      const email = "";
      const userCharacters = 1;
      
      const req = {
        body: {
          forename: forename,
          surname: surname,
          email: email,
          user_characters: userCharacters
        },
      };

      userService.createUser.mockRejectedValue(new Error("Create User Failed"));

      await expect(userController.createUser(req, undefined)).rejects.toThrow();

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(
        forename,
        surname,
        email,
        userCharacters
      );
    });

    it("should return 201 when a user is created successfully", async () => {
      const forename = "first";
      const surname = "last";
      const email = "email@test.com";

      const req = {
        body: {
          forename: forename,
          surname: surname,
          email: email,
        },
      };
      const res = {
        sendStatus: jest.fn(),
      };

      when(userService.createUser)
        .calledWith(forename, surname, email)
        .mockReturnValueOnce({ forename, surname, email });

      await userController.createUser(req, res);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(
        forename,
        surname,
        email
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });

  describe("updateUser", () => {
    it("should respond with an error if the user udpating fails", async () => {
      const userId = 1;
      const forename = "";
      const surname = "";
      const email = "";

      const req = {
        body: {
          forename: forename,
          surname: surname,
          email: email,
        },
        params: {
          id: userId,
        },
      };

      userService.updateUser.mockRejectedValue(new Error("Update User Failed"));

      await expect(userController.updateUser(req, undefined)).rejects.toThrow();

      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(
        userId,
        forename,
        surname,
        email
      );
    });

    it("should return 200 when the user is updated successfully", async () => {
      const userId = 1;
      const forename = "first";
      const surname = "last";
      const email = "email@test.com";

      const req = {
        body: {
          forename: forename,
          surname: surname,
          email: email,
        },
        params: {
          id: userId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(userService.updateUser)
        .calledWith(forename, surname, email)
        .mockReturnValueOnce({ forename, surname, email });

      await userController.updateUser(req, res);

      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(
        forename,
        surname,
        email
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json), toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteUser", () => {
    it("should respond with an error if the user deletion fails", async () => {
      const userId = 1;
      const req = {
        params: {
          id: userId,
        },
      };

      userService.deleteUser.mockRejectedValue(
        new Error("User failed to delete")
      );

      await expect(userController.removeUser(req, undefined)).rejects.toThrow();

      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    });

    it("should return 201 when a user is deleted successfully", async () => {
      const userId = 1;
      const user = { id: userId };
      const req = {
        params: {
          id: userId,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(userService.deleteUser).calledWith(userId).mockReturnValueOnce(user);

      await userController.removeUser(req, res);

      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
