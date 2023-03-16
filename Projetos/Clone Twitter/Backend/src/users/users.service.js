const User = require("./User");

const createUserService = (body) => User.create(body);

const findAllUsersService = () => User.find();

const findByEmailUserService = (email) => User.findOne({ email: email });

const findByIdUserService = (id) => User.findById(id);

module.exports = {
  createUserService,
  findAllUsersService,
  findByEmailUserService,
  findByIdUserService,
};
