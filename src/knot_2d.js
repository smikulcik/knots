import { CircleObject, drawBezier, circle, getCursor, line } from './2d.js'
import { closestPoint, splitQuadBezier, bezier } from './bezier.js'
import { rref2x3 } from './linear.js'
import { distance, normalize, vadd, vscalar, vsub } from './vector.js'

export class Knot {
  constructor(knot, lineWidth) {
    this.knot = knot
    this.lineWidth = lineWidth

    this.controlPointSelected = false
    this.selectableControlPoint = undefined

    this.curvePinchPoint
    this.curvePinchPointSelected = false
    this.curvePinchToCursor
  }

  onmousedown() {
    if (this.selectableControlPoint !== undefined) {
      this.controlPointSelected = true
    }
    if (this.curvePinchPoint) {
      this.curvePinchPointSelected = true
    }
  }

  onmouseup() {
    this.controlPointSelected = false
    this.curvePinchPointSelected = false
  }

  onmousemove(e) {
    const cursor = getCursor(e)

    if (!this.curvePinchPointSelected) {
      // compute closest point
      this.curvePinchPoint = getCurvePinchPoint(this.knot, cursor)
      if (this.curvePinchPoint) {
        this.curvePinchToCursor = vsub(cursor, this.curvePinchPoint.pt)
      }
    }

    // move selected things around
    if (this.curvePinchPointSelected && this.curvePinchPoint) {
      // move pinched point to cursor.x by changing c1 and c2
      // for this segment
      const t0 = this.curvePinchPoint.t
      this.curvePinchPoint.pt.x = cursor.x - this.curvePinchToCursor.x
      this.curvePinchPoint.pt.y = cursor.y - this.curvePinchToCursor.y
      const c = this.curvePinchPoint.segment
      const [c1x, c2x] = rref2x3(
        3 * Math.pow(1 - t0, 2) * t0, 3 * (1 - t0) * t0 * t0, this.curvePinchPoint.pt.x - c[0].x * Math.pow(1 - t0, 3) - c[3].x * Math.pow(t0, 3),
        -1 * t0 / (1 - t0), 1, c[2].x - t0 * c[1].x / (1 - t0),
      )
      const [c1y, c2y] = rref2x3(
        3 * Math.pow(1 - t0, 2) * t0, 3 * (1 - t0) * t0 * t0, this.curvePinchPoint.pt.y - c[0].y * Math.pow(1 - t0, 3) - c[3].y * Math.pow(t0, 3),
        -1 * t0, 1, c[2].y - t0 * c[1].y,
      )
      c[1].x = c1x
      c[1].y = c1y
      c[2].x = c2x
      c[2].y = c2y

      // fix the other side of c1 and c2
      const center1 = this.knot[this.curvePinchPoint.start.i]
      const other1 = this.knot[this.curvePinchPoint.start.i][this.curvePinchPoint.start.x].c2
      const newOther1 = vadd(center1, vscalar(-1 * distance(other1, center1), normalize(vsub(c[1], center1))))
      other1.x = newOther1.x
      other1.y = newOther1.y

      const center2 = this.knot[this.curvePinchPoint.end.i]
      const other2 = this.knot[this.curvePinchPoint.end.i][this.curvePinchPoint.end.x].c1
      const newOther2 = vadd(center2, vscalar(-1 * distance(other2, center2), normalize(vsub(c[2], center2))))
      other2.x = newOther2.x
      other2.y = newOther2.y
    }
    else if (this.controlPointSelected && this.selectableControlPoint) {
      this.selectableControlPoint.p.x = cursor.x
      this.selectableControlPoint.p.y = cursor.y

      // lock other side in rotation
      const center = this.knot[this.selectableControlPoint.i]
      const other = this.knot[this.selectableControlPoint.i][this.selectableControlPoint.x][this.selectableControlPoint.c === 'c1' ? 'c2' : 'c1']
      const otherDist = distance(other, center)
      const newOther = vadd(center, vscalar(-1 * otherDist, normalize(vsub(this.selectableControlPoint.p, center))))
      other.x = newOther.x
      other.y = newOther.y
    }

    // get the current selectable points
    // if mouse is nearby, draw handle
    this.selectableControlPoint = undefined
    const controlPoints = []
    for (const i in this.knot) {
      const crossover = this.knot[i]
      controlPoints.push({ p: crossover.a.c1, i, x: 'a', c: 'c1' })
      controlPoints.push({ p: crossover.a.c2, i, x: 'a', c: 'c2' })
      controlPoints.push({ p: crossover.b.c1, i, x: 'b', c: 'c1' })
      controlPoints.push({ p: crossover.b.c2, i, x: 'b', c: 'c2' })
    }
    let shortestDistance
    controlPoints.forEach((cp) => {
      const distanceToSelected = distance(cp.p, cursor)
      if (distanceToSelected < 30) {
        if (shortestDistance === undefined || distanceToSelected < shortestDistance) {
          this.selectableControlPoint = cp
          shortestDistance = distanceToSelected
        }
      }
    })
  }

