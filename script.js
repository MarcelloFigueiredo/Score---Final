// Selecionando elementos
const nomeInput = document.getElementById('nome');
const calcularBtn = document.getElementById('calcularBtn');
const salvarBtn = document.getElementById('salvarBtn');
const refazerBtn = document.getElementById('refazerBtn');
const progressBar = document.getElementById('progressBar');
const resultadoDiv = document.getElementById('resultado');
const botoesAcoes = document.getElementById('botoesAcoes');

// Função para resetar a calculadora
function resetCalculadora() {
  nomeInput.value = '';
  document.getElementById('teste').value = 0;
  document.getElementById('final').value = 0;
  document.getElementById('kahoot').value = 0;

  progressBar.style.width = '0%';
  progressBar.style.background = '#00AEEF';

  resultadoDiv.innerHTML = '';
  resultadoDiv.classList.remove('show', 'Sem Reforço', 'Reforço Leve', 'Reforço Geral');

  botoesAcoes.style.display = 'none';
}

// Função principal de cálculo
calcularBtn.addEventListener('click', () => {
  const nomeAnalista = nomeInput.value.trim() || "Analista";

  // Pegando valores das avaliações
  const teste = Number(document.getElementById('teste').value);   // 12 avaliações de 10 + 1 de 15 = 130
  const final = Number(document.getElementById('final').value);   // avaliação final 50
  const kahoot = Number(document.getElementById('kahoot').value); // kahoot 5

  // Total possível
  const totalObtido = teste + final + kahoot;
  const totalPossivel = 200; // 12*10 + 1*15 + 50 + 5 = 200
  const porcentagem = (totalObtido / totalPossivel) * 100;

  // Definir categoria e GIF
  let categoria = '';
  let gifUrl = '';
  let corBarra = '#00AEEF';

  if (porcentagem >= 95) {
    categoria = 'Sem Reforço';
    gifUrl = 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif';
    corBarra = '#FFD700';
  } else if (porcentagem >= 80) {
    categoria = 'Reforço Leve';
    gifUrl = 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif';
    corBarra = '#C0C0C0';
  } else {
    categoria = 'Reforço Geral';
    const bronzeGifs = [
      'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
      'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
      'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif'
    ];
    gifUrl = bronzeGifs[Math.floor(Math.random() * bronzeGifs.length)];
    corBarra = '#CD7F32';
  }

  // Atualiza barra de progresso
  progressBar.style.width = `${porcentagem}%`;
  progressBar.style.background = corBarra;

  // Mostra resultado
  resultadoDiv.innerHTML = `
    <p>Nome do Analista: <strong>${nomeAnalista}</strong></p>
    <p>Pontuação total: ${totalObtido}/${totalPossivel}</p>
    <p>Porcentagem: ${porcentagem.toFixed(1)}%</p>
    <p>Categoria: ${categoria}</p>
    <img src="${gifUrl}" alt="${categoria} GIF">
  `;

  // Remove classes antigas e adiciona a nova + show
  resultadoDiv.classList.remove('Sem Reforço', 'Reforço Leve', 'Reforço Geral');
  resultadoDiv.classList.add('show', categoria.toLowerCase());

  // Mostra os botões abaixo do GIF
  botoesAcoes.style.display = 'flex';
});

// Salvar resultado em PDF
salvarBtn.addEventListener('click', () => {
  if(resultadoDiv.innerHTML.trim() !== '') {
    const nomeArquivo = nomeInput.value.trim() || "analista";
    html2pdf().from(resultadoDiv).set({
      margin: 10,
      filename: `resultado_${nomeArquivo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    }).save();
  }
});

// Refazer cálculo
refazerBtn.addEventListener('click', resetCalculadora);
