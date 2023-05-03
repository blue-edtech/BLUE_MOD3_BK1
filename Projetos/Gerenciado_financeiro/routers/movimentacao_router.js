const express = require('express');
const router = express.Router();

const movimentacao_controller = require('../controllers/movimentacao_controller');

router.get('/findAll', movimentacao_controller.findAll_movimentacaoController);
router.get('/find/:id', movimentacao_controller.findById_movimentacaoController);
router.post('/create', movimentacao_controller.create_movimentacaoController);
router.put('/update/:id', movimentacao_controller.update_movimentacaoController);
router.delete('/delete/:id', movimentacao_controller.delete_movimentacaoController);

module.exports = router;