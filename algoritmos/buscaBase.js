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
    return [
      this.grid[linha - 1]?.[coluna],
      this.grid[linha + 1]?.[coluna],
      this.grid[linha]?.[coluna + 1],
      this.grid[linha]?.[coluna - 1]
    ]
      .filter(v => !!v)
      .filter(v => v.custo >= 0);
  }

  display() {
    push();
    noStroke();
    rectMode(RADIUS);
    this.movimentosRealizados += 1;
    this.caminhoBusca.forEach((celula, i) => {
      if (i >= this.movimentosRealizados) return;
      if (!this.listaVizinhos[i]) return;
      fill(0, 0, 200);
      circle(celula.x * TAM_CELS + TAM_CELS / 2, celula.y * TAM_CELS + TAM_CELS / 2, TAM_CELS / 2)
      for (const vizinho of this.listaVizinhos[i]) {
        if (mesmaPosicao(vizinho, this.caminhoBusca[0])) continue;
        fill(0, 0, 200, 150);
        circle(vizinho.x * TAM_CELS + TAM_CELS / 2, vizinho.y * TAM_CELS + TAM_CELS / 3, TAM_CELS / 3);

      }
    })
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
