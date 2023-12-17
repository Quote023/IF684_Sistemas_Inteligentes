class BuscaBase {
  constructor(terreno) {
    this.visitados = [];
    this.grid = terreno;
    this.caminhoBusca = [];
    this.caminhoAgente = [];
    this.listaVizinhos = [];

    this.movimentosRealizados = 0;
  }

  buscarCaminho() {
    return [];
  }

  obterVizinhos(linha, coluna) {
    let vizinhos = [];
    if (linha > 0 && this.grid[linha - 1][coluna].custo != -1) {
      vizinhos.push(this.grid[linha - 1][coluna]);
    }
    if (coluna < this.grid[0].length - 1 && this.grid[linha][coluna + 1].custo != -1) {
      vizinhos.push(this.grid[linha][coluna + 1]);
    }
    if (linha < this.grid.length - 1 && this.grid[linha + 1][coluna].custo != -1) {
      vizinhos.push(this.grid[linha + 1][coluna]);
    }
    if (coluna > 0 && this.grid[linha][coluna - 1].custo != -1) {
      vizinhos.push(this.grid[linha][coluna - 1]);
    }
    return vizinhos;
  }

  display() {
    push();
    noStroke();
    fill(200, 0, 200);
    rectMode(RADIUS);
    this.movimentosRealizados += 1;
    this.caminhoBusca.forEach((celula, i) => {
      if (i >= this.movimentosRealizados) return;
      if (!this.listaVizinhos[i]) return;
      for (const vizinho of this.listaVizinhos[i]) {
        if (mesmaPosicao(vizinho, this.caminhoBusca[0])) continue;
        rect(vizinho.x * TAM_CELS + TAM_CELS / 2, vizinho.y * TAM_CELS + TAM_CELS / 2, TAM_CELS / 8, TAM_CELS / 8);

      }
      rect(celula.x * TAM_CELS + TAM_CELS / 2, celula.y * TAM_CELS + TAM_CELS / 2, TAM_CELS / 4, TAM_CELS / 4)
    })
    // for (let i = 0; (i < this.caminhoBusca.length) && (i < this.movimentosRealizados); i++) {
    //   if (this.listaVizinhos[i]) {
    //     for (let j = 0; j < this.listaVizinhos[i].length; j++) {
    //       if (this.listaVizinhos[i][j][0] == this.caminhoBusca[0][0] && this.listaVizinhos[i][j][1] == this.caminhoBusca[0][1]) continue;
    //       if (this.listaVizinhos[i][j][0] == this.caminhoAgente[this.caminhoAgente.length - 1][0] && this.listaVizinhos[i][j][1] == this.caminhoAgente[this.caminhoAgente.length - 1][1]) continue;
    //       rect(this.listaVizinhos[i][j][0] * TAM_CELS + TAM_CELS / 2, this.listaVizinhos[i][j][1] * TAM_CELS + TAM_CELS / 2, TAM_CELS / 8, TAM_CELS / 8);
    //     }
    //   }
    // }
    // for (let i = 1; (i < this.caminhoBusca.length) && (i < this.movimentosRealizados); i++) {
    //   if (this.caminhoBusca[i][0] == this.caminhoAgente[this.caminhoAgente.length - 1][0] && this.caminhoBusca[i][1] == this.caminhoAgente[this.caminhoAgente.length - 1][1]) {
    //     stroke(0, 0, 0);
    //     strokeWeight(1);
    //     triangle(this.caminhoAgente[this.caminhoAgente.length - 1][0] * TAM_CELS + TAM_CELS / 2, this.caminhoAgente[this.caminhoAgente.length - 1][1] * TAM_CELS,
    //       this.caminhoAgente[this.caminhoAgente.length - 1][0] * TAM_CELS + TAM_CELS, this.caminhoAgente[this.caminhoAgente.length - 1][1] * TAM_CELS + TAM_CELS * 3 / 4,
    //       this.caminhoAgente[this.caminhoAgente.length - 1][0] * TAM_CELS, this.caminhoAgente[this.caminhoAgente.length - 1][1] * TAM_CELS + TAM_CELS * 3 / 4);
    //     noStroke();
    //     continue;
    //   }
    //   rect(this.caminhoBusca[i][0] * TAM_CELS + TAM_CELS / 2, this.caminhoBusca[i][1] * TAM_CELS + TAM_CELS / 2, TAM_CELS / 4, TAM_CELS / 4);
    // }
    pop();
    if (this.movimentosRealizados == this.caminhoBusca.length) return 1;
    return 0;
  }

  exibirCaminhoOtimo(tamanhoCelula) {
    push();
    fill(0, 0, 0);
    rectMode(RADIUS);
    this.movimentosRealizados += 1;
    for (let i = 1; (i < this.caminhoAgente.length - 1) && (i < this.movimentosRealizados); i++) {
      circle(this.caminhoAgente[i][0] * tamanhoCelula + tamanhoCelula / 2, this.caminhoAgente[i][1] * tamanhoCelula + tamanhoCelula / 2, 12);
    }
    pop();
    if (this.movimentosRealizados == this.caminhoAgente.length) return 1;
    return 0;
  }
}
