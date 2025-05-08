// Obtém o carrinho do localStorage ou cria um vazio
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const container = document.getElementById("carrinho-itens");
const totalSpan = document.getElementById("total");

let total = 0; // Variável para calcular o total

// Verifica se o carrinho está vazio
if (carrinho.length === 0) {
  // Mostra mensagem de carrinho vazio
  container.innerHTML = `
    <div class="carrinho-vazio">
      <img src="imagens/carrinho-vazio.png" alt="Carrinho vazio">
      <p>Seu carrinho está vazio</p>
    </div>
  `;
} else {
  // Itera sobre os itens do carrinho
  for (let i = 0; i < carrinho.length; i++) {
    const item = carrinho[i];
    const subtotal = item.preco * item.quantidade;
    total += subtotal; // Acumula o total

    // Cria o elemento para cada item do carrinho
    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <div class="info-item">
        <h3>${item.nome}</h3>
        <span class="categoria">${item.categoria || 'hamburgueres'}</span>
      </div>
      <div class="controles-item">
        <span class="preco-unitario">R$ ${item.preco.toFixed(2)}</span>
        <span class="quantidade">${item.quantidade}x</span>
        <span class="subtotal">R$ ${subtotal.toFixed(2)}</span>
      </div>
    `;
    container.appendChild(div);
  }
}

// Atualiza o total na página
totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;

// Função para processar o pagamento
function fazerPagamento() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens antes de prosseguir.");
    return;
  }
  // Limpa o carrinho e redireciona para a página de pagamento
  localStorage.removeItem("carrinho");
  window.location.href = "pagamento.html";
}