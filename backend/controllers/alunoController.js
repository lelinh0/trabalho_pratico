const Aluno = require('../models/Aluno');

// Listar todos os alunos
exports.listar = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar alunos.', erro });
  }
};

// Criar um novo aluno
exports.criar = async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    const alunoGuardado = await novoAluno.save();
    res.status(201).json(alunoGuardado);
  } catch (erro) {
    res.status(400).json({ mensagem: 'Erro ao criar aluno.', erro });
  }
};

// Apagar aluno por ID
exports.apagar = async (req, res) => {
  try {
    const alunoRemovido = await Aluno.findByIdAndDelete(req.params.id);
    if (!alunoRemovido) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    }
    res.json({ mensagem: 'Aluno removido com sucesso.' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao apagar aluno.', erro });
  }
};

// Atualizar aluno por ID
exports.atualizarAluno = async (req, res) => {
  try {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!alunoAtualizado) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    }
    res.json(alunoAtualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar aluno.', erro });
  }
};

