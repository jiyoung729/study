const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HIGHT;

//사각형이 그려지는것과 색을 바꾸는 방법
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

//움직임과 정사각형 선이 그려지는 방법
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();

//집 그리기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 3;
// ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 250, 50);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.stroke();

//원그리기
// ctx.fillRect(210 -30, 200 - 35, 15, 100);
// ctx.fillRect(335 -30, 200 - 35, 15, 100);
// ctx.fillRect(250 -30, 200 - 35, 60, 200);

// ctx.arc(250, 100, 50, 0, 2*Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 8, Math.PI, 2*Math.PI); // 반원
// ctx.arc(220 + 10, 80, 8, Math.PI, 2*Math.PI);
// ctx.fill();

//원하는 곳에 클릭해서 선그리기

// ctx.lineWidth = 2;

// const colors = [
//     "#fffa65",
//     "#cd84f1",
//     "#ff4d4d",
//     "#7158e2",
//     "#32ff7e",
//     "#ff9f1a",
//     "#fffa65",
//     "#7efff5"
// ]

// function onClick(event) {
//     console.log(event);
//     ctx.beginPath();
//     ctx.moveTo(400, 400);
//     const color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }

// function clickTrans(event) {
//     ctx.beginPath();
//     const color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.strokeStyle = color;
// }

// canvas.addEventListener("mousemove", onClick);
// canvas.addEventListener("click", clickTrans);

//클릭후 그리기
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const fontSize = document.getElementById("font-size");
ctx.lineWidth = lineWidth.value;
ctx.fontSize = fontSize.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}
function onFontSizeChange(event) {
  console.log(event.target.value);
  ctx.fontSize = event.target.value;
}
function onColorChange(event) {
  console.log(event.target.value);
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  console.dir(event.target.dataset.color);
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
  }
}
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}
function onFileChange(event) {
  console.dir(event.target);
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  console.log(url);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
    fileInput.value = null;
  };
}
function onDoubleClick(event) {
  console.log(event.offsetX, event.offsetY);
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${ctx.fontSize}px serif`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
function onSaveClick() {
  console.log(canvas.toDataURL());
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
fontSize.addEventListener("change", onFontSizeChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
