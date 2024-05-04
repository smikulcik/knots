
// matrix and vector utils
export class Mat {
  constructor(rows, cols, data) {
    this.rows = rows
    this.cols = cols
    this.data = data
  }
}
export function vdot(a, b) {
  return a.x * b.x + a.y * b.y + (a.z * b.z || 0)
}
export function vcross(a, b) {
  return {
    x: (a.y * b.z) - (a.z * b.y),
    y: (a.z * b.x) - (a.x * b.z),
    z: (a.x * b.y) - (a.y * b.x)
  }
}
export function normalize(v) {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y)
  return {
    x: v.x / mag,
    y: v.y / mag
  }
}
export function matMul(a, b) {
  const out = new Array(a.rows * b.cols)

  for (let aRow = 0; aRow < a.rows; aRow++) {
    for (let bCol = 0; bCol < b.cols; bCol++) {
      out[aRow * a.cols + bCol] = 0
      for (let i = 0; i < a.cols; i++) {
        out[aRow * a.cols + bCol] += a.data[aRow * a.cols + i] * b.data[i * b.cols + bCol]
      }
    }
  }
  return new Mat(a.rows, b.cols, out)
}
export function vsub(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z ? a.z - b.z : 0
  }
}
export function vadd(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z ? a.z + b.z : 0
  }
}
export function vscalar(s, a) {
  return {
    x: a.x * s,
    y: a.y * s,
    z: a.z ? a.z * s : 0
  }
}
export function vmag(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + (v.z * v.z || 0))
}
// compute tangent vector from p1 in relation to line
// p0->p1->p2
export function vtangent(p0, p1, p2) {
  const ab = vsub(p1, p0)
  const cb = vsub(p1, p2)

  // find bisect vector
  const bisect = vadd(normalize(ab), normalize(cb))

  // find cross-product vector
  const cross = vcross(ab, cb)

  // tangent is cross-product cross bisect
  return vcross(bisect, cross)
}
export function project(p, v0, v) {
  const pMag = vdot(vsub(p, v0), v) / vmag(v)
  const vHat = normalize(v)
  return {
    x: v0.x + vHat.x * pMag,
    y: v0.y + vHat.y * pMag
  }
}
// console.log('proj', project({x: 1, y: 2}, {x: 1, y: 0}, {x: 2, y: 2}))
// const x = new Mat(2,2, 
//   [1,2,
//    3,4])
// const y = new Mat(2,2,
//   [5,6,
//    7,8])
// console.log('x', x, y, matMul(x, y))

export function angMagFrom(a, angle, magnitude) {
  return {
    x: a.x + magnitude * Math.cos(angle * Math.PI / 180.0),
    y: a.y + magnitude * Math.sin(angle * Math.PI / 180.0),
  }
}
