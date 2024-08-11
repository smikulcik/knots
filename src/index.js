import { Scene } from "./scene.js";
import { figure8, k3_1, k4_1, trefoil } from "./common_knots.js";
import "./index.css"
import { Knot, draw } from "./knot_2d.js";
import { CrossoverTile } from "./crossover_tile.js";
import { GridPattern } from "./grid_pattern.js";

function component() {
  const element = document.createElement('canvas')
  element.setAttribute("id", "content")
  element.width = window.innerWidth;
  element.height = window.innerHeight;
  return element
}
document.body.appendChild(component());
document.body.setAttribute("style", "margin: 0; overflow: hidden")

window.onload = () => {
  const canvas = document.getElementById("content")

  console.log('onload')
  const scene = new Scene(canvas)

  // scene.addObject(new Knot(k3_1, 6))
  // scene.addObject(new Knot(k4_1, 20))

  const tile = new CrossoverTile([
    {x: 0, y: 0},
    {x: 100, y: 0},
    {x: 100, y: 100},
    {x: 0, y: 100},
  ])
  // tile.strands = [
  //   [
  //     {x: 0, y: 0},
  //     {x: 50, y: 50},
  //     {x: 100, y: 100},
  //   ]
  // ]
  // tile.heights = [
  //   [
  //     0,
  //     0,
  //   ]
  // ]
  const gp = new GridPattern(8, 4, {
    'k': tile
  }, [
    'k', 'k', 'k', 'k','k', 'k', 'k', 'k',
    'k', 'k', 'k', 'k','k', 'k', 'k', 'k',
    'k', 'k', 'k', 'k','k', 'k', 'k', 'k',
    'k', 'k', 'k', 'k','k', 'k', 'k', 'k',
  ])
  gp.offset = {
    x: 100,
    y: 100,
  }
  scene.addObject(gp)
  scene.selectedObject = tile

  // initial draw
  scene.draw()
}
