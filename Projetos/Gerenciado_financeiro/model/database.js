const Sequelize = require('sequelize');
const sequelize = new Sequelize('gerenciador', 'postgres', 'blue2023', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Banco conectado com sucesso');
  })
  .catch(err => {
    console.error('Nao foi possivel conectar devido ao erro:', err);
  });

module.exports = sequelize;
