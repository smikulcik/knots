import "./index.css"
import { draw } from "./knot_2d";

function component() {
  const element = document.createElement('canvas')
  element.setAttribute("id", "content")
  element.setAttribute("width", "800")
  element.setAttribute("height", "600")

  return element
}
document.body.appendChild(component());

window.onload = () => {
  draw(document.getElementById("content"))
}