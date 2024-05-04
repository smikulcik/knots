import { bezier } from "./2d"
import { splitQuadBezier } from "./bezier"
import { figure8, trefoil, unknot } from "./common_knots"
import { angMagFrom } from "./vector"

export function draw(canvas) {
  // const knot = trefoil
  // const knot = unknot
  const knot = figure8

  var context = canvas.getContext("2d")

  context.fillStyle = "#eeeeee"
  context.strokeStyle = '#000000'
  context.rect(0, 0, 800, 600)
  context.fill()

  for (const layer of ['bottom', 'top']) {
    let cur = {
      i: 0,
      x: 'a'
    }
    let lineWidth = 20
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
  // for(const crossover of knot){
  //   const a1 = angMagFrom(crossover, crossover.a.a, crossover.a.m1)
  //   const a2 = angMagFrom(crossover, crossover.a.a, crossover.a.m2)
  //   const b1 = angMagFrom(crossover, crossover.b.a, crossover.b.m1)
  //   const b2 = angMagFrom(crossover, crossover.b.a, crossover.b.m2)

  //   // draw control point lines
  //   line(context, crossover, a1, 1, '#008800')
  //   circle(context, a1, 3, '#008800')

  //   line(context, crossover, a2, 1, '#008800')
  //   circle(context, a2, 3, '#008800')

  //   line(context, crossover, b1, 1, '#008800')
  //   circle(context, b1, 3, '#008800')

  //   line(context, crossover, b2, 1, '#008800')
  //   circle(context, b2, 3, '#008800')
  // }
}