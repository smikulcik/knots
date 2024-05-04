
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

export function getCursor(e) {
  const r = e.toElement.getBoundingClientRect()
  return {
    x: e.clientX - r.left,
    y: e.clientY - r.top
  }
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

export class Scene {
  constructor(canvas){
    this.canvas = canvas
    this.objects = []
  
    this.cursor = new CircleObject(0, 0, 'red', 5)

    // handle mouse movements
    canvas.onmousemove = (e)=>{
      const c = getCursor(e)
      this.cursor.x = c.x
      this.cursor.y = c.y


      // handle objects
      // TODO: Optimize for the objects that apply
      this.objects.forEach(obj=>{
        if (typeof obj.onmousemove === 'function'){
          obj.onmousemove(e)
        }
      })
      this.draw()
    }
    canvas.onmousedown = (e)=>{
      this.objects.forEach(obj=>{
        if (typeof obj.onmousedown === 'function'){
          obj.onmousedown(e)
        }
      })
      this.draw()
    }
    canvas.onmouseup = (e)=>{
      this.objects.forEach(obj=>{
        if (typeof obj.onmouseup === 'function'){
          obj.onmouseup(e)
        }
      })
      this.draw()
    }
  }

  draw(){
    var context = this.canvas.getContext("2d")

    context.fillStyle = "#eeeeee"
    context.strokeStyle = '#000000'
    context.rect(0, 0, 800, 600)
    context.fill()

    for(const obj of this.objects){
      obj.draw(context)
    }

    // draw cursor over everything
    this.cursor.draw(context)
  }

  addObject(obj){
    this.objects.push(obj)
  }
}
