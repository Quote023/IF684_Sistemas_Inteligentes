
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


class PriorityQueue {
  constructor() {
    this.elements = [];
  }
  enqueue(element, priority) {
    // Create a new object to represent the element and its priority
    let item = [element, priority];

    // Loop through the elements in the queue and find the correct position for the new element
    let added = false;
    for (let i = 0; i < this.elements.length; i++) {
      if (item[1] < this.elements[i][1]) {
        this.elements.splice(i, 0, item);
        added = true;
        break;
      }
    }

    // If the element has the highest priority so far, add it to the end of the queue
    if (!added) {
      this.elements.push(item);
    }
  }

  // Removes and returns the element with the lowest priority
  dequeue() {
    return this.elements.shift();
  }
  isEmpty() {
    return this.elements.length === 0;
  }

  toEmpty() {
    this.elements = [];
  }

  getPriority(element) {
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i][0] === element[0] && this.elements[i][1] === element[1]) {
        return this.elements[i][1];
      }
    }
    return undefined;
  }
}