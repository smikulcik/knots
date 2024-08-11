import { vadd } from './vector.js'

export class GridPattern {
  constructor(cols, rows, pallet, pattern) {
    this.cols = cols
    this.pallet = pallet
    this.pattern = pattern
    this.offset = {
      x: 0,
      y: 0,
    }
    if (pattern.length != cols * rows) {
      throw new Error('wrong num elements ' + pattern.length)
    }
  }

  points() {
    let numPoints = 0
    for (const p in this.pattern) {
      const tile = this.pallet[this.pattern[p]]
      numPoints += tile.points()
    }
    return numPoints
  }

  draw(context) {
    for (const p in this.pattern) {
      const col = p % this.cols
      const row = Math.floor(p / this.cols)
      const tile = this.pallet[this.pattern[p]]
      tile.offset = vadd(this.offset, {
        x: tile.width * col,
        y: tile.height * row,
      })
      tile.draw(context)
    }
  }
}
