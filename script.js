const container = document.querySelector(".container");
const buttonClear = document.querySelector(".button-clear");
const buttonErase = document.querySelector(".button-erase");
const buttonDraw = document.querySelector(".button-draw");
const buttonMultiColor = document.querySelector(".button-multicolor");
let eraseFlag = false;
let drawFlag = true;
let multiColorFlag = false;

function generateGrid() {
  for (i = 0; i < 9933; i++) {
    let newSquare = document.createElement("div");
    newSquare.classList.add(`square`);
    container.appendChild(newSquare);
    // newSquare.innerText = "hello";
  }
  console.log(container.clientHeight, container.clientWidth);
}

function drawEraseSwitch() {
  buttonErase.addEventListener("click", () => {
    eraseFlag = true;
    drawFlag = false;
    multiColorFlag = false;
    // alert(eraseFlag);
  });
  buttonDraw.addEventListener("click", () => {
    eraseFlag = false;
    drawFlag = true;
    multiColorFlag = false;
    // alert(eraseFlag);
  });
}

function useMultiColor() {
  buttonMultiColor.addEventListener("click", () => {
    eraseFlag = false;
    drawFlag = false;
    multiColorFlag = true;
  });
}

function drawEvent(e) {
  //   console.log(e);
  e.target.classList.add("draw");
}

function clearSketch() {
  const squares = document.querySelectorAll(".square");
  for (const square of squares) {
    square.style.cssText = `background-color: seagreen; `;
    square.classList.remove("draw");
  }
  drawFlag = true;
  eraseFlag = false;
  multiColorFlag = false;
  buttonClear.addEventListener("click", clearSketch);
}

function toggleSketch() {
  let mouseDown = 0;
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.onmousedown = function () {
      mouseDown = 1;
    };
    square.onmouseup = function () {
      mouseDown = 0;
    };
    square.addEventListener("mouseover", mousecheck);
    square.addEventListener("mousedown", mousecheck);
  });
  function mousecheck(ev) {
    ev.preventDefault();

    if (mouseDown) {
      if (
        eraseFlag === false &&
        drawFlag === true &&
        multiColorFlag === false
      ) {
        ev.target.style.cssText = `background-color: black; `;
        ev.target.classList.remove("erase");
        ev.target.classList.add("draw");
      } else if (
        eraseFlag === true &&
        drawFlag === false &&
        multiColorFlag === false
      ) {
        ev.target.style.cssText = `background-color: seagreen; `;
        ev.target.classList.remove("draw");
        ev.target.classList.add("erase");
      } else if (
        eraseFlag === false &&
        drawFlag === false &&
        multiColorFlag === true
      ) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        ev.target.style.cssText = `background-color: rgb(${r}, ${g}, ${b}) `;
      }
    }
  }
}

generateGrid();

toggleSketch();

useMultiColor();

drawEraseSwitch();

clearSketch();

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};
