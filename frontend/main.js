const apiUrl = 'https://trabalho-pratico-5jxs.onrender.com/alunos';

let modoEdicao = false;
let alunoAEditarId = null;

const lista = document.getElementById('lista-alunos');
const form = document.getElementById('form-aluno');

// Função para listar alunos
function carregarAlunos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(alunos => {
      lista.innerHTML = '';
      alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${aluno.nome} ${aluno.apelido} (${aluno.curso}, Ano ${aluno.anoCurricular})
          <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
          <button onclick="editarAluno('${aluno._id}', '${aluno.nome}', '${aluno.apelido}', '${aluno.curso}', ${aluno.anoCurricular})">Editar</button>
        `;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error('Erro ao carregar alunos:', err));
}

// Função para apagar um aluno
function apagarAluno(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(() => carregarAlunos())
  .catch((erro) => console.error('Erro ao apagar:', erro));
}

// Função para preencher o formulário com dados do aluno a editar
function editarAluno(id, nome, apelido, curso, anoCurricular) {
  document.getElementById('nome').value = nome;
  document.getElementById('apelido').value = apelido;
  document.getElementById('curso').value = curso;
  document.getElementById('anoCurricular').value = anoCurricular;

  modoEdicao = true;
  alunoAEditarId = id;
}

// Submeter novo aluno ou atualizar
form.addEventListener('submit', e => {
  e.preventDefault();
  const aluno = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: parseInt(document.getElementById('anoCurricular').value)
  };

  if (modoEdicao) {
    // Atualizar aluno
    fetch(`${apiUrl}/${alunoAEditarId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
    .then(() => {
      modoEdicao = false;
      alunoAEditarId = null;
      form.reset();
      carregarAlunos();
    })
    .catch(err => console.error('Erro ao atualizar aluno:', err));
  } else {
    // Adicionar novo aluno
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
    .then(() => {
      form.reset();
      carregarAlunos();
    })
    .catch(err => console.error('Erro ao adicionar aluno:', err));
  }
});

// Carregar alunos ao iniciar
carregarAlunos();

