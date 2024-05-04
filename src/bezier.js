
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
