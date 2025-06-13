const apiUrl = 'https://trabalho-pratico-5jxs.onrender.com/alunos';

let modoEdicao = false;
let alunoAEditarId = null;

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
        li.innerHTML = `
          ${aluno.nome} ${aluno.apelido} (${aluno.curso}, Ano ${aluno.anoCurricular})
          <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
          <button onclick="editarAluno(
            '${aluno._id}',
            '${encodeURIComponent(aluno.nome)}',
            '${encodeURIComponent(aluno.apelido)}',
            '${encodeURIComponent(aluno.curso)}',
            ${aluno.anoCurricular}
          )">Editar</button>
        `;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error('Erro ao carregar alunos:', err));
}

function apagarAluno(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => carregarAlunos())
    .catch(erro => console.error('Erro ao apagar:', erro));
}

function editarAluno(id, nome, apelido, curso, anoCurricular) {
  console.log("ENTREI EM MODO DE EDIÇÃO:", id);
  document.getElementById('nome').value = decodeURIComponent(nome);
  document.getElementById('apelido').value = decodeURIComponent(apelido);
  document.getElementById('curso').value = decodeURIComponent(curso);
  document.getElementById('anoCurricular').value = anoCurricular;

  modoEdicao = true;
  alunoAEditarId = id;
  botaoSubmit.textContent = 'Atualizar Aluno';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const aluno = {
    nome: document.getElementById('nome').value.trim(),
    apelido: document.getElementById('apelido').value.trim(),
    curso: document.getElementById('curso').value.trim(),
    anoCurricular: parseInt(document.getElementById('anoCurricular').value)
  };

  if (modoEdicao) {
    fetch(`${apiUrl}/${alunoAEditarId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar');
        modoEdicao = false;
        alunoAEditarId = null;
        botaoSubmit.textContent = 'Adicionar Aluno';
        form.reset();
        carregarAlunos();
      })
      .catch(err => console.error('Erro ao atualizar aluno:', err));
  } else {
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao adicionar');
        form.reset();
        carregarAlunos();
      })
      .catch(err => console.error('Erro ao adicionar aluno:', err));
  }
});

carregarAlunos();
