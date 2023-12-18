class Agente {
  constructor(x, y) {
    this.velMax = 6;
    this.raio = 6;
    this.movCont = 0;
    this.movimentosFeitos = [];
    this.movsAbs = [];
    this.pos = CelulaToPosicao({ x, y });
    this.vel = createVector(0, 0);
  }

  definirCaminho(caminho) {
    this.movsAbs = [];
    this.movimentosFeitos = [];
    this.movCont = caminho.length;
    for (const celula of caminho) {
      this.movsAbs.push({ ...CelulaToPosicao(celula), custo: celula.custo });
    }
    this.pos = this.movsAbs[0];
  }

  percorrerCaminho() {
    this.move();
    this.updatePos();
    return this.display();
  }

  move() {
    const target = PosicaoToVector(this.movsAbs[0]);
    const currentPos = PosicaoToVector(this.pos)
    const dist = p5.Vector.dist(target, currentPos);
    this.vel.set(p5.Vector.sub(target, currentPos));
    this.vel.limit(this.velMax / this.movsAbs[0].custo);


    if (dist == 0 && this.movsAbs.length > 1) {
      this.movimentosFeitos.push(this.movsAbs[0]);
      this.movsAbs.splice(0, 1);
    }
  }

  updatePos() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  display() {
    push();
    rectMode(RADIUS);
    stroke(255);
    strokeWeight(2);
    fill(180, 200, 128);
    for (let i = 1; i < this.movimentosFeitos.length; i++) {
      rect(this.movimentosFeitos[i].x, this.movimentosFeitos[i].y, this.raio, this.raio);
    }
    circle(this.pos.x, this.pos.y, 2 * this.raio);
    pop();

    if (this.movimentosFeitos.length == this.movCont) return 1;
    return 0;
  }
}