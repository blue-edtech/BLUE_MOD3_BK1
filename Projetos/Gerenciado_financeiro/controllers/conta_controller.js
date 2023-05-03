const Conta = require("../model/conta");

const findAll_contaController = async (req, res) => {
  try{
    res.send(await Conta.findAll());
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const findById_contaController = async (req, res) => {
  try{
    const conta = await Conta.findByPk(req.params.id);
    if (conta === null){
      res.send("Conta nao encontrado!");
    }else{
      res.send(conta);
    }
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const create_contaController = async (req, res) => {
  try {
    await Conta.create(req.body);
    const contas = await Conta.findAll();
    res.send(contas);
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

const update_contaController = async (req, res) => {
  try {
    await Conta.update(req.body, { where:{ id: req.params.id }});
    res.send(await Conta.findByPk(req.params.id));
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}
const delete_contaController = async (req, res) => {
  try {
    await Conta.destroy({where: { id: req.params.id }});
    res.send("Deletado com sucesso!");
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

module.exports = {
  findAll_contaController,
  findById_contaController,
  create_contaController,
  update_contaController,
  delete_contaController
};
