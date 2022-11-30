import instance from "../utils/axios";

const createUser = async (email: string, username: string, password: string) => {
    return await instance
      .post("/users", { email, username, password })
      .then((response) => {
        return response;
      });
  };

const getUser = async (userId: number) => {
    return await instance
      .get(`/users/${userId}`)
      .then((response) => {
        return response;
      });
  };

const UserService = {
  createUser: createUser,
  getUser: getUser,
}

export default UserService;
