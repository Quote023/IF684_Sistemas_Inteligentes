class Grid {
  constructor() {
    this.nLinhas = N_LINHAS;
    this.nColunas = N_COLS;

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

        const valor = floor(noise(noiseLinha, noiseCol, noiseTempo) * CORES_TERRENO.length);
        this.terreno[linha][col] = {
          x: col,
          y: linha,
          valor: valor,
          custo: CUSTO_TERRENO[valor],
          cor: CORES_TERRENO[valor]
        };
        noiseOffset += noiseStep;
      }
    }

    this.inicio = this.terreno[0][0]
    this.fim = this.terreno[0][0]

    do {
      this.inicio = this.terreno[floor(random(this.nLinhas))][floor(random(this.nColunas))];
    } while (this.inicio.custo < 0);
    do {
      this.fim = this.terreno[floor(random(this.nLinhas))][floor(random(this.nColunas))];
    } while (this.fim.custo < 0);

    console.log(this.inicio)
    console.log(this.fim)
  }

  display() {
    for (let linha = 0; linha < this.nLinhas; linha++) {
      for (let col = 0; col < this.nColunas; col++) {
        fill(this.terreno[linha][col].cor);
        rect(col * TAM_CELS, linha * TAM_CELS, TAM_CELS, TAM_CELS);
        fill([0, 0, 0, 100])
        text(this.terreno[linha][col].custo, (col) * TAM_CELS, (linha + 1) * TAM_CELS);
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