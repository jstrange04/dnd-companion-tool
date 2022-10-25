const userService = require("../users");
const prisma = require("../../utils/prisma");
const { when } = require("jest-when");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("userService", () => {
  describe("getAllUsers", () => {
    it("should return user when users found", async () => {
      const users = [{ id: 1 }];
      const result = await userService.getAllUsers();

      prisma.users = { findMany: jest.fn().mockReturnValueOnce(users) };

      expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });

  describe("getUser", () => {
    it("should return a user for the id provided", async () => {
      const userId = 1;
      const user = {};
      const result = await userService.getUser(userId);

      prisma.users = { findUnique: jest.fn().mockReturnValueOnce(user) };

      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.users.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: userId,
          },
        })
      );
      expect(result).toEqual(user);
    });
  });

  //   describe("getMemberByUsername", () => {
  //     it("should return member for username when found", async () => {
  //       // arrange
  //       const username = "Emer";
  //       const member = false;
  //       prisma.member = { findMany: jest.fn().mockReturnValueOnce(member) };

  //       // act
  //       const result = await userService.getMemberByUsername(username);

  //       // assert
  //       expect(prisma.member.findMany).toHaveBeenCalledTimes(1);
  //       expect(prisma.member.findMany).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           where: {
  //             username: username,
  //           },
  //         })
  //       );
  //       expect(result).toEqual(member);
  //     });
  //   });

  //   describe("getMembersByTeamId", () => {
  //     it("should return members for team id", async () => {
  //       // arrange
  //       const teamId = 1;
  //       const members = [{ id: 1 }];
  //       prisma.team = { findUnique: jest.fn().mockReturnValueOnce(members) };

  //       // act
  //       const result = await userService.getMembersByTeamId(teamId);

  //       // assert
  //       expect(prisma.team.findUnique).toHaveBeenCalledTimes(1);
  //       expect(prisma.team.findUnique).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           where: {
  //             id: teamId,
  //           },
  //           select: {
  //             name: true,
  //             member_team: {
  //               select: {
  //                 member: {
  //                   select: {
  //                     id: true,
  //                     first_name: true,
  //                     last_name: true,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         })
  //       );
  //       expect(result).toEqual(members);
  //     });
  //   });

  //   describe("createMember", () => {
  //     it("should return member when created", async () => {
  //       // arrange
  //       const username = "tester";
  //       const password = "test";
  //       const firstName = "emer";
  //       const lastName = "rocks";
  //       const teamId = 1;
  //       const memberTeams = [teamId];
  //       const expectedResult = {
  //         username,
  //         password,
  //         firstName,
  //         lastName,
  //         memberTeams,
  //       };

  //       prisma.member = {
  //         create: jest.fn().mockReturnValueOnce(expectedResult),
  //       };

  //       // act
  //       await userService.createMember(
  //         username,
  //         password,
  //         firstName,
  //         lastName,
  //         memberTeams
  //       );

  //       // assert
  //       expect(prisma.member.create).toHaveBeenCalledTimes(1);
  //       expect(prisma.member.create).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           data: expect.objectContaining({
  //             username: username,
  //             first_name: firstName,
  //             last_name: lastName,
  //             member_team: {
  //               create: [{ team_id: teamId }],
  //             },
  //           }),
  //         })
  //       );
  //     });
  //   });
  // });

  // describe("deleteMember", () => {
  //   it("should delete member with id found", async () => {
  //     // arrange
  //     const memberId = 1;
  //     const member = {};
  //     prisma.member = { delete: jest.fn().mockReturnValueOnce(member) };

  //     // act
  //     const result = await userService.deleteMember(memberId);

  //     // assert
  //     expect(prisma.member.delete).toHaveBeenCalledTimes(1);
  //     expect(prisma.member.delete).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         where: {
  //           id: memberId,
  //         },
  //       })
  //     );
  //     expect(result).toEqual(member);
  //   });
});
