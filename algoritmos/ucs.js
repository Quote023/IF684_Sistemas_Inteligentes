class UCS extends BuscaBase {
  constructor(terreno) {
    super(terreno);
    this.filaPrioritaria = new FilaPrioritaria();
    this.anterior = [];
  }

  buscaCustoUniforme(inicio, alvo) {
    // Adiciona o nó de início à fila prioritária com custo 0
    this.filaPrioritaria.enqueue(inicio, inicio.custo);
    this.caminhoBusca.push(inicio);
    let encontrado = false;

    while (!this.filaPrioritaria.estaVazia()) {
      // Obtém o nó com o menor custo até agora da fila prioritária
      let noAtual = this.filaPrioritaria.dequeue();
      let linha = noAtual[0].y;
      let coluna = noAtual[0].x;

      // Verifica se o nó atual é o nó alvo
      if (mesmaPosicao(noAtual[0], alvo)) {
        encontrado = true;
        break;
      }

      // Adiciona o nó atual ao conjunto de visitados
      this.visitados[linha][coluna] = true;

      let vizinhos = this.obterVizinhos(linha, coluna);
      this.listaVizinhos.push(vizinhos);

      // Loop pelos vizinhos do nó atual
      for (let vizinho of vizinhos) {
        let linhaVizinho = vizinho.y;
        let colunaVizinho = vizinho.x;
        let custo = this.grid[linhaVizinho][colunaVizinho].custo;

        // Verifica se o vizinho já foi visitado
        if (!this.visitados[linhaVizinho][colunaVizinho]) {
          this.visitados[linhaVizinho][colunaVizinho] = true;
          // Calcula o custo total para alcançar o vizinho
          let custoTotal = noAtual[1] + custo;

          this.caminhoBusca.push(vizinho);
          // Adiciona o vizinho à fila prioritária com o custo total como prioridade
          this.filaPrioritaria.enqueue(vizinho, custoTotal);
          this.anterior[linhaVizinho][colunaVizinho] = noAtual[0];
        }
      }
    }

    // Se o nó alvo não for encontrado, retorna null
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

    this.caminhoAgente = this.buscaCustoUniforme(inicioPonto, fimPonto);
    return this.caminhoAgente;
  }
}