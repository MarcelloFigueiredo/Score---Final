// ===============================
// Seleção de elementos
// ===============================
const nomeInput = document.getElementById('nome');
const calcularBtn = document.getElementById('calcularBtn');
const salvarBtn = document.getElementById('salvarBtn');
const refazerBtn = document.getElementById('refazerBtn');
const progressBar = document.getElementById('progressBar');
const resultadoDiv = document.getElementById('resultado');
const botoesAcoes = document.getElementById('botoesAcoes');

// ===============================
// Configurações
// ===============================
const TOTAL_POSSIVEL = 200;

// ===============================
// Funções auxiliares
// ===============================
function getValores() {
  return {
    teste: Number(document.getElementById('teste').value) || 0,
    final: Number(document.getElementById('final').value) || 0,
    kahoot: Number(document.getElementById('kahoot').value) || 0
  };
}

function calcularPontuacao({ teste, final, kahoot }) {
  const totalObtido = teste + final + kahoot;
  const porcentagem = (totalObtido / TOTAL_POSSIVEL) * 100;

  return { totalObtido, porcentagem };
}

function definirCategoria(totalObtido) {
  let categoria, gifUrl, corBarra;

  if (totalObtido >= 190) {
    categoria = 'Sem Reforço';
    gifUrl = 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif';
    corBarra = '#FFD700';

  } else if (totalObtido >= 160) {
    categoria = 'Reforço Leve';
    gifUrl = 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif';
    corBarra = '#C0C0C0';

  } else {
    categoria = 'Reforço Geral';
    const gifs = [
      'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
      'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
      'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif'
    ];
    gifUrl = gifs[Math.floor(Math.random() * gifs.length)];
    corBarra = '#CD7F32';
  }

  return { categoria, gifUrl, corBarra };
}

function atualizarUI({ nome, totalObtido, porcentagem, categoria, gifUrl, corBarra }) {
  // Barra
  progressBar.style.width = `${porcentagem}%`;
  progressBar.style.background = corBarra;

  // Resultado
  resultadoDiv.innerHTML = `
    <p>Nome do Analista: <strong>${nome}</strong></p>
    <p>Pontuação total: ${totalObtido}/${TOTAL_POSSIVEL}</p>
    <p>Porcentagem: ${porcentagem.toFixed(1)}%</p>
    <p>Categoria: ${categoria}</p>
    <img src="${gifUrl}" alt="${categoria}">
  `;

  // Classes
  resultadoDiv.className = '';
  resultadoDiv.classList.add('show', categoria.toLowerCase());

  // Botões
  botoesAcoes.style.display = 'flex';
}

function resetCalculadora() {
  nomeInput.value = '';
  document.getElementById('teste').value = 0;
  document.getElementById('final').value = 0;
  document.getElementById('kahoot').value = 0;

  progressBar.style.width = '0%';
  progressBar.style.background = '#00AEEF';

  resultadoDiv.innerHTML = '';
  resultadoDiv.className = '';

  botoesAcoes.style.display = 'none';
}

// ===============================
// Eventos
// ===============================
calcularBtn.addEventListener('click', () => {
  const nome = nomeInput.value.trim() || 'Analista';

  const valores = getValores();
  const { totalObtido, porcentagem } = calcularPontuacao(valores);
  const { categoria, gifUrl, corBarra } = definirCategoria(totalObtido);

  atualizarUI({
    nome,
    totalObtido,
    porcentagem,
    categoria,
    gifUrl,
    corBarra
  });
});

salvarBtn.addEventListener('click', () => {
  if (resultadoDiv.innerHTML.trim() !== '') {
    const nomeArquivo = nomeInput.value.trim() || "analista";

    html2pdf().from(resultadoDiv).set({
      margin: 10,
      filename: `resultado_${nomeArquivo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    }).save();
  }
});

refazerBtn.addEventListener('click', resetCalculadora);
