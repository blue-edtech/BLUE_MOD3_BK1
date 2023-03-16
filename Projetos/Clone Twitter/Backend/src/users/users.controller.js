const usersService = require("./users.service");
const authService = require("../auth/auth.service");

const createUserController = async (req, res) => {
  const { username, name, email, password, avatar } = req.body;

  if (!username || !name || !email || !password || !avatar) {
    return res.status(400).json({
      message:
        "Alguns campos estão faltando. Os campos são: 'username', 'name', 'email', 'password' ou 'avatar'.",
    });
  }

  const foundUser = await usersService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({ message: "Usuário já existente!" });
  }

  const user = await usersService
    .createUserService(req.body)
    .catch((err) => console.error(err.message));

  if (!user) {
    return res.status(400).send({ message: "Erro ao criar usuário!" });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      avatar,
    },
    token,
  });
};

const findAllUsersController = async (req, res) => {
  const users = await usersService.findAllUsersService();

  if (users.length === 0) {
    return res
      .status(404)
      .send({ message: "Não existem usuários cadastrados!" });
  }

  res.send({ users });
};

module.exports = {
  createUserController,
  findAllUsersController,
};
