import { CircleObject, Scene } from "./2d.js";
import { figure8, k3_1, trefoil } from "./common_knots.js";
import "./index.css"
import { Knot, draw } from "./knot_2d.js";

function component() {
  const element = document.createElement('canvas')
  element.setAttribute("id", "content")
  element.setAttribute("width", "800")
  element.setAttribute("height", "600")

  return element
}
document.body.appendChild(component());

window.onload = () => {
  const canvas = document.getElementById("content")

  const scene = new Scene(canvas)

  scene.addObject(new Knot(k3_1, 6))
  // scene.addObject(new Knot(figure8, 20))

  // initial draw
  scene.draw()
}
