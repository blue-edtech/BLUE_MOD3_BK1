const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

router.use("/api/v1", swaggerUi.serve);
router.get("/api/v1", swaggerUi.setup(swaggerDocument));

module.exports = router;
