
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function distManhattan(pos, alvo) {
  let dx = Math.abs(alvo.x - pos.x);
  let dy = Math.abs(alvo.y - pos.y);
  return dx + dy;
}

function ultimo(arr) {
  return arr[Math.max(arr.length - 1, 0)];
}

function mesmaPosicao(vec1, vec2) {
  return vec1.x === vec2.x && vec1.y === vec2.y;
}

class FilaPrioritaria {
  constructor(seletor) {
    this.elementos = [];
    this.seletor = seletor;
  }
  enqueue(element, priority) {
    // Create a new object to represent the element and its priority
    let item = [element, priority];

    // Loop through the elements in the queue and find the correct position for the new element
    let added = false;
    for (let i = 0; i < this.elementos.length; i++) {
      if (item[1] < this.elementos[i][1]) {
        this.elementos.splice(i, 0, item);
        added = true;
        break;
      }
    }

    // If the element has the highest priority so far, add it to the end of the queue
    if (!added) {
      this.elementos.push(item);
    }
  }

  // Removes and returns the element with the lowest priority
  dequeue() {
    return this.elementos.shift();
  }
  estaVazia() {
    return this.elementos.length === 0;
  }

  esvaziar() {
    this.elementos = [];
  }

  getPriority(element) {
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i][0] === element[0] && this.elementos[i][1] === element[1]) {
        return this.elementos[i][1];
      }
    }
    return undefined;
  }
}