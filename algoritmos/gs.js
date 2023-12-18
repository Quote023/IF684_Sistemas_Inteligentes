class GS extends BuscaBase {
  constructor(terreno) {
    super(terreno);
    this.filaPrioritaria = new FilaPrioritaria();
    this.anterior = [];
  }

  distManhattan(pos, alvo) {
    let dx = Math.abs(alvo.x - pos.x);
    let dy = Math.abs(alvo.y - pos.y);
    return dx + dy;
  }

  buscaGulosa(inicio, alvo) {
    this.filaPrioritaria.enqueue(inicio, this.distManhattan(inicio, alvo));
    this.caminhoBusca.push(inicio);
    let encontrado = false;

    while (!this.filaPrioritaria.isEmpty()) {
      const noAtual = this.filaPrioritaria.dequeue()[0];
      const coluna = noAtual.x;
      const linha = noAtual.y;

      if (linha === alvo.y && coluna === alvo.x) {
        encontrado = true;
        break;
      }

      this.visitados[linha][coluna] = true;

      let vizinhos = this.obterVizinhos(linha, coluna);
      this.listaVizinhos.push(vizinhos);

      for (const vizinho of vizinhos) {
        let colunaVizinho = vizinho.x;
        let linhaVizinho = vizinho.y;
        let custo = this.distManhattan(vizinho, alvo);

        if (!this.visitados[linhaVizinho][colunaVizinho]) {
          this.visitados[linhaVizinho][colunaVizinho] = true;
          let totalCusto = custo;

          this.caminhoBusca.push(vizinho);
          this.filaPrioritaria.enqueue(vizinho, totalCusto);
          this.anterior[linhaVizinho][colunaVizinho] = noAtual;
        }
      }
    }

    if (!encontrado) {
      return null;
    }

    this.filaPrioritaria.esvaziar();
    let caminhoOtimo = [];
    let atual = alvo;
    caminhoOtimo.push(atual);

    while (atual.y !== inicio.y || atual.x !== inicio.x) {
      atual = this.anterior[atual.y][atual.x];
      caminhoOtimo.unshift(atual);
    }

    this.caminhoAgente = caminhoOtimo;
    return caminhoOtimo;
  }

  buscarCaminho(inicioPonto, fimPonto) {
    for (let i = 0; i < this.grid.length; i++) {
      this.visitados[i] = [];
      this.anterior[i] = [];
      for (let j = 0; j < this.grid[i].length; j++) {
        this.visitados[i][j] = false;
        this.anterior[i][j] = null;
      }
    }

    this.movimentosRealizados = 0;
    this.caminhoAgente = [];
    this.caminhoBusca = [];
    this.listaVizinhos = [];

    this.caminhoAgente = this.buscaGulosa(inicioPonto, fimPonto);
    return this.caminhoAgente;
  }
}