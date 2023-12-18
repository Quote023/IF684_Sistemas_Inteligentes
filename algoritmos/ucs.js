class UCS extends BuscaBase {
    constructor(terreno) {
        super(terreno);
        this.filaPrioritaria = new FilaPrioritaria();
        this.pais = [];
    }
    
    buscaCustoUniforme(linhaInicio, colunaInicio, alvo) {
        // Adiciona o nó de início à fila prioritária com custo 0
        this.filaPrioritaria.enqueue([linhaInicio, colunaInicio], this.matriz[linhaInicio][colunaInicio]);
        this.adicionarAoCaminhoBusca([linhaInicio, colunaInicio]);
        let encontrado = false;

        while (!this.filaPrioritaria.isEmpty()) {
            // Obtém o nó com o menor custo até agora da fila prioritária
            let noAtual = this.filaPrioritaria.dequeue();
            let linha = noAtual[0][0];
            let coluna = noAtual[0][1];

            // Verifica se o nó atual é o nó alvo
            if (linha === alvo[0] && coluna === alvo[1]) {
                encontrado = true;
                break;
            }

            // Adiciona o nó atual ao conjunto de visitados
            this.visitado[linha][coluna] = true;

            let vizinhos = this.obterVizinhos(linha, coluna);
            this.adicionarAListaDeVizinhos(vizinhos);

            // Loop pelos vizinhos do nó atual
            for (let vizinho of vizinhos) {
                let linhaVizinho = vizinho[0];
                let colunaVizinho = vizinho[1];
                let custo = this.matriz[linhaVizinho][colunaVizinho];

                // Verifica se o vizinho já foi visitado
                if (!this.visitado[linhaVizinho][colunaVizinho]) {
                    this.visitado[linhaVizinho][colunaVizinho] = true;
                    // Calcula o custo total para alcançar o vizinho
                    let custoTotal = noAtual[1] + custo;

                    this.adicionarAoCaminhoBusca([linhaVizinho, colunaVizinho]);
                    // Adiciona o vizinho à fila prioritária com o custo total como prioridade
                    this.filaPrioritaria.enqueue([linhaVizinho, colunaVizinho], custoTotal);
                    this.pais[linhaVizinho][colunaVizinho] = [linha, coluna];
                }
            }
        }

        // Se o nó alvo não for encontrado, retorna null
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
        this.caminhoAgente = this.buscaCustoUniforme(inicioPonto[0], inicioPonto[1], fimPonto);
    }
}