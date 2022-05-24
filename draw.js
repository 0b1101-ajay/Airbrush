const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let stored;

function setCanvasSize() {
  storeImage();
  canvas.width = window.innerWidth - 40;
  canvas.height = window.innerHeight - 110;
  clearToBackground(false);
  restorePrevious();
}

function clearToBackground(storeFirst = true) {
  if (storeFirst) {
    storeImage();
  }
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function makeDot(x, y, hue, scatter) {
  const radius = Math.random() * scatter;
  const direction = Math.random() * 2 * Math.PI;
  const scatteredX = x + radius * Math.cos(direction);
  const scatteredY = y + radius * Math.sin(direction);

  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.arc(scatteredX, scatteredY, 3, 0, Math.PI * 2);
  ctx.fill();
}

function storeImage() {
  stored = canvas.toDataURL()
}

function restorePrevious() {
  const image = new Image();
  image.onload = () => ctx.drawImage(image, 0, 0);
  image.src = stored
}

export { setCanvasSize, makeDot, clearToBackground, storeImage, restorePrevious };