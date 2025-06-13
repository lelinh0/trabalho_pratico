const apiUrl = 'https://trabalho-pratico-5jxs.onrender.com/alunos';

const lista = document.getElementById('lista-alunos');
const form = document.getElementById('form-aluno');
const botaoSubmit = form.querySelector('button');

let alunoEmEdicao = null; // null = modo adicionar | string = id MongoDB

function carregarAlunos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(alunos => {
      lista.innerHTML = '';
      alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome} ${aluno.apelido} (${aluno.curso}, Ano ${aluno.anoCurricular}) `;

        // Botão Apagar
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'Apagar';
        botaoApagar.addEventListener('click', () => apagarAluno(aluno._id));
        li.appendChild(botaoApagar);

        // Botão Editar
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', () => carregarParaEdicao(aluno));
        li.appendChild(botaoEditar);

        lista.appendChild(li);
      });
    })
    .catch(erro => {
      console.error('Erro ao carregar alunos:', erro);
    });
}

function apagarAluno(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos())
    .catch(erro => {
      console.error('Erro ao apagar aluno:', erro);
    });
}

function carregarParaEdicao(aluno) {
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('apelido').value = aluno.apelido;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('anoCurricular').value = aluno.anoCurricular;
  alunoEmEdicao = aluno._id;

  botaoSubmit.textContent = 'Guardar Alterações';
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const alunoData = {
    nome: document.getElementById('nome').value.trim(),
    apelido: document.getElementById('apelido').value.trim(),
    curso: document.getElementById('curso').value.trim(),
    anoCurricular: parseInt(document.getElementById('anoCurricular').value)
  };

  if (alunoEmEdicao) {
    // Atualizar aluno existente
    fetch(`${apiUrl}/${alunoEmEdicao}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoData)
    })
      .then(() => {
        alunoEmEdicao = null;
        botaoSubmit.textContent = 'Adicionar Aluno';
        form.reset();
        carregarAlunos();
      })
      .catch(erro => {
        console.error('Erro ao editar aluno:', erro);
      });
  } else {
    // Criar novo aluno
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoData)
    })
      .then(() => {
        form.reset();
        carregarAlunos();
      })
      .catch(erro => {
        console.error('Erro ao adicionar aluno:', erro);
      });
  }
});

// Carregamento inicial
carregarAlunos();
