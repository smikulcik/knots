import { circle, getCursor, line } from "./2d.js"
import { lineSegmentIntersection, veq } from "./vector.js"

export class LinearPath {
    constructor(){
      this.vertices = []
      this.heights = []
      this.crossovers = []
      this.cursor
      this.cursorDown = false
    }

    draw(context){
        const lineWidth = 30

        // draw bottom segments
        for(let v=0;v<this.vertices.length-2;v++){
            if (this.heights[v] === 1) continue
            line(context, this.vertices[v], this.vertices[v+1], lineWidth, '#000000')
        }
        for(let v=0;v<this.vertices.length-2;v++){
            if (this.heights[v] === 1) continue
            line(context, this.vertices[v], this.vertices[v+1], lineWidth-3, '#ffffff')
        }
        // draw top segments
        for(let v=0;v<this.vertices.length-2;v++){
            if (this.heights[v-1] !== 1 || this.heights[v] !== 1 || this.heights[v+1] !== 1) continue
            line(context, this.vertices[v], this.vertices[v+1], lineWidth, '#000000')
        }
        for(let v=0;v<this.vertices.length-2;v++){
            if (this.heights[v] !== 1) continue
            line(context, this.vertices[v], this.vertices[v+1], lineWidth-3, '#ffffff')
        }

        // compute crossovers
        for(let c of this.crossovers){
            let color = '#0000aa'
            if (c.top < c.bottom){
                color = '#00aa00'
            }
            circle(context, c, 3, color)
        }
    }

    // events
    onmousedown(e){
        this.cursorDown = true
    }
    onmousemove(e){
        this.cursor = getCursor(e)
        if (this.cursorDown){
            const lv = this.vertices[this.vertices.length-1] // last vertex
            if (lv === undefined || !veq(this.cursor, lv)){
                this.vertices.push({
                    x: this.cursor.x,
                    y: this.cursor.y,
                })
                // add the crossovers for this newest segment
                let didAddCrossover = false
                const j = this.vertices.length-1
                if (this.vertices.length >= 3){
                    for(let i=0;i<this.vertices.length-2;i++){
                        const intersection = lineSegmentIntersection(this.vertices[i], this.vertices[i+1], lv, this.cursor)
                        if (intersection !== null){
                            this.crossovers.push({
                                x: intersection.x,
                                y: intersection.y,
                                bottom: (this.crossovers.length)%2 === 0 ? i: j,
                                top: (this.crossovers.length)%2 === 0 ? j: i, 
                            })
                            didAddCrossover = true
                        }
                    }
                }
                // only recompute heights if adding a new crossover
                if (didAddCrossover){
                    // generate the height map for the path by the cross over top/bottoms
                    // heights can be "top" (1) or "bottom" (0)
                    // step through each crossover and set the height of the vertices accordingly.
                    // change from bottom->top midway through the crossover vertices
                    const bottomIdxs = this.crossovers.flatMap(x=>([x.bottom])).sort((a,b)=>(a-b))
                    const crossoverIdxs = this.crossovers.flatMap(x=>([x.top, x.bottom])).sort((a,b)=>(a-b))
                    console.log('adding crossover', bottomIdxs, crossoverIdxs)
                    this.heights = []
                    let v = 0
                    let h = 0 // start at bottom
                    for(let cx = 0; cx < crossoverIdxs.length; cx++){
                        if (bottomIdxs.indexOf(crossoverIdxs[cx]) >= 0){
                            h = 0
                        }else{
                            h = 1
                        }
                        if (cx != crossoverIdxs.length -1){
                            console.log(`${crossoverIdxs[cx]} v ${v}-${(crossoverIdxs[cx] + crossoverIdxs[cx+1])/2} = ${h}`)
                            for(; v < (crossoverIdxs[cx] + crossoverIdxs[cx+1])/2; v++){
                                this.heights[v] = h
                            }
                        }
                    }
                    // set the rest to whatever the last one was
                        console.log(`v ${v}-${this.vertices.length} = ${h}`)
                    for(; v < this.vertices.length; v++){
                        this.heights[v] = h
                    }
                }
            }
        }
    }

    onmouseup(e){
        this.cursorDown = false
    }
}