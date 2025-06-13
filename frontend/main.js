const apiUrl = 'https://trabalho-pratico-5jxs.onrender.com/alunos';

let alunoEmEdicao = null;
const lista = document.getElementById('lista-alunos');
const form = document.getElementById('form-aluno');
const botaoSubmit = form.querySelector('button');

function carregarAlunos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(alunos => {
      lista.innerHTML = '';
      alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome} ${aluno.apelido} (${aluno.curso}, Ano ${aluno.anoCurricular})`;

        const apagarBtn = document.createElement('button');
        apagarBtn.textContent = 'Apagar';
        apagarBtn.onclick = () => apagarAluno(aluno._id);
        li.appendChild(apagarBtn);

        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.onclick = () => carregarParaEdicao(aluno);
        li.appendChild(editarBtn);

        lista.appendChild(li);
      });
    });
}

function apagarAluno(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos());
}

function carregarParaEdicao(aluno) {
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('apelido').value = aluno.apelido;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('anoCurricular').value = aluno.anoCurricular;
  alunoEmEdicao = aluno._id;
  botaoSubmit.textContent = 'Atualizar Aluno';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const aluno = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: parseInt(document.getElementById('anoCurricular').value)
  };

  if (alunoEmEdicao) {
    fetch(`${apiUrl}/${alunoEmEdicao}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
      .then(() => {
        alunoEmEdicao = null;
        botaoSubmit.textContent = 'Adicionar Aluno';
        form.reset();
        carregarAlunos();
      });
  } else {
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
      .then(() => {
        form.reset();
        carregarAlunos();
      });
  }
});

carregarAlunos();
