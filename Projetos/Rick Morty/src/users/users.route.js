const router = require("express").Router();
const userController = require("./users.controller");

router.post("/create-user", userController.createUserController);
router.get("/all", userController.findAllUserController);
router.get("/:id", userController.findByIdUserController);
router.put("/:id", userController.updateUserController);
router.delete("/:id", userController.deleteUserController);

module.exports = router;
