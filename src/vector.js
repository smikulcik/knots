
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
export function vcross2(v, w){
  return v.x*w.y - v.y*w.x
}
export function normalize(v) {
  const mag = vmag(v)
  return {
    x: v.x / mag,
    y: v.y / mag,
    z: (v.z || 0) / mag
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
export function veq(a, b){
  if(a.x !== b.x){
    return false
  }
  if (a.y !== b.y){
    return false
  }
  if ((a.z || 0) !== (b.z || 0 )){
    return false
  }
  return true
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

export function distance(a, b){
  return Math.sqrt(
    (b.x - a.x)*(b.x - a.x)+
    (b.y - a.y)*(b.y - a.y)+
    ((b.z || 0) - (a.z || 0))*((b.z || 0) - (a.z || 0))
  )
}


function bbIntersect(a, adim, b, bdim){
  // bounding box intersects if the box centers are within half the dimensions of each other
  const ac = vadd(a, vscalar(.5, adim))
  const bc = vadd(a, vscalar(.5, adim))
  
  // check x
  if (Math.abs(ac.x - bc.x) > (Math.abs(adim.x) + Math.abs(bdim.x))/2){
      return false
  }

  // check y
  if (Math.abs(ac.y - bc.y) > (Math.abs(adim.y) + Math.abs(bdim.y))/2){
      return false
  }
  return true
}

export function lineSegmentIntersection(a1, a2, b1, b2){
  // algorithm from https://stackoverflow.com/a/565282
  let p = a1
  let r = vsub(a2, a1)
  let q = b1
  let s = vsub(b2,b1)

  // bounding box check
  if (!bbIntersect(p, r, q, s)){
      return null
  }

  // intermediaries
  const qmp = vsub(q, p)
  const rxs = vcross2(r, s)
  const qmpxr = vcross2(qmp, r)
  const qmpxs = vcross2(qmp, s)

  if (vcross2(r, s) == 0){
      return null // no intersection - collinear
  }
  if (qmpxr == 0){
      return null // no intersection - parallel
  }

  let t = qmpxs/rxs
  let u = qmpxr/rxs

  if (0 <= t && t <= 1 && 0 <= u && u <= 1){
      // intersect
      return vadd(p, vscalar(t, r))
  }
  return null
}

export function pointInPolygon(pt, path){
  // use raycasting algorithm to determineif in polygon, use ray x=1, y=0 for probe
  // https://en.wikipedia.org/wiki/Point_in_polygon
  const ray = {x: Number.MAX_SAFE_INTEGER, y: 0}
  let counter = 0
  // find t of intersection from ray at pt. If t > 0, increment counter
  for(let p=0;p<path.length;p++){
    const int = lineSegmentIntersection(path[p], path[(p+1) % path.length], pt, vadd(pt, ray))
    if (int !== null){
      counter++
    }
  }

  // if counter is odd - point is inside, even - point is outside
  return counter % 2 == 1
}
