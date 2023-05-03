const User =  require("../model/user");

const findAll_userController = async (req, res) => {
  try{
    res.send(await User.findAll());
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const findById_userController = async (req, res) => {
  try{
    const user = await User.findByPk(req.params.id);
    if (user === null){
      res.send("Usuario nao encontrado!");
    }else{
      res.send(user);
    }
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const create_userController = async (req, res) => {
  try {
    await User.create(req.body);
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

const update_userController = async (req, res) => {
  try {
    await User.update(req.body, { where:{ id: req.params.id }});
    res.send(await User.findByPk(req.params.id));
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}
const delete_userController = async (req, res) => {
  try {
    await User.destroy({where: { id: req.params.id }});
    res.send("Deletado com sucesso!");
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

module.exports = {
  findAll_userController,
  findById_userController,
  create_userController,
  update_userController,
  delete_userController
};
