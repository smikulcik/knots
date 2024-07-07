import { circle, getCursor, line } from "./2d.js"
import { lineSegmentIntersection, veq } from "./vector.js"

export class CrossoverTile {
    constructor(){
      this.strands = []
      this.heights = []
      this.crossovers = []
      this.cursor
      this.cursorDown = false
    }

    draw(context){
        const lineWidth = 30

        // draw bottom segments
        for(let s=0;s<this.strands.length;s++){
            for(let v=0;v<this.strands[s].length-2;v++){
                if (this.heights[s]?.[v] === 1) continue
                line(context, this.strands[s][v], this.strands[s][v+1], lineWidth, '#000000')
            }
            for(let v=0;v<this.strands[s].length-2;v++){
                if (this.heights[s]?.[v] === 1) continue
                line(context, this.strands[s][v], this.strands[s][v+1], lineWidth-3, '#ffffff')
            }
        }
        // draw top segments
        for(let s=0;s<this.strands.length;s++){
            for(let v=0;v<this.strands[s].length-2;v++){
                if (this.heights[s]?.[v-1] !== 1 || this.heights[s]?.[v] !== 1 || this.heights[s]?.[v+1] !== 1) continue
                line(context, this.strands[s][v], this.strands[s][v+1], lineWidth, '#000000')
            }
            for(let v=0;v<this.strands[s].length-2;v++){
                if (this.heights[s]?.[v] !== 1) continue
                line(context, this.strands[s][v], this.strands[s][v+1], lineWidth-3, '#ffffff')
            }
        }
        // compute crossovers
        // for(let c of this.crossovers){
        //     let color = '#0000aa'
        //     circle(context, c, 3, color)
        // }
    }

    // events
    onmousedown(e){
        this.cursorDown = true
        this.strands.push([]) // start a new strand
    }
    onmousemove(e){
        this.cursor = getCursor(e)
        if (this.cursorDown){
            const activeStrand = this.strands[this.strands.length-1] // last strand is the active one

            const lv = activeStrand[activeStrand.length-1] // last vertex
            if (lv === undefined || !veq(this.cursor, lv)){
                activeStrand.push({
                    x: this.cursor.x,
                    y: this.cursor.y,
                })
            }
            if (lv !== undefined){
                // add the crossovers for this newest segment
                let didAddCrossover = false
                const j = activeStrand.length-1
                for(let s=0;s<this.strands.length;s++){
                    for(let i=0;i<this.strands[s].length-1;i++){
                        const intersection = lineSegmentIntersection(this.strands[s][i], this.strands[s][i+1], lv, this.cursor)
                        if (intersection !== null){
                            let newCrossover = {
                                x: intersection.x,
                                y: intersection.y,
                                bottom: {s,v: i},
                                top: {s: this.strands.length-1,v: j},
                            }
                            // use alternating pattern
                            if ((this.crossovers.length)%2 === 0){
                                const tmp = newCrossover.top
                                newCrossover.top = newCrossover.bottom
                                newCrossover.bottom = tmp
                            }
                            this.crossovers.push(newCrossover)
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
                    this.heights = []
                    let h = 0 // start at bottom
                    for(let s=0;s<this.strands.length;s++){
                        this.heights.push([])
                        let v = 0
                        const bottomIdxsForStrand = this.crossovers.flatMap(x=>([x.bottom])).filter(x=>(x.s===s)).map(x=>(x.v)).sort((a,b)=>(a-b))
                        const crossoverIdxsForStrand = this.crossovers.flatMap(x=>([x.top, x.bottom])).filter(x=>(x.s===s)).map(x=>(x.v)).sort((a,b)=>(a-b))
                        for(let cx = 0; cx < crossoverIdxsForStrand.length; cx++){
                            if (bottomIdxsForStrand.indexOf(crossoverIdxsForStrand[cx]) >= 0){
                                h = 0
                            }else{
                                h = 1
                            }
                            if (cx != crossoverIdxsForStrand.length -1){
                                // console.log(`${s}.${crossoverIdxsForStrand[cx]} v ${v}-${(crossoverIdxsForStrand[cx] + crossoverIdxsForStrand[cx+1])/2} = ${h}`)
                                for(; v < (crossoverIdxsForStrand[cx] + crossoverIdxsForStrand[cx+1])/2; v++){
                                    this.heights[s][v] = h
                                }
                            }
                        }
                        // set the rest to whatever the last one was
                        // console.log(`v ${v}-${this.strands[s].length} = ${h}`)
                        for(; v < this.strands[s].length; v++){
                            this.heights[s][v] = h
                        }
                    }
                }
            }
        }
    }

    onmouseup(e){
        this.cursorDown = false
    }
}