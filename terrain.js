class Grid {
  constructor(linhas, colunas, tamCelula, cores, custo) {
    this.nLinhas = linhas;
    this.nColunas = colunas;
    this.tamanhoCelula = tamCelula;

    this.terreno = [];

    createCanvas(this.nColunas * this.tamanhoCelula, this.nLinhas * this.tamanhoCelula);

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


  }

  display() {
    for (let linha = 0; linha < this.nLinhas; linha++) {
      for (let col = 0; col < this.nColunas; col++) {
        fill(this.terreno[linha][col].cor);
        rect(linha * this.tamanhoCelula, col * this.tamanhoCelula, this.tamanhoCelula, this.tamanhoCelula);
      }
    }
  }
}