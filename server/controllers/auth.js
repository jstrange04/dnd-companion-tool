const { authService } = require("../services");

async function authenticate(req, res) {
  const { email, password } = req.body;
  const authenticationTokens = await authService.authenticate(email, password);
  res.status(200).json(authenticationTokens);
}

async function refresh(req, res) {
  const authenticationTokens = await authService.refresh(res.locals.user);
  res.status(200).json(authenticationTokens);
}

module.exports = {
  authenticate,
  refresh,
};
