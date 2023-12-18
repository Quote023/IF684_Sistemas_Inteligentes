class GS extends BuscaBase{
    constructor(terreno) {
        super(terreno);
        this.filaPrioritaria = new FilaPrioritaria();
        this.anterior = [];
    }

    distManhattan(linhaAtual, colunaAtual, alvo) {
        let dx = Math.abs(alvo[0] - linhaAtual);
        let dy = Math.abs(alvo[1] - colunaAtual);
        return dx + dy;
    }

    GS(linhaInicio, colunaInicio, alvo) {
        this.filaPrioritaria.enfileirar([linhaInicio, colunaInicio], this.distManhattan(linhaInicio, colunaInicio, alvo));
        this.caminhoBusca.push([linhaInicio, colunaInicio]);
        let encontrado = false;

        while (!this.filaPrioritaria.estaVazia()) {
            let noAtual = this.filaPrioritaria.desenfileirar();
            let linha = noAtual[0][0];
            let coluna = noAtual[0][1];

            if (linha === alvo[0] && coluna === alvo[1]) {
                encontrado = true;
                break;
            }

            this.visitado[linha][coluna] = true;

            let vizinhos = this.obterVizinhos(linha, coluna);
            this.adicionarAListaDeVizinhos(vizinhos);

            for (let i = 0; i < vizinhos.length; i++) {
                let linhaVizinho = vizinhos[i][0];
                let colunaVizinho = vizinhos[i][1];
                let custo = this.distManhattan(linhaVizinho, colunaVizinho, alvo);

                if (!this.visitado[linhaVizinho][colunaVizinho]) {
                    this.visitado[linhaVizinho][colunaVizinho] = true;
                    let totalCusto = custo;

                    this.adicionarAoCaminhoBusca([linhaVizinho, colunaVizinho]);
                    this.filaPrioritaria.enfileirar([linhaVizinho, colunaVizinho], totalCusto);
                    this.anterior[linhaVizinho][colunaVizinho] = [linha, coluna];
                }
            }
        }

        if (!encontrado) {
            return null;
        }

        this.filaPrioritaria.esvaziar();
        let caminhoOtimo = [];
        let atual = [alvo[0], alvo[1], this.matriz[alvo[0]][alvo[1]]];
        caminhoOtimo.push(atual);
        while (atual[0] !== linhaInicio || atual[1] !== colunaInicio) {
            atual = this.anterior[atual[0]][atual[1]];
            caminhoOtimo.unshift([atual[0], atual[1], this.matriz[atual[0]][atual[1]]]);
        }
        return caminhoOtimo;
    }

    definirCaminho(inicioPonto, fimPonto) {
        this.inicializarArrays();
        this.caminhoAgente = this.GS(inicioPonto[0], inicioPonto[1], fimPonto);
    }
}
