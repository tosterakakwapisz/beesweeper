class Cell {
  /**
   * Cell - class for sweeper cell.
   * It has index i and j, size and x, y pixel positions (calculated using index and size)
   * @param {Number} i index I
   * @param {Number} j index J
   * @param {Number} size size in pixels
   */
  constructor(i, j, size) {
    this.i = i;
    this.j = j;
    this.size = size;
    this.x = i * size;
    this.y = j * size;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
  }

  /**
   * Shows cell (to be visible in draw())
   */
  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    if (!this.revealed) return;

    if (this.bee) {
      fill(127);
      ellipse(
        this.x + this.size * 0.5,
        this.y + this.size * 0.5,
        this.size * 0.5
      );
    } else {
      fill(200);
      rect(this.x, this.y, this.size, this.size);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(
          this.neighborCount,
          this.x + this.size * 0.5,
          this.y + this.size * 0.75
        );
      }
    }
  }

  /**
   * Counts bees and sets neighbor count
   */
  countBees() {
    if (this.bee) {
      this.neighborCount = -1;
      return;
    }

    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        let neighbor = grid[i]?.[j];
        if (neighbor && neighbor.bee) {
          total++;
        }
      }
    }
    this.neighborCount = total;
  }

  /**
   * Checks if given x and y are inside this Cell
   * @param {Number} x x param
   * @param {Number} y y param
   * @returns {Boolean} true if inside this Cell
   */
  contains(x, y) {
    return (
      x > this.x && x < this.x + this.size &&
      y > this.y && y < this.y + this.size
    );
  }

  /** Reveals this Cell */
  reveal() {
    this.revealed = true;
    if (this.neighborCount === 0) this.floodFill();
  }

  /** Revelas empty Cells with Flood Fill stuff  */
  floodFill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        let neighbor = grid[i]?.[j];
        if (neighbor && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
}