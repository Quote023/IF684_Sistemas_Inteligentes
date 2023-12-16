class Agente {
  constructor(x, y) {
    this.velMax = 3;
    this.raio = 6;
    this.movCont = 0;
    this.movs = [];
    this.movsAbs = [];
    this.pos = { x, y };
    this.vel = createVector(0, 0);
  }

  definirCaminho(caminho) {
    this.movs = [];
    this.movsAbs = [];
    this.movCont = caminho.length;

    for (let i = 0; i < caminho.length; ++i) {
      let move = [caminho[i][0] * TAM_CELS + TAM_CELS / 2, caminho[i][1] * TAM_CELS + TAM_CELS / 2, caminho[i][2]];
      this.movsAbs.push(move);
    }
  }

  run() {
    this.move();
    this.updatePos();
    return this.display();
  }

  move() {
    let target = createVector(this.movsAbs[0][0], this.movsAbs[0][1]);
    let dist = p5.Vector.dist(target, this.pos);
    this.vel.set(p5.Vector.sub(target, this.pos));
    this.vel.limit(this.velMax / this.movsAbs[0][2]);


    if (dist == 0 && this.movsAbs.length > 1) {
      this.movs.push(this.movsAbs[0]);
      this.movsAbs.splice(0, 1);
    }
  }

  updatePos() {
    this.pos.add(this.vel);
  }

  display() {
    push();
    rectMode(RADIUS);
    stroke(255);
    strokeWeight(2);
    fill(180, 200, 128);
    for (let i = 1; i < this.movs.length; i++) {
      rect(this.movs[i][0], this.movs[i][1], this.raio, this.raio);
    }
    circle(this.pos.x, this.pos.y, 2 * this.raio);
    pop();

    if (this.movs.length == this.movCont) return 1;
    return 0;
  }
}