const Aluno = require('../models/Aluno'); // ou caminho para o teu modelo

// Atualizar aluno por ID
exports.atualizarAluno = async (req, res) => {
  try {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // devolve o documento atualizado
    );
    if (!alunoAtualizado) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    }
    res.json(alunoAtualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar aluno.', erro });
  }
};
