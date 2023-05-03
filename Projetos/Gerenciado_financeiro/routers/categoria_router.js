const express = require('express');
const router = express.Router();

const categoria_controller = require('../controllers/categoria_controller');

router.get('/findAll', categoria_controller.findAll_categoriaController);
router.get('/find/:id', categoria_controller.findById_categoriaController);
router.post('/create', categoria_controller.create_categoriaController);
router.put('/update/:id', categoria_controller.update_categoriaController);
router.delete('/delete/:id', categoria_controller.delete_categoriaController);

module.exports = router;