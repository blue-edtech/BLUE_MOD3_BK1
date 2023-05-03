const Sequelize = require('sequelize');
const sequelize = new Sequelize('gerenciador', 'postgres', 'blue2023', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: true,
});



sequelize.authenticate()
  .then(() => {
    console.log('Banco conectado com sucesso');
  })
  .catch(err => {
    console.error('Nao foi possivel conectar devido ao erro:', err);
  });

sequelize.sync({force: true})
.then(() => {
  console.log('sincronizado');
})
.catch(err => {
  console.error('Nao foi possivel sincronizar devido ao erro:', err);
});

module.exports = sequelize;
