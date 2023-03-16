const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //biblioteca responsável por encriptar o password

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true, // parâmetro para o documento ter um único valor, ou seja, não ter o mesmo email para dois usuários diferentes
    required: true,
    lowercase: true, // parâmetro para receber o valor da string em letras minúsculas
  },
  password: {
    type: String,
    required: true,
    select: false, // parâmetro para não mostrar o password quando um usuário for buscado no banco de dados
  },
  avatar: {
    type: String,
    required: true,
  },
});

// função responsável por criar um hash (uma string que "esconde" o password)
UserSchema.pre("save", async function (next) {
  // bcrypt.hash(string que sofrerá um hash, número de vezes que será gerado um hash diferente)
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
