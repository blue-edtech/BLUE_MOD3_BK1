const router = require("express").Router();

const characterController = require("./characters.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post(
  "/create-character",
  authMiddleware,
  characterController.createCharacterController
);
router.get(
  "/all",
  authMiddleware,
  characterController.findAllCharactersController
);
router.get(
  "/search",
  authMiddleware,
  characterController.searchCharacterController
);

module.exports = router;
