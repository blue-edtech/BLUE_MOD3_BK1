const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./user');

const Conta = sequelize.define('Conta', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_banco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  n_agencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  n_conta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  saldo: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

});

Conta.belongsTo(User,{
  foreignKey: 'userID'
});

module.exports = Conta;
