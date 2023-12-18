class AStar extends BuscaBase {
  constructor(terreno) {
    super(terreno);
    this.filaPrioritaria = new FilaPrioritaria();
    this.anterior = [];
  }


  buscaGulosa(inicio, alvo) {
    this.filaPrioritaria.enqueue(inicio, distManhattan(inicio, alvo) + inicio.custo);
    this.caminhoBusca.push(inicio);
    let encontrado = false;

    while (!this.filaPrioritaria.estaVazia()) {
      // Obter o nó com o menor custo até agora da fila prioritária
      let noAtual = this.filaPrioritaria.dequeue();
      const coluna = noAtual[0].x;
      const linha = noAtual[0].y;

      // Verificar se o nó atual é o nó alvo
      if (mesmaPosicao(noAtual[0], alvo)) {
        encontrado = true;
        break;
      }

      // Adicionar o nó atual ao conjunto de visitados
      this.visitados[linha][coluna] = true;

      let vizinhos = this.obterVizinhos(linha, coluna);
      this.listaVizinhos.push(vizinhos);

      // Loop pelos vizinhos do nó atual
      for (const vizinho of vizinhos) {
        // Verificar se há um caminho para o vizinho
        let custo = distManhattan(vizinho, alvo) ** 2 + this.grid[vizinho.y][vizinho.x].custo;

        // Verificar se o vizinho já foi visitado
        if (!this.visitados[vizinho.y][vizinho.x]) {
          this.visitados[vizinho.y][vizinho.x] = true;
          // Calcular o custo total para alcançar o vizinho
          let custoTotal = noAtual[1] + custo;

          this.caminhoBusca.push(vizinho)
          // Adicionar o vizinho à fila prioritária com o custo total como prioridade
          this.filaPrioritaria.enqueue(vizinho, custoTotal);
          this.anterior[vizinho.y][vizinho.x] = noAtual[0];
        }
      }
    }

    // Se o nó alvo não for encontrado, retornar nulo
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

