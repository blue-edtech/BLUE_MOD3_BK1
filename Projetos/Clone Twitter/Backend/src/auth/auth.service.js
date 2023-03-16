const jwt = require("jsonwebtoken");
const User = require("../users/User");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: 86400,
  });

// o select("+password") muda o valor da senha no Schema para true para poder retornar a senha e fazer a validação.
const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

module.exports = {
  generateToken,
  loginService,
};
