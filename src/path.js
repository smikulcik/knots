import { circle, drawBezier, getCursor, line } from './2d.js'
import { distance, normalize, vadd, veq, vmag, vscalar, vsub } from './vector.js'

export class Path {
  constructor() {
    this.vertices = []
    this.cursor
    this.cursorDown = false
    this.closed = false
  }

  draw(context) {
    const lineWidth = 30

    for (let v = 0; v < this.vertices.length - 1; v++) {
      drawBezier(context, [
        this.vertices[v], this.vertices[v].c1, this.vertices[v + 1].c2, this.vertices[v + 1],
      ], 3, '#008800')
      drawBezier(context, [
        this.vertices[v], this.vertices[v].c1, this.vertices[v + 1].c2, this.vertices[v + 1],
      ], lineWidth, '#000000')
      drawBezier(context, [
        this.vertices[v], this.vertices[v].c1, this.vertices[v + 1].c2, this.vertices[v + 1],
      ], lineWidth - 3, '#ffffff')
    }
    for (let v = 0; v < this.vertices.length - 1; v++) {
      line(context, this.vertices[v].c2, this.vertices[v], 1, '#333333')
      line(context, this.vertices[v], this.vertices[v].c1, 1, '#333333')
      line(context, this.vertices[v + 1].c2, this.vertices[v + 1], 1, '#333333')
      line(context, this.vertices[v + 1], this.vertices[v + 1].c1, 1, '#333333')
      circle(context, this.vertices[v], 3, '#00ff00')
      circle(context, this.vertices[v].c1, 3, '#0000ff')
      circle(context, this.vertices[v + 1].c2, 3, '#ff0000')
      circle(context, this.vertices[v + 1], 3, '#00ff00')
    }
    // close the loop if closed
    // let closureColor = '#aaaaaa'
    // if (this.vertices.length > 0 && this.closed){
    //     closureColor = '#008800'
    // }
    // const fv = this.vertices[0]
    // const lv = this.vertices[this.vertices.length-1]
    // drawBezier(context, [lv, lv.c1, fv.c2, fv], 3, closureColor)
    // drawBezier(context, [lv, lv.c1, fv.c2, fv], lineWidth, '#000000')
    // drawBezier(context, [lv, lv.c1, fv.c2, fv], lineWidth - 3, '#ffffff')
  }

  // events
  onmousedown(e) {
    if (this.closed) return

    const cursor = getCursor(e)
    this.cursorDown = true

    // if no vertices, add one
    if (this.vertices.length === 0) {
      // add a new point
      this.vertices.push({
        x: cursor.x,
        y: cursor.y,
        c1: {
          x: cursor.x,
          y: cursor.y,
        },
        c2: {
          x: cursor.x,
          y: cursor.y,
        },
      })
    }
  }

  onmousemove(e) {
    if (this.closed) return

    this.cursor = getCursor(e)
    // mouse up curves to cursor
    if (this.vertices.length > 0) {
      const lv = this.vertices[this.vertices.length - 1] // last vertex
      lv.x = this.cursor.x
      lv.y = this.cursor.y
      lv.c1 = {
        x: this.cursor.x,
        y: this.cursor.y,
      }
      lv.c2 = {
        x: this.cursor.x,
        y: this.cursor.y,
      }
      // set c1 of the last last one in relation to the cursor
      const llv = this.vertices[this.vertices.length - 2] // last-last vertex
      const lllv = this.vertices[this.vertices.length - 3] // last-last-last vertex
      if (llv && lllv && !veq(llv, lv)) {
        let angRef = llv.c2
        if (veq(llv, llv.c2)) {
          angRef = lllv
        }
        llv.c1 = vadd(llv, vscalar(0.5 * vmag(vsub(lv, llv)), normalize(vsub(llv, angRef))))
        lv.c2 = vadd(lv, vscalar(vmag(vsub(llv, llv.c1)), normalize(vsub(llv.c1, lv))))
      }
    }
  }

  onmouseup(e) {
    if (this.closed) return

    const cursor = getCursor(e)
    this.cursorDown = false

    // if close to start, join to start and end drawing
    if (this.vertices.length > 1) {
      const fv = this.vertices[0]
      const lv = this.vertices[this.vertices.length - 1]
      if (lv && distance(fv, lv) < 10) {
        this.closed = true
        // clear out first.c2 and last c1 for first to make it a clean line
        fv.c2 = {
          x: fv.x,
          y: fv.y,
        }
        lv.x = fv.x
        lv.y = fv.y
        lv.c1 = {
          x: lv.x,
          y: lv.y,
        }
        return
      }
    }

    // add a new point
    this.vertices.push({
      x: cursor.x,
      y: cursor.y,
      c1: {
        x: cursor.x,
        y: cursor.y,
      },
      c2: {
        x: cursor.x,
        y: cursor.y,
      },
    })
  }

  onkeyup(e) {
    if (e.key === 'Enter') {
      this.closed = true
    }
  }
}
