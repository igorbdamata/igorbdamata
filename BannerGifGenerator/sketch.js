const gifLength = 1;
const borderSize = 1;
const backgroundColor = "#101414";
const borderColor = "#eef9ff";
const objectColor = "#eef9ff";
const createGif = false;
const starsLength = 500;

const treeBranchAngle = 20;
const treeBranchSize = 75;
const treeBranchesLenght = 10;
const treeBranchDecrementFactor = 1.2;

const minStarDiameter = 1;
const maxStarDiameter = 1.5;

let stars = [];
let tree;

function seconds() {
  return millis() / 1000;
}

function getRandomPositionOnScreen() {
  return createVector(random(0, width), random(0, height));
}

function setup() {
  createCanvas(1280, 640);
  if (createGif)
    saveGif("banner.gif", gifLength);

  for (let i = 0; i < starsLength; i++) {
    stars.push(new Star(getRandomPositionOnScreen(), random(minStarDiameter, maxStarDiameter)));
  }

  tree = new Tree(
    createVector(width - 270, height),
    treeBranchAngle,
    treeBranchSize,
    treeBranchesLenght,
    objectColor,
    treeBranchDecrementFactor)
}

function draw() {
  background(backgroundColor);
  drawBorder();
  drawStars();
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
  for (let i = 0; i < starsLength; i++) {
    stars[i].draw();
  }
}

