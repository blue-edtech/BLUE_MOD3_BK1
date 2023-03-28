const express = require('express');
const app = express();
const cors = require("cors");
const sequelize = require('./model/database');
//const User = require('./model/user');

const User = require('./routers/user_router');

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

//sequelize.sync();

app.use(function(req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/user", User);

app.get('/test-conection', async (req, res) => {
  try {
    // Executa uma query simples para verificar se a conexão está funcionando
    const result = await sequelize.query('SELECT 1 + 1 AS solution');
    res.send(`Conexão com o Sequelize e o banco de dados estabelecida. Resultado: ${result[0][0].solution}`);
  } catch (error) {
    console.error('Erro ao testar conexão com o Sequelize:', error);
    res.status(500).send('Erro ao testar conexão com o Sequelize');
  }
});

app.listen(port, () => {
  console.log(`Server rodando em: http://localhost:${port}`);
});