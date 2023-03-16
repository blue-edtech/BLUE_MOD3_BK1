require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database/database");
const authRoute = require("./auth/auth.route");
const usersRoute = require("./users/users.route");
const tweetsRoute = require("./tweets/tweets.route");
const swaggerRoute = require("./swagger/swagger.route");

const port = process.env.PORT || 3001;

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/tweets", tweetsRoute);

app.listen(port, () =>
  console.info(`Servidor rodando em http://localhost:${port}`)
);
