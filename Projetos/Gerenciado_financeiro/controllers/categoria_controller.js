const Categoria = require("../model/categoria");

const findAll_categoriaController = async (req, res) => {
  try{
    res.send(await Categoria.findAll());
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const findById_categoriaController = async (req, res) => {
  try{
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria === null){
      res.send("Categoria nao encontrado!");
    }else{
      res.send(categoria);
    }
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
};

const create_categoriaController = async (req, res) => {
  try {
    await Categoria.create(req.body);
    const categorias = await Categoria.findAll();
    res.send(categorias);
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

const update_categoriaController = async (req, res) => {
  try {
    await Categoria.update(req.body, { where:{ id: req.params.id }});
    res.send(await Categoria.findByPk(req.params.id));
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}
const delete_categoriaController = async (req, res) => {
  try {
    await Categoria.destroy({where: { id: req.params.id }});
    res.send("Deletado com sucesso!");
  } catch (err) {
    res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
    console.log(err.message);
  }
}

module.exports = {
  findAll_categoriaController,
  findById_categoriaController,
  create_categoriaController,
  update_categoriaController,
  delete_categoriaController
};
