const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Categoria = sequelize.define('Categoria', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Categoria;
