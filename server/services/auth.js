const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("./users");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../constants/auth");

async function authenticate(email, password) {
  const user = await userService.getUserByEmail(email);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      return await generateTokens(user);
    }
  }
  throw new Error(`Authentication failed: ${email}`);
}

async function refresh(userId) {
  const user = await userService.getUser(userId);
  if (user) {
    return await generateTokens(user);
  }
  throw new Error(`Token could not be generated`);
}

function generateTokens(user) {
  return new Promise((response, reject) => {
    try {
      const accessToken = jwt.sign({ sub: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: 1500,
      });
      const refreshToken = jwt.sign({ sub: user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: 90000,
      });
      response({ accessToken, refreshToken });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  authenticate,
  refresh,
};
