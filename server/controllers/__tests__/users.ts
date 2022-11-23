import { Request, Response } from "express";
import { userController } from "../user";
import { userService } from "../../services/users";
import { when } from "jest-when";

jest.mock("../../services/users");
jest.mock("bcrypt");

describe("user controller", () => {
  describe("getAllUsers", () => {
    it("should return 204 when no users are available", async () => {
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;
      const req = {} as Request;

      await userController.getAllUsers(req, res);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 200 when users are available", async () => {
      const res = {} as Response;
      const req = {} as Request;
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const mockReturnValue = [
        {
          id: 1,
          username: "name",
          email: "test",
          password: "password",
          date_created: new Date("07/08/2022 09:30:00"),
        },
      ];

      when(userService.getAllUsers)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await userController.getAllUsers(req, res);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });

  describe("getUser", () => {
    it("should return 404 when no user is available with the id provided", async () => {
      const userId = 1;
      const req = {
        params: {
          user_id: userId,
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      await userController.getUser(req, res);

      expect(userService.getUser).toHaveBeenCalledTimes(1);
      expect(userService.getUser).toHaveBeenCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it("should return 200 when a user is available for the user id provided", async () => {
      const userId = 1;
      const user = {
        id: 1,
        email: "email",
        username: "user",
        user_characters: [
          {
            characters: {
              name: "test",
            },
          },
        ],
      };

      const req = {
        params: {
          user_id: userId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      when(userService.getUser)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(user));

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
      const email = "";
      const username = "";
      const password = "";

      const req = {
        body: {
          email: email,
          username: username,
          password: password,
        },
      } as unknown as Request;
      const res = {} as Response;

      when(userService.createUser)
        .calledWith(email, username, password)
        .mockRejectedValue(new Error("User creation failed"));

      await expect(userController.createUser(req, res)).rejects.toThrowError(
        "User creation failed"
      );

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(
        email,
        username,
        password
      );
    });

    it("should return 201 when a user is created successfully", async () => {
      const email = "email@test.com";
      const username = "testname";
      const password = "testpassword";

      const req = {
        body: {
          email: email,
          username: username,
          password: password,
        },
      } as unknown as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      await userController.createUser(req, res);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(
        email,
        username,
        password
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });

  describe("updateUser", () => {
    it("should respond with an error if the user udpating fails", async () => {
      const userId = 50;
      const email = "";
      const username = "";
      const password = "";

      const req = {
        body: {
          email: email,
          username: username,
          password: password,
        },
        params: {
          id: userId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValueOnce(res);

      when(userService.updateUser)
        .calledWith(userId, email, username, password)
        .mockRejectedValueOnce(new Error("User failed to update"));

      await expect(userController.updateUser(req, res)).rejects.toThrowError(
        "User failed to update"
      );

      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(
        userId,
        email,
        username,
        password
      );
    });

    it("should return 204 when the user is updated successfully", async () => {
      const userId = 1;
      const email = "email@test.com";
      const username = "testname";
      const password = "testpassword";

      const req = {
        body: {
          email: email,
          username: username,
          password: password,
        },
        params: {
          id: userId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      await userController.updateUser(req, res);

      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(userId, email, password);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("deleteUser", () => {
    it("should respond with an error if the user deletion fails", async () => {
      const userId = 1;
      const req = {
        params: {
          id: userId,
        },
      } as unknown as Request;
      const res = {} as Response;

      when(userService.deleteUser)
        .calledWith(userId)
        .mockRejectedValueOnce(new Error("User failed to delete"));

      await expect(userController.removeUser(req, res)).rejects.toThrowError(
        "User failed to delete"
      );

      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    });

    it("should return 204 when a user is deleted successfully", async () => {
      const userId = 1;
      const req = {
        params: {
          id: userId,
        },
      } as unknown as Request;
      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      await userController.removeUser(req, res);

      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
