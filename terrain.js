class Grid {
  constructor(linhas, colunas, tamCelula, cores, custo) {
    this.nLinhas = linhas;
    this.nColunas = colunas;

    this.terreno = [];
    createCanvas(this.nColunas * TAM_CELS, this.nLinhas * TAM_CELS);

    const noiseStep = 0.3;
    let noiseOffset = 0.0
    for (let linha = 0; linha < this.nLinhas; linha++) {
      if (!this.terreno[linha])
        this.terreno[linha] = [];

      for (let col = 0; col < this.nColunas; col++) {
        const noiseLinha = noiseStep * linha;
        const noiseCol = noiseStep * col;
        const noiseTempo = noiseStep * frameCount;

        const valor = floor(noise(noiseLinha, noiseCol, noiseTempo) * cores.length);
        this.terreno[linha][col] = {
          posicao: { x: col, y: linha },
          valor: valor,
          custo: custo[valor],
          cor: cores[valor]
        };
        noiseOffset += noiseStep;
      }
    }

    this.inicio = { x: 0, y: 0 }
    this.fim = { x: 0, y: 0 }

    do {
      this.inicio.y = floor(random(this.nLinhas));
      this.inicio.x = floor(random(this.nColunas));
    } while (this.terreno[this.inicio.y][this.inicio.x].custo < 0);
    do {
      this.fim.y = floor(random(this.nLinhas));
      this.fim.x = floor(random(this.nColunas));
    } while (this.terreno[this.fim.y][this.fim.x].custo < 0);

    console.log(this.inicio)
    console.log(this.fim)
  }

  display() {
    for (let linha = 0; linha < this.nLinhas; linha++) {
      for (let col = 0; col < this.nColunas; col++) {
        fill(this.terreno[linha][col].cor);
        rect(linha * TAM_CELS, col * TAM_CELS, TAM_CELS, TAM_CELS);
      }
    }


    // Draw the starting and ending positions
    fill(0, 0, 255);
    star(XtoPos(this.inicio.x), XtoPos(this.inicio.y), TAM_CELS / 2, TAM_CELS / 4, 5);
    fill(255, 255, 0);
    star(XtoPos(this.fim.x), XtoPos(this.fim.y), TAM_CELS / 2, TAM_CELS / 4, 10);
  }
}

const XtoPos = (pos) => pos * TAM_CELS + TAM_CELS / 2