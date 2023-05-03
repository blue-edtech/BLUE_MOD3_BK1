const Movimentacao =  require("../model/movimentacao");

const findAll_movimentacaoController = async (req, res) => {
  try{
    res.send(await Movimentacao.findAll());
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const findById_movimentacaoController = async (req, res) => {
  try{
    const movimentacao = await Movimentacao.findByPk(req.params.id);
    if (movimentacao === null){
      res.send("Usuario nao encontrado!");
    }else{
      res.send(movimentacao);
    }
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const create_movimentacaoController = async (req, res) => {
  try {
    await Movimentacao.create(req.body);
    const movimentacaos = await Movimentacao.findAll();
    res.send(movimentacaos);
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

const update_movimentacaoController = async (req, res) => {
  try {
    await Movimentacao.update(req.body, { where:{ id: req.params.id }});
    res.send(await Movimentacao.findByPk(req.params.id));
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}
const delete_movimentacaoController = async (req, res) => {
  try {
    await Movimentacao.destroy({where: { id: req.params.id }});
    res.send("Deletado com sucesso!");
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

module.exports = {
  findAll_movimentacaoController,
  findById_movimentacaoController,
  create_movimentacaoController,
  update_movimentacaoController,
  delete_movimentacaoController
};
