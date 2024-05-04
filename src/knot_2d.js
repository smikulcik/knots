import { CircleObject, bezier, circle, line } from "./2d"
import { splitQuadBezier } from "./bezier"
import { figure8, trefoil, unknot } from "./common_knots"
import { angMagFrom, distance } from "./vector"

export class Knot {
  constructor(knot, lineWidth){
    this.knot = knot
    this.lineWidth = lineWidth

    this.selected = false
    this.selectablePoint = undefined
  }
  onmousedown(e){
    if (this.selectablePoint === undefined) return
    this.selected = true
  }
  onmouseup(e){
    this.selected = false
  }
  onmousemove(e){
    // move selected things around
    if (this.selected && this.selectablePoint){
      this.knot[this.selectablePoint.i].x = this.selectablePoint.p.x
      this.knot[this.selectablePoint.i].y = this.selectablePoint.p.y
    }

    // get the current selectable points
    // if mouse is nearby, draw handle
    this.selectablePoint = undefined
    const controlPoints = []
    for(const i in this.knot){
      const crossover = this.knot[i]
      controlPoints.push({p: angMagFrom(crossover, crossover.a.a, crossover.a.m1),i,x: 'a',m: 'm1'})
      controlPoints.push({p: angMagFrom(crossover, crossover.a.a, crossover.a.m2),i,x: 'a',m: 'm2'})
      controlPoints.push({p: angMagFrom(crossover, crossover.b.a, crossover.b.m1),i,x: 'b',m: 'm1'})
      controlPoints.push({p: angMagFrom(crossover, crossover.b.a, crossover.b.m2),i,x: 'b',m: 'm2'})
    }
    let shortestDistance
    controlPoints.forEach(cp=>{
      const distanceToSelected = distance(cp.p, {x: e.clientX, y: e.clientY})
      if (distanceToSelected < 30){
        if (shortestDistance === undefined || distanceToSelected < shortestDistance){
          this.selectablePoint = cp
          shortestDistance = distanceToSelected 
        }
      }
    })
  }
  draw(context){
    const knot = this.knot

    for (const layer of ['bottom', 'top']) {
      let cur = {
        i: 0,
        x: 'a'
      }
      let lineWidth = this.lineWidth
      let ttl = 8
      do {
        // start and end
        const start = knot[cur.i]
        const nxt = start[cur.x].n
        const end = knot[nxt.i]

        // control points from angle
        const c1 = angMagFrom(start, start[cur.x].a, start[cur.x].m1)
        const c2 = angMagFrom(end, end[nxt.x].a, end[nxt.x].m2)

        // draw curve
        const [left, right] = splitQuadBezier([start, c1, c2, end], .5)
        if (// draw left if on layer bottom and it's bottom or layer top and it's top
          start.top !== cur.x && layer === 'bottom' ||
          start.top === cur.x && layer === 'top'
        ) {
          bezier(context, left, lineWidth, '#000000')
          bezier(context, left, lineWidth - 3, '#ffffff')
        }
        if (// draw left if on layer bottom and it's bottom or layer top and it's top
          end.top !== nxt.x && layer === 'bottom' ||
          end.top === nxt.x && layer === 'top'
        ) {
          bezier(context, right, lineWidth, '#000000')
          bezier(context, right, lineWidth - 3, '#ffffff')
        }

        cur = knot[cur.i][cur.x].n
        ttl--
      } while ((cur.i !== 0 || cur.x !== 'a') && ttl > 0) // continue until we get to the start
    }
    // draw control points
    for(const crossover of knot){
      const a1 = angMagFrom(crossover, crossover.a.a, crossover.a.m1)
      const a2 = angMagFrom(crossover, crossover.a.a, crossover.a.m2)
      const b1 = angMagFrom(crossover, crossover.b.a, crossover.b.m1)
      const b2 = angMagFrom(crossover, crossover.b.a, crossover.b.m2)

      // draw control point lines
      line(context, crossover, a1, 1, '#008800')
      circle(context, a1, 3, '#008800')

      line(context, crossover, a2, 1, '#008800')
      circle(context, a2, 3, '#008800')

      line(context, crossover, b1, 1, '#008800')
      circle(context, b1, 3, '#008800')

      line(context, crossover, b2, 1, '#008800')
      circle(context, b2, 3, '#008800')
    }

    if (this.selectablePoint){
      (new CircleObject(
        this.selectablePoint.p.x,
        this.selectablePoint.p.y,

        this.selected ? 'blue' : 'green',
        10,
      )).draw(context)
    }
  }
}
