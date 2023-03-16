require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectionDB = require("./database/database");
const userRoute = require("./users/users.route");
const authRoute = require("./auth/auth.route");
const characterRoute = require("./characters/characters.route");
const swaggerRoute = require("./swagger/swagger.route");
const port = process.env.PORT || 3000;
const app = express();

connectionDB();
app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/characters", characterRoute);
app.use("/swagger", swaggerRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