  draw(context) {
    const knot = this.knot

    for (const layer of ['bottom', 'top']) {
      let cur = {
        i: 0,
        x: 'a',
      }
      let lineWidth = this.lineWidth
      let ttl = 8
      do {
        // start and end
        const start = knot[cur.i]
        const nxt = start[cur.x].n
        const end = knot[nxt.i]

        // control points from angle
        const c1 = start[cur.x].c1
        const c2 = end[nxt.x].c2

        // draw curve
        const [left, right] = splitQuadBezier([start, c1, c2, end], 0.5)
        if (// draw left if on layer bottom and it's bottom or layer top and it's top
          (start.top !== cur.x && layer === 'bottom')
          || (start.top === cur.x && layer === 'top')
        ) {
          drawBezier(context, left, lineWidth, '#000000')
          drawBezier(context, left, lineWidth - 3, '#ffffff')
        }
        if (// draw left if on layer bottom and it's bottom or layer top and it's top
          (end.top !== nxt.x && layer === 'bottom')
          || (end.top === nxt.x && layer === 'top')
        ) {
          drawBezier(context, right, lineWidth, '#000000')
          drawBezier(context, right, lineWidth - 3, '#ffffff')
        }

        cur = knot[cur.i][cur.x].n
        ttl--
      } while ((cur.i !== 0 || cur.x !== 'a') && ttl > 0) // continue until we get to the start
    }
    // draw control points
    for (const crossover of knot) {
      const a1 = crossover.a.c1
      const a2 = crossover.a.c2
      const b1 = crossover.b.c1
      const b2 = crossover.b.c2

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

    if (this.selectableControlPoint) {
      (new CircleObject(
        this.selectableControlPoint.p.x,
        this.selectableControlPoint.p.y,

        this.controlPointSelected ? 'blue' : 'green',
        10,
      )).draw(context)
    }

    // draw closest point
    if (this.curvePinchPoint) {
      (new CircleObject(
        this.curvePinchPoint.pt.x,
        this.curvePinchPoint.pt.y,
        this.curvePinchPointSelected ? 'blue' : 'orange',
        5,
      )).draw(context)
    }
  }
}

function getCurvePinchPoint(knot, target) {
  const closest = closestPointOnKnot(knot, target)
  if (distance(target, closest.pt) < 30) {
    return closest
  }
  return
}
function closestPointOnKnot(knot, target) {
  let closestDist
  let closest
  let cur = {
    i: 0,
    x: 'a',
  }
  do {
    const start = knot[cur.i]
    const nxt = start[cur.x].n
    const end = knot[nxt.i]
    const c1 = start[cur.x].c1
    const c2 = end[nxt.x].c2

    const segmentPoints = [
      start, c1, c2, end,
    ]
    const closestOnSegmentT = closestPoint(target, segmentPoints)
    const closestOnSegment = bezier(segmentPoints, closestOnSegmentT)
    const d = distance(target, closestOnSegment)
    if (closestDist === undefined || d < closestDist) {
      closest = {
        pt: closestOnSegment,
        t: closestOnSegmentT,
        // store reference to mutate curve on selection.
        // TODO: Find a better way to handle mutations than dangling refs
        segment: segmentPoints,
        start: {
          i: cur.i,
          x: cur.x,
        },
        end: {
          i: nxt.i,
          x: nxt.x,
        },
      }
      closestDist = d
    }
    cur = knot[cur.i][cur.x].n
  } while ((cur.i !== 0 || cur.x !== 'a')) // continue until we get to the start
  return closest
}
