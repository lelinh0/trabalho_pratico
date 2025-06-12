const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rotas
const alunoRoutes = require('./routes/alunoRoutes');
app.use('/alunos', alunoRoutes);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
  })
  .catch(err => console.log(err));
