class AStar extends BuscaBase {
  constructor(terreno) {
      super(terreno);
      this.filaPrioritaria = new FilaPrioritaria();
      this.pais = [];
  }

  distManhattan(linhaAtual, colunaAtual, alvo) {
      let dx = Math.abs(alvo[0] - linhaAtual);
      let dy = Math.abs(alvo[1] - colunaAtual);
      return dx + dy;
  }

  buscaGulosa(linhaInicio, colunaInicio, alvo) {    
      this.filaPrioritaria.enfileirar([linhaInicio, colunaInicio], this.distManhattan(linhaInicio, colunaInicio, alvo) + this.matriz[linhaInicio][colunaInicio]);
      this.caminhoBusca.push([linhaInicio, colunaInicio]);
      let encontrado = false;
    
      while (!this.filaPrioritaria.estaVazia()) {
          // Obter o nó com o menor custo até agora da fila prioritária
          let noAtual = this.filaPrioritaria.desenfileirar();
          let linha = noAtual[0][0];
          let coluna = noAtual[0][1];
    
          // Verificar se o nó atual é o nó alvo
          if (linha === alvo[0] && coluna === alvo[1]) {
              encontrado = true;
              break;
          }
    
          // Adicionar o nó atual ao conjunto de visitados
          this.visitado[linha][coluna] = true;

          let vizinhos = this.obterVizinhos(linha, coluna);
          this.adicionarAListaDeVizinhos(vizinhos);

          // Loop pelos vizinhos do nó atual
          for (let [linhaVizinho, colunaVizinho] of vizinhos) {
              // Verificar se há um caminho para o vizinho
              let custo = this.distManhattan(linhaVizinho, colunaVizinho, alvo) ** 2 + this.matriz[linhaVizinho][colunaVizinho];
  
              // Verificar se o vizinho já foi visitado
              if (!this.visitado[linhaVizinho][colunaVizinho]) {
                  this.visitado[linhaVizinho][colunaVizinho] = true;
                  // Calcular o custo total para alcançar o vizinho
                  let custoTotal = noAtual[1] + custo;
                  
                  this.caminhoBusca.push([linhaVizinho, colunaVizinho])
                  // Adicionar o vizinho à fila prioritária com o custo total como prioridade
                  this.filaPrioritaria.enfileirar([linhaVizinho, colunaVizinho], custoTotal);
                  this.pais[linhaVizinho][colunaVizinho] = [linha, coluna];
              }
          }
      }
    
      // Se o nó alvo não for encontrado, retornar nulo
      if (!encontrado) {
          return null;
      }

      this.filaPrioritaria.esvaziar();
      let caminhoOtimo = [];
      let atual = [alvo[0], alvo[1], this.matriz[alvo[0]][alvo[1]]];
      caminhoOtimo.push(atual);

      while (atual[0] !== linhaInicio || atual[1] !== colunaInicio) {
          atual = this.pais[atual[0]][atual[1]];
          caminhoOtimo.unshift([atual[0], atual[1], this.matriz[atual[0]][atual[1]]]);
      }

      return caminhoOtimo;
  }
  
  definirCaminho(inicioPonto, fimPonto) {
      this.inicializarArrays();
      this.caminhoAgente = this.buscaGulosa(inicioPonto[0], inicioPonto[1], fimPonto);
  }
}
