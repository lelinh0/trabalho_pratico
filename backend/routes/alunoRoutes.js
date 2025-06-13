const express = require('express');
const router = express.Router();
const alunoCtrl = require('../controllers/alunoController');

router.get('/', alunoCtrl.listar);
router.post('/', alunoCtrl.criar);
router.delete('/:id', alunoCtrl.apagar);
router.put('/alunos/:id', alunoController.atualizarAluno);

module.exports = router;
