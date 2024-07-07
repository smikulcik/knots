
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
  return drawBezier(context, [s, s, e, e], lineWidth, color)
}
export function drawBezier(context, points, lineWidth, color) {
  const [s, c1, c2, e] = points

  context.beginPath()
  context.moveTo(s.x, s.y)
  context.lineCap = "round"
  context.lineWidth = lineWidth
  context.strokeStyle = color
  context.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, e.x, e.y)
  context.stroke()
}

export function getCursor(e) {
  // console.log('e', e)
  let r
  if (e instanceof TouchEvent){
    return {
      x: e.changedTouches?.[0].pageX,
      y: e.changedTouches?.[0].pageY,
    }
  } else if (e instanceof MouseEvent){
    r = e.toElement.getBoundingClientRect()
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    }
  }
  throw new Error("Unknown event type", e)
}


export class CircleObject {
  constructor(x, y, color, radius){
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
  }

  draw(context){
    circle(context, {x: this.x, y: this.y}, this.radius, this.color)
  }
}
