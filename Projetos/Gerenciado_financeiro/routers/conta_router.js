const express = require('express');
const router = express.Router();

const conta_controller = require('../controllers/conta_controller');

router.get('/findAll', conta_controller.findAll_contaController);
router.get('/find/:id', conta_controller.findById_contaController);
router.post('/create', conta_controller.create_contaController);
router.put('/update/:id', conta_controller.update_contaController);
router.delete('/delete/:id', conta_controller.delete_contaController);

module.exports = router;