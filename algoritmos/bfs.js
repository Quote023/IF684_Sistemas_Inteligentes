class BFS extends BuscaBase {

    // Ele herda da "busca base" fila e pais, pais uma matriz para armazenar os pais de cada célula
    constructor(terreno) {
        super(terreno);
        this.fila = [];
        this.pais = [];
    }

    //Ele realiza uma busca em largura do agente até o objeto. Ele utiliza uma fila para armazenar os nós a serem explorados. O loop principal continua até que todos os nós relevantes sejam visitados.
    //Durante a busca, o código marca os nós visitados, enfileira os vizinhos não visitados, adiciona esses vizinhos ao caminho de busca e define os pais de cada nó para reconstruir o caminho ótimo posteriormente.
    bfs(inicioLinha, inicioColuna, alvo) {
        const marcarVisitado = (linha, coluna) => this.visitado[linha][coluna] = true;
        const enfileirar = (linha, coluna) => this.fila.push([linha, coluna]);
        const adicionarAoCaminho = (linha, coluna) => this.caminhoBusca.push([linha, coluna]);
        const definirPai = (linhaFilho, colunaFilho, linhaPai, colunaPai) =>
            this.pais[linhaFilho][colunaFilho] = [linhaPai, colunaPai];

        marcarVisitado(inicioLinha, inicioColuna);
        enfileirar(inicioLinha, inicioColuna);
        adicionarAoCaminho(inicioLinha, inicioColuna);
        let encontrado = false;

        while (this.fila.length > 0) {
            let [linha, coluna] = this.fila.shift();

            if (linha === alvo[0] && coluna === alvo[1]) {
                encontrado = true;
                break;
            }

            const vizinhos = this.obterVizinhos(linha, coluna);
            this.adicionarAListaDeVizinhos(vizinhos);

            for (let [linhaVizinho, colunaVizinho] of vizinhos) {
                if (!this.visitado[linhaVizinho][colunaVizinho]) {
                    marcarVisitado(linhaVizinho, colunaVizinho);
                    enfileirar(linhaVizinho, colunaVizinho);
                    adicionarAoCaminho(linhaVizinho, colunaVizinho);
                    definirPai(linhaVizinho, colunaVizinho, linha, coluna);
                }
            }
        }

        return encontrado ? this.construirCaminhoOtimo(inicioLinha, inicioColuna, alvo) : null;
    }

    // metodos básicos e necessários
    definirCaminho(inicioPonto, fimPonto) {
        this.inicializarArrays();
        this.caminhoAgente = this.bfs(inicioPonto[0], inicioPonto[1], fimPonto);
    }

    inicializarArrays() {
        this.pais = Array.from({ length: this.matriz.length }, () => []);
        this.visitado = Array.from({ length: this.matriz.length }, () =>
            Array(this.matriz[0].length).fill(false)
        );

        this.resetarCaminhos();
    }

    resetarCaminhos() {
        this.movimentosRealizados = 0;
        this.caminhoAgente = [];
        this.caminhoBusca = [];
        this.listaDeVizinhos = [];
        this.fila = [];
    }

    //Este método reconstrói o caminho ótimo do ponto inicial ao ponto alvo usando as informações armazenadas na matriz pais
    construirCaminhoOtimo(inicioLinha, inicioColuna, alvo) {
        let caminhoOtimo = [];
        let atual = [alvo[0], alvo[1], this.matriz[alvo[0]][alvo[1]]];
        caminhoOtimo.push(atual);

        while (atual[0] !== inicioLinha || atual[1] !== inicioColuna) {
            atual = this.pais[atual[0]][atual[1]];
            caminhoOtimo.unshift([atual[0], atual[1], this.matriz[atual[0]][atual[1]]]);
        }

        return caminhoOtimo;
    }
}