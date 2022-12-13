import { prisma } from '../utils'
import { authService } from './auth';
import bcrypt from 'bcrypt';

async function getAllUsers() {
  return await prisma.users.findMany();
}

async function getUser(id: number) {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      user_characters: {
        select: {
          characters: {
            select: {
              id: true,
              name: true,
              race: true,
              char_class: true,
              sub_class: true,
              level: true,
              party_characters: {
                select: {
                  parties: {
                    select: {
                      id: true,
                      party_name: true,
                      campaign_parties: {
                        select: {
                          campaigns: {
                            select: {
                              id: true,
                              name: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

    },
  });
}

async function getUserByEmail(email: string, includePassword: boolean = false) {
  const users = await prisma.users.findMany({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: includePassword,
      user_characters: {
        select: {
          characters: {
            select: {
              name: true,
              race: true,
              char_class: true,
              sub_class: true,
              level: true,
            }
          }
        }
      }
    },
  });

  return users && users.length > 0 && users[0];
}

async function createUser(email: string, username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
  return authService.generateTokens(user);
}

async function updateUser(id: number, email: string, username: string, password: string ) {
  const hashedPassword = await bcrypt.hash(password, 10);
   await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
}

async function deleteUser(id: number) {
 await prisma.users.delete({
    where: {
      id: id,
    },
  });
}

const userService = {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}

export { userService };
