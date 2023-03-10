const gifLength = 1;
const borderSize = 1;
const backgroundColor = "#101414";
const borderColor = "#eef9ff";
const objectColor = "#eef9ff";
const createGif = false;
const starsLength = 500;

const treeBranchAngle = 20;
const treeBranchSize = 75;
const maxBranchesGeneration = 10;
const treeBranchDecrementFactor = 1.2;

const defaultStroke = 10;

const minStarDiameter = 1;
const maxStarDiameter = 1.5;

const shootingStarSpeed = 20;
const shootingStarTrailSize = 10;
const shootingStarDiameter = 10;

const title = "Igor B. da Mata..."
const titleSize = 100;
const typeBoxCooldown = 0.75;
let windIntensity;

let typeBoxTimer = 0;
let mustShowTypeBox = false;

let stars = [];
let shootingStars = [];
let tree;

const minShootingStarSpawnInterval = 3;
const maxShootingStarSpawnInterval = 10;
let shootingStarSpawnInterval;
let lastShootingStarSpawnTime;

function seconds() {
  return millis() / 1000;
}

function getRandomPositionOnScreen() {
  return createVector(random(0, width), random(0, height));
}

function getWindForce() {
  let x = map(noise(seconds() / 3), 0, 1, -1, 1) * windIntensity.x;
  let y = map(noise(seconds() / 3 + 1000), 0, 1, -1, 1) * windIntensity.y;
  return createVector(x, y);
}

function setup() {
  createCanvas(1280, 640);
  if (createGif)
    saveGif("banner.gif", gifLength);

  for (let i = 0; i < starsLength; i++) {
    stars.push(new Star(getRandomPositionOnScreen(), random(minStarDiameter, maxStarDiameter)));
  }
  tree = new Tree(
    createVector(width - 300, height),
    treeBranchAngle,
    treeBranchSize,
    maxBranchesGeneration,
    objectColor,
    treeBranchDecrementFactor)

  typeBoxTimer = seconds();
  windIntensity = createVector(1.9, 0.1);
  spawnShootingStar();
}

function draw() {
  noStroke();
  background(backgroundColor);
  drawBorder();
  drawStars();
  tree.draw();
  updateShootingStars()
  checkForSpawnStar();
  textSize(titleSize)
  textAlign(CENTER);
  text(title, width / 2, height / 2 - 200);
  if (seconds() - typeBoxTimer >= typeBoxCooldown) {
    typeBoxTimer = seconds();
    mustShowTypeBox = !mustShowTypeBox;
  }
  if (mustShowTypeBox) {
    rect(width / 2 + 393, height / 2 - 200 - titleSize / 1.3, 2, titleSize / 1.3)
  }
}

function drawBorder() {
  fill(borderColor)
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
function checkForSpawnStar() {
  if (seconds() - lastShootingStarSpawnTime >= shootingStarSpawnInterval) {
    spawnShootingStar();
  }
}
function updateShootingStars() {
  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].update();
    if (shootingStars[i].history[0].y > height) {
      shootingStars.splice(i, 1);
    }
  }
}

function spawnShootingStar() {
  let shootingStar = new ShootingStar(shootingStarSpeed, shootingStarTrailSize, shootingStarDiameter);
  shootingStars.push(shootingStar);
  shootingStarSpawnInterval = random(minShootingStarSpawnInterval, maxShootingStarSpawnInterval);
  lastShootingStarSpawnTime = seconds();
}