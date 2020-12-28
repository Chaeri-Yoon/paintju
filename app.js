const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

const colors = document.querySelectorAll(".jsBtnColor");
const eraser = document.querySelector(".jsBtnEraser");
const mode = document.querySelector(".jsBtnMode");
const save = document.querySelector(".jsBtnSave");

const CANVAS_WIDTH = canvas.offsetWidth;
const CANVAS_HEIGHT = canvas.offsetHeight;
const BTNCOLOR_SIZE = "50px";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = 2.5;
ctx.strokeStyle = "#fe0303";
ctx.fillStyle ="#fe0303";

let isClicked = false;
let isDrawingMode = true;
let isErasing = false;
let drawingText = "Paint";
let fillText = "Fill";
let preClickedbutton;

function onCanvasMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(isDrawingMode){
        if(!isClicked){
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else{
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}
function setMode(){
    isDrawingMode = !isDrawingMode;
    mode.innerText = isDrawingMode ?  fillText: drawingText;
}
function fill(){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function changeColor(event){
    isErasing = false;
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}
function onSaveClicked(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}
function onColorButtonClicked(event){
    event.target.classList.toggle("clicked");

    if(event.target.classList.contains("clicked")){
        event.target.style.width = `${parseInt(BTNCOLOR_SIZE) * 0.9}px`;
        event.target.style.height = `${parseInt(BTNCOLOR_SIZE) * 0.9}px`;
    }
    else{
        event.target.style.width = BTNCOLOR_SIZE;
        event.target.style.height = BTNCOLOR_SIZE;
    }
    
    if(preClickedbutton){
        if(preClickedbutton.target != event.target){
            preClickedbutton.target.classList.remove("clicked");

            preClickedbutton.target.style.width = BTNCOLOR_SIZE;
            preClickedbutton.target.style.height = BTNCOLOR_SIZE;
        }   
    }
    preClickedbutton = event;
}
function onEraserClicked(event){
    isErasing = true;
    ctx.strokeStyle = "#ffffff";
}
function init(){
    if(canvas){
        canvas.addEventListener("mousedown", (() => {isClicked = true;}));
        canvas.addEventListener("mouseup", (() => {isClicked = false;}));
        canvas.addEventListener("mousemove", onCanvasMouseMove);
        canvas.addEventListener("click", () => {if(!isDrawingMode) fill();});
    }
    if(eraser) eraser.addEventListener("click", onEraserClicked);
    if(mode)    mode.addEventListener("click", setMode);
    Array.from(colors).forEach(color =>{
                                        color.addEventListener("click", changeColor)
                                        color.addEventListener("click", onColorButtonClicked)
                                    }
                                );

    if(save)    save.addEventListener("click", onSaveClicked);
}
init();