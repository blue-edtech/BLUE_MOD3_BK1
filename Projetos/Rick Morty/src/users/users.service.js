const User = require("./User");

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserSevice = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const updateUserService = (idUser, body) =>
  User.findByIdAndUpdate(idUser, body, { new: true });

const deleteUserService = (idUser) => User.findByIdAndDelete(idUser);

module.exports = {
  findByEmailUserService,
  createUserSevice,
  findAllUserService,
  findByIdUserService,
  updateUserService,
  deleteUserService,
};
