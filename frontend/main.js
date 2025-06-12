const apiUrl = 'https://trabalho-pratico-5jxs.onrender.com/alunos';

const lista = document.getElementById('lista-alunos');
const form = document.getElementById('form-aluno');

function carregarAlunos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(alunos => {
      lista.innerHTML = '';
      alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${aluno.nome} ${aluno.apelido} (${aluno.curso}, Ano ${aluno.anoCurricular})
          <button onclick="apagarAluno(${aluno.id})">Apagar</button>
        `;
        lista.appendChild(li);
      });
    });
}

function apagarAluno(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos());
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const novoAluno = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: parseInt(document.getElementById('anoCurricular').value)
  };
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoAluno)
  })
    .then(() => {
      form.reset();
      carregarAlunos();
    });
});

carregarAlunos();