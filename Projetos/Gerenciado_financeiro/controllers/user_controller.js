const findAll_userController = async (req, res) => {
    try{
      res.send("usuarios");
    } catch (err) {
      res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
      console.log(err.message);
    }
  };

module.exports = {
    findAll_userController
};
