const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Conta = require('./conta');
const Categoria = require('./categoria');

const Movimentacao = sequelize.define('Movimentacao', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  contaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Categoria.belongsTo(Categoria,{
  foreignKey: 'id'
});
Conta.belongsTo(Conta,{
  foreignKey: 'id'
});
module.exports = Movimentacao;
