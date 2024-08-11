import { circle, getCursor, line, segLine } from "./2d.js"
import { closestPointOnPath, distance, lineSegmentIntersection, pointInPolygon, project, vadd, veq, vsub } from "./vector.js"


export class CrossoverTile {
    constructor(edge){
        // array of vertecies that make up the polygon tile
        this.edge = edge
        this.width = 100
        this.height = 100

        // array of vertex arrays
        this.strands = []
        // array of array heightmap info that corresponds with strands
        this.heights = []
        // array of crossovers
        // each crossover has (x, y, top: {s: <strandidx>, v: <vertexidx>}, bottom: {s: <strandidx>, v: <vertexidx>})
        this.crossovers = []


        // editor properties
        // coordinate of cursor in canvas  
        this.cursor
        this.cursorDown = false
        this.curHeight // 1 for top, 0 for bottom, undefined for alternating

        this.offset = {
            x: 0,
            y: 0
        }
    }

    draw(context){
        const lineWidth = 8

        // draw edge
        for(let e=0;e<this.edge.length-1;e++){
            line(context, 
                vadd(this.offset, this.edge[e]), 
                vadd(this.offset, this.edge[e+1]), 
                2, '#000000')
        }
        line(context, 
            vadd(this.offset, this.edge[this.edge.length-1]), 
            vadd(this.offset, this.edge[0]), 
            2, '#000000')

        // draw bottom segments
        for(let s=0;s<this.strands.length;s++){
            for(let v=0;v<this.strands[s].length-1;v++){
                if (this.heights[s]?.[v] === 1) continue
                line(context, 
                    vadd(this.offset, this.strands[s][v]), 
                    vadd(this.offset, this.strands[s][v+1]), 
                    lineWidth, '#000000')
            }
            for(let v=0;v<this.strands[s].length-1;v++){
                if (this.heights[s]?.[v] === 1) continue
                line(context, 
                    vadd(this.offset, this.strands[s][v]), 
                    vadd(this.offset, this.strands[s][v+1]), 
                    lineWidth-3, '#ffffff')
            }
        }
        // draw top segments
        for(let s=0;s<this.strands.length;s++){
            for(let v=0;v<this.strands[s].length-1;v++){
                if (this.heights[s]?.[v-1] !== 1 || this.heights[s]?.[v] !== 1 || this.heights[s]?.[v+1] !== 1) continue
                line(context, 
                    vadd(this.offset, this.strands[s][v]), 
                    vadd(this.offset, this.strands[s][v+1]), 
                    lineWidth, '#000000')
            }
            for(let v=0;v<this.strands[s].length-1;v++){
                if (this.heights[s]?.[v] !== 1) continue
                line(context, 
                    vadd(this.offset, this.strands[s][v]), 
                    vadd(this.offset, this.strands[s][v+1]), 
                    lineWidth-3, '#ffffff')
            }
        }
        // compute crossovers
        // for(let c of this.crossovers){
        //     let color = '#0000aa'
        //     circle(context, c, 3, color)
        // }

        // show closes point
        if (this.cursor){
            const cp = closestPointOnPath(this.edge, this.cursor)
            if (distance(cp, this.cursor) < 20){
                circle(context, 
                    vadd(this.offset, cp), 15, '#0000aa')
            }
        }
    }

    // events
    onmousedown(e){
        const cp = closestPointOnPath(this.edge, this.cursor)
        if (distance(cp, this.cursor) < 20){
            this.cursorDown = true
            this.strands.push([
                cp, // start on the edge
            ]) // start a new strand
        }
    }
    onmousemove(e){
        this.cursor = vsub(getCursor(e), this.offset)
        if (this.cursorDown){
            // if not inside bounds, return
            if (!pointInPolygon(this.cursor, this.edge)){
                // add point on the edge to the active strand
                const cp = closestPointOnPath(this.edge, this.cursor)
                this.addPointToActiveStrand(cp)
                return
            }

            // if cursor down, add point to active strand
            this.addPointToActiveStrand(this.cursor)
        }
    }

    addPointToActiveStrand(pt){
        const activeStrand = this.strands[this.strands.length-1] // last strand is the active one

        const lv = activeStrand[activeStrand.length-1] // last vertex
        if (lv === undefined || !veq(pt, lv)){
            activeStrand.push({
                x: pt.x,
                y: pt.y,
            })
        }
        if (lv !== undefined){
            // add the crossovers for this newest segment
            let didAddCrossover = false
            const j = activeStrand.length-1
            for(let s=0;s<this.strands.length;s++){
                for(let i=0;i<this.strands[s].length-1;i++){
                    const intersection = lineSegmentIntersection(this.strands[s][i], this.strands[s][i+1], lv, pt)
                    if (intersection !== null){
                        let newCrossover = {
                            x: intersection.x,
                            y: intersection.y,
                            bottom: {s,v: i},
                            top: {s: this.strands.length-1,v: j}, // tip of this line goes on top
                        }
                        // if curHeight is bottom, swap top and bottom to go under
                        if ((this.curHeight === undefined && this.crossovers.length %2 === 0) || this.curHeight === 0){
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

    onmouseup(e){
        this.cursorDown = false
    }
    onkeydown(e){
        if (e.key === 't'){
            this.curHeight = 1
        }
    }
    onkeyup(e){
        if (e.key === 't'){
            this.curHeight = 0
        }
    }
}