import { CircleObject, getCursor } from './2d.js'
// import { Knot } from "./knot_2d.js"
// import { CrossoverTile } from "./crossover_tile.js"
// import { Path } from "./path.js"

const MODE_DRAWING = 1
const MODE_EDITING = 2

const targetFPS = 60
let drawDelay = 1000 / targetFPS
let fps = 0
let lastFPS = 0

export class Scene {
  constructor(canvas) {
    this.canvas = canvas
    this.objects = []
    this.selectedObject

    this.mode = MODE_DRAWING

    this.cursor = new CircleObject(0, 0, 'red', 5)

    // handle mouse movements
    canvas.onmousemove = (e) => {
      const c = getCursor(e)
      this.cursor.x = c.x
      this.cursor.y = c.y

      if (this.mode === MODE_DRAWING) {
        if (this.selectedObject) {
          if (typeof this.selectedObject.onmousemove === 'function') {
            const start = new Date()
            this.selectedObject.onmousemove(e)
            const end = new Date()
            if (end - start > 3) {
              console.log('onmousemove', this.selectedObject.constructor.name, end - start)
            }
          }
        }
      }
      if (this.mode === MODE_EDITING) {
        // handle objects
        // TODO: Optimize for the objects that apply
        this.objects.forEach((obj) => {
          if (typeof obj.onmousemove === 'function') {
            obj.onmousemove(e)
          }
        })
      }
    }
    canvas.onmousedown = (e) => {
      if (this.mode === MODE_DRAWING && this.selectedObject) {
        this.selectedObject.onmousedown(e)
      }
      if (this.mode === MODE_EDITING) {
        this.objects.forEach((obj) => {
          if (typeof obj.onmousedown === 'function') {
            obj.onmousedown(e)
          }
        })
      }
    }
    canvas.onmouseup = (e) => {
      if (this.mode === MODE_DRAWING) {
        if (this.selectedObject) {
          this.selectedObject.onmouseup(e)
        }
      }

      if (this.mode === MODE_EDITING) {
        this.objects.forEach((obj) => {
          if (typeof obj.onmouseup === 'function') {
            obj.onmouseup(e)
          }
        })
      }
    }
    window.onkeyup = (e) => {
      if (this.mode === MODE_DRAWING) {
        if (this.selectedObject) {
          if (typeof this.selectedObject.onkeyup === 'function') {
            this.selectedObject.onkeyup(e)
          }
        }
      }

      if (this.mode === MODE_EDITING) {
        this.objects.forEach((obj) => {
          if (typeof obj.onkeyup === 'function') {
            obj.onkeyup(e)
          }
        })
      }
    }
    window.onkeydown = (e) => {
      if (this.mode === MODE_DRAWING) {
        if (this.selectedObject) {
          if (typeof this.selectedObject.onkeydown === 'function') {
            this.selectedObject.onkeydown(e)
          }
        }
      }

      if (this.mode === MODE_EDITING) {
        this.objects.forEach((obj) => {
          if (typeof obj.onkeydown === 'function') {
            obj.onkeydown(e)
          }
        })
      }
    }

    // touch events map to mouse events
    canvas.addEventListener('touchstart', canvas.onmousedown)
    canvas.addEventListener('touchend', canvas.onmouseup)
    canvas.addEventListener('touchmove', canvas.onmousemove)

    // start referesh timers
    const draw = () => {
      this.draw()
      // setTimeout(draw, drawDelay)
    }
    draw()
    setInterval(draw, drawDelay)
    setInterval(() => {
      lastFPS = fps
      fps = 0

      // // adjust delay to meet target fps
      // let e = lastFPS - targetFPS // error in frames per second
      // // console.log('FPS', lastFPS, e, drawDelay)
      // if (Math.abs(e) > 1){
      //     let mspf = 1000/lastFPS - drawDelay // milliseconds to render 1 frame (minus what we delayed for last time)
      //     drawDelay = Math.max(1000/targetFPS - Math.max(mspf, 0), 0) // if it takes 10ms to render 1 frame, wait 10s less than what we need for target fps
      //     // console.log('  ', mspf, drawDelay)
      // }
    }, 1000)
  }

  draw() {
    var context = this.canvas.getContext('2d')

    context.fillStyle = '#eeeeee'
    context.strokeStyle = '#000000'
    context.rect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
    context.fill()

    let numPoints = 0
    for (const obj of this.objects) {
      if (obj.points) numPoints += obj.points()

      const start = new Date()
      obj.draw(context)
      const end = new Date()
      if (end - start > 10) {
        console.log('draw', obj.constructor.name, end - start)
      }
    }

    // draw cursor over everything
    this.cursor.draw(context)

    // draw FPS
    context.fillText('FPS: ' + lastFPS, 20, 20)
    context.fillText('Points: ' + numPoints, 20, 50)
    fps++
  }

  addObject(obj) {
    this.objects.push(obj)
    if (this.selectedObject === undefined) {
      this.selectedObject = obj
    }
  }
}
