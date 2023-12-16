class DFS extends BuscaBase {
  constructor(terreno) {
    super(terreno);
    this.pais = [];
  }

  dfs(y, x, target, caminhoBusca) {
    this.visitados[y][x] = true;
    caminhoBusca.push([y, x, this.matriz[y][x]]);

    if (y == target.y && x == target.x) {
      return caminhoBusca;
    }

    let neighbors = this.obterVizinhos(y, x);
    this.listaVizinhos.push(neighbors);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!this.visitados[neighbor[0]][neighbor[1]]) {
        this.pais[neighbor[0]][neighbor[1]] = [y, x];
        caminhoBusca = this.dfs(neighbor[0], neighbor[1], target, caminhoBusca);

        if (caminhoBusca[caminhoBusca.length - 1][0] == target.y && caminhoBusca[caminhoBusca.length - 1][1] == target.x) {
          return caminhoBusca;
        }
      }
    }

    return caminhoBusca;
  }

  buscarCaminho(inicio, fim) {
    for (let i = 0; i < this.matriz.length; i++) {
      this.visitados[i] = [];
      this.pais[i] = [];
      for (let j = 0; j < this.matriz[i].length; j++) {
        this.visitados[i][j] = false;
        this.pais[i][j] = null;
      }
    }

    this.movimentosRealizados = 0;
    this.caminhoAgente = [];
    this.caminhoBusca = [];
    this.listaVizinhos = [];

    this.caminhoBusca = this.dfs(inicio.y, inicio.x, fim, []);

    let optimalPath = [];
    let current = [fim.y, fim.x, this.matriz[fim.y][fim.x]];
    optimalPath.push(current);
    while (current[0] !== inicio.y || current[1] !== inicio.x) {
      current = this.pais[current[0]][current[1]];
      optimalPath.unshift([current[0], current[1], this.matriz[current[0]][current[1]]]);
    }

    this.caminhoAgente = optimalPath;
    return this.caminhoAgente;
  }

}