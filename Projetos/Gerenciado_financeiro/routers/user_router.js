const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user_controller');

router.get('/findAll', user_controller.findAll_userController);

module.exports = router;