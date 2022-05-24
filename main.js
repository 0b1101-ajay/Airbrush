import * as draw from "./draw.js";

const ids = ["canvas", "hue", "show-brush", "scatter", "clear", "undo"];
const idElementPairs = ids.map((id) => [id, document.getElementById(id)]);
const elements = Object.fromEntries(idElementPairs);

const state = {
  x: 0,
  y: 0,
  shouldDraw: false,
  hue: elements.hue.value,
  scatter: parseFloat(elements.scatter.value),
};

function addEventHandlers() {
  elements.canvas.addEventListener("pointerdown", updatePointer);
  elements.canvas.addEventListener("pointerdown", draw.storeImage);
  elements.canvas.addEventListener("pointerup", updatePointer);
  elements.canvas.addEventListener("pointermove", updatePointer);
  elements.hue.addEventListener("input", updateBrush);
  elements.scatter.addEventListener("input", updateBrush);
  elements.clear.addEventListener("click", draw.clearToBackground);
  elements.undo.addEventListener("click", draw.restorePrevious);
  window.addEventListener("resize", draw.setCanvasSize);
}

function updatePointer(e) {
  state.x = e.offsetX;
  state.y = e.offsetY;
  state.shouldDraw = e.buttons === 1;
}

function updateBrush() {
  state.hue = elements.hue.value;
  state.scatter = parseFloat(elements.scatter.value);
  const style = elements["show-brush"].style;
  style.backgroundColor = `hsl(${state.hue}, 100%, 50%)`;
  style.width = `${2 * state.scatter}px`;
  style.height = `${2 * state.scatter}px`;
}

let previousDotTime = 0;
function drawFrame(timeStamp) {
  const elapsed = timeStamp - previousDotTime;

  if (state.shouldDraw && elapsed >= 25) {
    draw.makeDot(state.x, state.y, state.hue, state.scatter);
    previousDotTime = timeStamp;
  }
  requestAnimationFrame(drawFrame);
}

function initialize() {
  addEventHandlers();
  draw.setCanvasSize();
  updateBrush();
  requestAnimationFrame(drawFrame);
}

initialize();
