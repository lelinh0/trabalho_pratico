const Aluno = require('../models/Aluno');

exports.listar = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

exports.criar = async (req, res) => {
  const novo = new Aluno(req.body);
  await novo.save();
  res.status(201).json(novo);
};

exports.apagar = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
