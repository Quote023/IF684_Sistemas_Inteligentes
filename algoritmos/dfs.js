class DFS extends BuscaBase {
  constructor(terreno) {
    super(terreno);
    this.anterior = [];
  }

  dfs(partida, chegada, caminho) {
    const { x, y } = partida;
    this.visitados[y][x] = true;
    caminho.push(this.grid[y][x]);

    if (mesmaPosicao(partida, chegada)) return caminho;

    const vizinhos = this.obterVizinhos(y, x);
    this.listaVizinhos.push(vizinhos);

    for (const vizinho of vizinhos) {
      if (!this.visitados[vizinho.y][vizinho.x]) {
        this.anterior[vizinho.y][vizinho.x] = partida;
        caminho = this.dfs(vizinho, chegada, caminho);

        if (mesmaPosicao(ultimo(caminho), chegada))
          return caminho; // parar quando achar
      }
    }

    return caminho;
  }

  buscarCaminho(inicio, fim) {
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

    this.caminhoBusca = this.dfs(inicio, fim, []);

    let caminhoOtimo = [];
    let atual = this.grid[fim.y][fim.x];
    caminhoOtimo.push(atual);

    while (atual.y !== inicio.y || atual.x !== inicio.x) {
      atual = this.anterior[atual.y][atual.x];
      caminhoOtimo.unshift(atual);
    }

    this.caminhoAgente = caminhoOtimo;
    return this.caminhoAgente;
  }

}