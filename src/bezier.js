import { distance } from "./vector.js"

// bezier utils
export function splitQuadBezier(p, u) {
  // from https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-sub.html

  const n = p.length
  const d = new Array(n * n) // deCasteljauTriange
  const right = new Array(n)
  const left = new Array(n)

  // populate initial conditions
  for (let i = 0; i < n; i++) {
    d[i] = p[i] // d[0, i] = p[i]
  }

  // fill out triangle split by u
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      // d[i, j] = d[i-1, j]*u + d[i-1, j+1]*(1-u)
      d[i * n + j] = {
        x: d[(i - 1) * n + j].x * u + d[(i - 1) * n + (j + 1)].x * (1 - u),
        y: d[(i - 1) * n + j].y * u + d[(i - 1) * n + (j + 1)].y * (1 - u)
      }
    }
  }

  // output final array
  for (let i = 0; i < n; i++) {
    // copy in top triange side
    right[i] = d[i * n + 0]
  }
  for (let i = n - 1; i >= 0; i--) {
    // copy in bottom triangle side
    const j = (n - 1) - i
    left[j] = d[i * n + j]
  }
  return [right, left]
}

export function closestPoint(target, points){
  // search across t in [0, 1] to find the closes point
  const subdiv = 100

  let minDistT
  let minDist
  for(let t=0;t<1;t+= 1/subdiv){
    const distT = distance(target, bezier(points, t))
    if (minDist === undefined || distT < minDist){
      minDistT = t
      minDist = distT
    }
  }
  return minDistT
}

export function bezier(pts, t){
  if (pts.length < 4){
    throw new Error("Need 4 points for bezier curve", pts)
  }
  if (t < 0 || t > 1){
    throw new Error("t must be in 0, 1", t)
  }
  return {
    x: pts[0].x*Math.pow(1-t, 3) + 3*pts[1].x*Math.pow(1-t, 2)*t + 3*pts[2].x*(1-t)*Math.pow(t, 2) + pts[3].x*Math.pow(t, 3),
    y: pts[0].y*Math.pow(1-t, 3) + 3*pts[1].y*Math.pow(1-t, 2)*t + 3*pts[2].y*(1-t)*Math.pow(t, 2) + pts[3].y*Math.pow(t, 3),
  }
}