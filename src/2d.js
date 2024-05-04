
// drawing utils
export function circle(context, c, radius, color) {
  context.beginPath();
  context.arc(c.x, c.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  // context.lineWidth = 5;
  // context.strokeStyle = '#003300';
  // context.stroke();
}
export function line(context, s, e, lineWidth, color) {
  return bezier(context, [s, s, e, e], lineWidth, color)
}
export function bezier(context, points, lineWidth, color) {
  const [s, c1, c2, e] = points

  context.beginPath()
  context.moveTo(s.x, s.y)
  context.lineWidth = lineWidth
  context.strokeStyle = color
  context.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, e.x, e.y)
  context.stroke()
}
