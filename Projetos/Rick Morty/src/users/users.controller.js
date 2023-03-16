const userService = require("./users.service");
const authService = require("../auth/auth.service");

const createUserController = async (req, res) => {
  const { name, username, email, password, photo } = req.body;

  if (!username || !name || !email || !password || !photo) {
    return res.status(400).send({
      message:
        "Preencha todos os campos. Os campos necessários são: 'name', 'username', 'email', 'password' ou 'photo'.",
    });
  }

  const foundUser = await userService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({
      message: "Usuário já existe!",
    });
  }

  const user = await userService
    .createUserSevice(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(400).send({
      message: "Erro ao criar Usuário!",
    });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      photo,
    },
    token,
  });
};

const findAllUserController = async (req, res) => {
  const users = await userService.findAllUserService();

  if (users.length === 0) {
    return res.status(400).send({
      message: "Não existem usuários cadastrados!",
    });
  }

  res.send(users);
};

const findByIdUserController = async (req, res) => {
  const idUser = req.params.id;

  const userExist = await userService.findByIdUserService(idUser);

  if (!userExist) {
    return res.status(404).send({
      message: "Usuário não existe!",
    });
  }
  return res.status(200).send({ userExist });
};

const updateUserController = async (req, res) => {
  const idUser = req.params.id;
  const object = req.body;

  const userExist = await userService.updateUserService(idUser, object);

  if (!userExist) {
    return res.status(404).send({
      message: "Usuário não existe!",
    });
  }

  return res.status(200).send({ userExist });
};

const deleteUserController = async (req, res) => {
  const idUser = req.params.id;

  const userExist = await userService.deleteUserService(idUser);

  if (!userExist) {
    return res.status(404).send({
      message: "Usuário não existe!",
    });
  }

  return res.status(200).send({
    message: "Usuário deletado com sucesso!",
  });
};

module.exports = {
  createUserController,
  findAllUserController,
  findByIdUserController,
  updateUserController,
  deleteUserController,
};
