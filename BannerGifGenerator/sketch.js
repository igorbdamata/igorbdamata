const gifLength = 1;
const borderSize = 1;
const backgroundColor = "#101414";
const borderColor = "#eef9ff";
const objectColor = "#eef9ff";
const createGif = false;
const starsCount = 150;

let stars = [];
let tree;

function setup() {
  createCanvas(1280, 640);
  if (createGif)
    saveGif("banner.gif", gifLength);

  for (let i = 0; i < starsCount; i++) {
    stars.push(new Star(createVector(random(0, width), random(0, height)), random(0.1, 2)));
  }
  tree = new Tree(createVector(width-350, height),  20, 100, 10, objectColor,1.2)
}

function draw() {
  background(backgroundColor);
  drawBorder();
 // drawStars();
  tree.draw();
}

function drawBorder() {
  fill(borderColor)
  noStroke();
  rect(0, 0, borderSize, height)

  rect(0, height - borderSize, width, borderSize)
  rect(width, height, -borderSize, -height)
  rect(width, 0, -width, borderSize)
}


function drawStars() {
  for (let i = 0; i < starsCount; i++) {
    stars[i].draw();
  }
}

function seconds() {
  return millis() / 1000;
}