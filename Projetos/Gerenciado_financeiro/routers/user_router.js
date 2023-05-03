const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user_controller');

router.get('/findAll', user_controller.findAll_userController);
router.get('/find/:id', user_controller.findById_userController);
router.post('/create', user_controller.create_userController);
router.put('/update/:id', user_controller.update_userController);
router.delete('/delete/:id', user_controller.delete_userController);

module.exports = router;