const router = require("express").Router();

const usersController = require("./users.controller");

router.post("/create", usersController.createUserController);
router.get("/", usersController.findAllUsersController);

module.exports = router;
