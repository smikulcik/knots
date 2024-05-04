import { CircleObject, Scene } from "./2d";
import { figure8, trefoil } from "./common_knots";
import "./index.css"
import { Knot, draw } from "./knot_2d";

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

  scene.addObject(new Knot(trefoil, 30))
  scene.addObject(new Knot(figure8, 20))

  // initial draw
  scene.draw()
}
