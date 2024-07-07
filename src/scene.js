import { CircleObject, getCursor } from "./2d.js"
import { Knot } from "./knot_2d.js"
import { CrossoverTile } from "./crossover_tile.js"
import { Path } from "./path.js"

const MODE_DRAWING = 1
const MODE_EDITING = 2

export class Scene {
    constructor(canvas){
      this.canvas = canvas
      this.objects = []
      this.selectedObject

      this.mode = MODE_DRAWING
    
      this.cursor = new CircleObject(0, 0, 'red', 5)

  
      // handle mouse movements
      canvas.onmousemove = (e)=>{
        const c = getCursor(e)
        this.cursor.x = c.x
        this.cursor.y = c.y

        if (this.mode === MODE_DRAWING){
            if(this.selectedObject){
                this.selectedObject.onmousemove(e)
            }
        }
        if (this.mode === MODE_EDITING){
            // handle objects
            // TODO: Optimize for the objects that apply
            this.objects.forEach(obj=>{
            if (typeof obj.onmousemove === 'function'){
                obj.onmousemove(e)
            }
            })
        }
        this.draw()
      }
      canvas.onmousedown = (e)=>{

        if (this.mode === MODE_DRAWING){
            // start new object if none selected
            if (this.selectedObject === undefined){
                this.selectedObject = new CrossoverTile()
                this.objects.push(this.selectedObject)
            }
            this.selectedObject.onmousedown(e)
        }
        if (this.mode === MODE_EDITING){
            this.objects.forEach(obj=>{
                if (typeof obj.onmousedown === 'function'){
                    obj.onmousedown(e)
                }
            })
        }
        this.draw()
      }
      canvas.onmouseup = (e)=>{
        if (this.mode === MODE_DRAWING){
            if(this.selectedObject){
                this.selectedObject.onmouseup(e)
            }
        }

        if (this.mode === MODE_EDITING){
            this.objects.forEach(obj=>{
            if (typeof obj.onmouseup === 'function'){
                obj.onmouseup(e)
            }
            })
        }
        this.draw()
      }
      window.onkeyup = (e)=>{
        if (this.mode === MODE_DRAWING){
            if(this.selectedObject){
                this.selectedObject.onkeyup(e)
            }
        }

        if (this.mode === MODE_EDITING){
            this.objects.forEach(obj=>{
            if (typeof obj.onkeyup === 'function'){
                obj.onkeyup(e)
            }
            })
        }
        this.draw()
      }
  
  
      // touch events map to mouse events
      canvas.addEventListener("touchstart", canvas.onmousedown)
      canvas.addEventListener("touchend", canvas.onmouseup)
      canvas.addEventListener("touchmove", canvas.onmousemove)
    }
  
    draw(){
      var context = this.canvas.getContext("2d")
  
      context.fillStyle = "#eeeeee"
      context.strokeStyle = '#000000'
      context.rect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
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
  