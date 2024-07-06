import { Scene } from "./scene.js";
import { figure8, k3_1, k4_1, trefoil } from "./common_knots.js";
import "./index.css"
import { Knot, draw } from "./knot_2d.js";

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

  const scene = new Scene(canvas)

  // scene.addObject(new Knot(k3_1, 6))
  scene.addObject(new Knot(k4_1, 20))

  // initial draw
  scene.draw()
}
