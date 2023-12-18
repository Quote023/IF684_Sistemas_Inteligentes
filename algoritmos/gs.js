class GS extends BuscaBase {
    
    //Ele cria uma fila prioritária (filaPrioritaria) e uma matriz (pais) para armazenar os pais de cada célula durante a busca.
    
    constructor(terreno) {
        super(terreno);
        this.filaPrioritaria = new FilaPrioritaria();
        this.pais = [];
    }
    
    //Este método calcula a distância Manhattan entre duas posições em uma matriz
    distManhattan(linhaAtual, colunaAtual, alvo) {
        let dx = Math.abs(alvo[0] - linhaAtual);
        let dy = Math.abs(alvo[1] - colunaAtual);
        return dx + dy;
    }
    
    //O método buscaGulosa realiza a busca gulosa a partir do ponto de início (linhaInicio, colunaInicio) até o ponto alvo (alvo)
    //Ele utiliza uma fila prioritária para armazenar os nós a serem explorados, priorizando aqueles que estão mais próximos do alvo.
    //Durante a busca, o código marca os nós visitados, enfileira os vizinhos não visitados, adiciona esses vizinhos ao caminho de busca e define os pais de cada nó para reconstruir o caminho ótimo posteriormente.
    buscaGulosa(linhaInicio, colunaInicio, alvo) {    
        this.filaPrioritaria.enqueue([linhaInicio, colunaInicio], this.distManhattan(linhaInicio, colunaInicio, alvo));
        this.adicionarAoCaminhoBusca([linhaInicio, colunaInicio]);
        let encontrado = false;
      
        while (!this.filaPrioritaria.isEmpty()) {
            let noAtual = this.filaPrioritaria.dequeue();
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
                    this.filaPrioritaria.enqueue([linhaVizinho, colunaVizinho], totalCusto);
                    this.pais[linhaVizinho][colunaVizinho] = [linha, coluna];
                }
            }
        }
      
        if(!encontrado){
            return null;
        }

        this.filaPrioritaria.esvaziar();
        let caminhoOtimo = [];
        let atual = [alvo[0], alvo[1], this.matriz[alvo[0]][alvo[1]]];
        caminhoOtimo.push(atual);
        while(atual[0] !== linhaInicio || atual[1] !== colunaInicio) {
            atual = this.pais[atual[0]][atual[1]];
            caminhoOtimo.unshift([atual[0], atual[1], this.matriz[atual[0]][atual[1]]]);
        }
        return caminhoOtimo;
    }
    
    //Este método inicializa as estruturas necessárias e define o caminho do agente utilizando o algoritmo de busca gulosa
    
    definirCaminho(inicioPonto, fimPonto){
        this.inicializarArrays();
        this.caminhoAgente = this.buscaGulosa(inicioPonto[0], inicioPonto[1], fimPonto);
    }
}