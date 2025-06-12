const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // lê variáveis do .env

const app = express();
app.use(cors()); // permite que o frontend aceda
app.use(express.json()); // permite usar JSON no body das requests

// 👇 AQUI ligas as rotas
const alunoRoutes = require('./routes/alunoRoutes');
app.use('/alunos', alunoRoutes); // <- ESTE É O TEU ENDPOINT REAL

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro a ligar à base de dados:', err);
  });
