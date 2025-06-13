const Aluno = require('../models/Aluno');

exports.listar = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar alunos.', err });
  }
};

exports.criar = async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    const guardado = await novoAluno.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar aluno.', err });
  }
};

exports.apagar = async (req, res) => {
  try {
    const removido = await Aluno.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    res.json({ mensagem: 'Aluno apagado com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao apagar aluno.', err });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar aluno.', err });
  }
};