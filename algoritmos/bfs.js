class BFS extends BuscaBase {

  // Ele herda da "busca base" fila e pais, pais uma matriz para armazenar os pais de cada célula
  constructor(terreno) {
    super(terreno);
    this.fila = [];
    this.anterior = [];
  }

  //Ele realiza uma busca em largura do agente até o objeto. Ele utiliza uma fila para armazenar os nós a serem explorados. O loop principal continua até que todos os nós relevantes sejam visitados.
  //Durante a busca, o código marca os nós visitados, enfileira os vizinhos não visitados, adiciona esses vizinhos ao caminho de busca e define os pais de cada nó para reconstruir o caminho ótimo posteriormente.
  bfs(inicio, alvo) {
    const marcarVisitado = (no) => this.visitados[no.y][no.x] = true;
    const enfileirar = (no) => this.fila.push(no);
    const adicionarAoCaminho = (no) => this.caminhoBusca.push(no);
    const definirPai = (filho, pai) =>
      this.anterior[filho.y][filho.x] = pai;

    marcarVisitado(inicio);
    enfileirar(inicio);
    adicionarAoCaminho(inicio);
    let encontrado = false;

    while (this.fila.length > 0) {
      let noAtual = this.fila.shift();

      if (mesmaPosicao(noAtual, alvo)) {
        encontrado = true;
        break;
      }

      const vizinhos = this.obterVizinhos(noAtual.y, noAtual.x);
      this.listaVizinhos.push(vizinhos);

      for (let vizinho of vizinhos) {
        if (this.visitados[vizinho.y][vizinho.x]) continue;
        marcarVisitado(vizinho);
        enfileirar(vizinho);
        adicionarAoCaminho(vizinho);
        definirPai(vizinho, noAtual);
      }
    }

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

  // metodos básicos e necessários
  buscarCaminho(inicioPonto, fimPonto) {
    this.anterior = Array.from({ length: this.grid.length }, () => []);
    this.visitados = Array.from({ length: this.grid.length }, () =>
      Array(this.grid[0].length).fill(false)
    );

    this.movimentosRealizados = 0;
    this.caminhoAgente = [];
    this.caminhoBusca = [];
    this.listaVizinhos = [];
    this.fila = [];

    this.caminhoAgente = this.bfs(inicioPonto, fimPonto);
    return this.caminhoAgente;
  }

}