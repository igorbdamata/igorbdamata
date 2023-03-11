const TITLE = "Igor B. da Mata"
const TITLE_SIZE = 100;
const SUB_TITLE = "Game Programmer..."
const SUB_TITLE_SIZE = 58;
const TYPE_BOX_COOLDOWN = 0.75;

let config;
let font;

let windIntensity;

let typeBoxTimer = 0;
let mustShowTypeBox = false;

let stars = [];
let shootingStars = [];
let tree;

let shootingStarSpawnInterval;
let lastShootingStarSpawnTime;

let perlinNoise;
let windNoise;

let framesPercent;
let isRecording = false;

function keyTyped() {
  if (key == "r") {
    saveGif("banner.gif", config.general.gifLength, { delay: 0, units: "frames" });
  }
}

function preload() {
  config = loadJSON("configs.json");
  font = loadFont("Oxygen-Regular.ttf");
}

function setup() {
  createCanvas(1280, 640);
  angleMode(DEGREES);
  textFont(font);
  perlinNoise = new PerlinNoiseLoop(0.5, config.general.noiseSeed, 0);
  windNoise = new PerlinNoiseLoop(0.5, config.general.noiseSeed, 5000);
  for (let i = 0; i < config.general.starsLength; i++) {
    stars.push(new Star(getRandomPositionOnScreen(), random(config.star.minDiameter, config.star.maxDiameter)));
  }
  tree = new Tree(
    createVector(width - 300, height),
    config.tree.branchAngle,
    config.tree.branchSize,
    config.tree.maxBranchesGeneration,
    config.default.color,
    config.tree.branchDecrementFactor)

  typeBoxTimer = seconds();
  windIntensity = createVector(config.windIntensity.x, config.windIntensity.y);

  setShootingStarSpawnValues();
}

function draw() {
  noStroke();
  background(config.general.backgroundColor);
  fill(config.default.color)
  framesPercent = (frameCount % config.general.gifLength) / config.general.gifLength;

  drawBorder();
  drawStars();
  tree.draw();
  updateShootingStars()
  checkForSpawnStar();
  drawTitle();
  drawSubTitle();
  updateTypeBox();
}

function drawBorder() {
  let borderSize = config.general.borderSize;
  rect(0, 0, borderSize, height)
  rect(0, height - borderSize, width, borderSize)
  rect(width, height, -borderSize, -height)
  rect(width, 0, -width, borderSize)
}

function drawStars() {
  for (let i = 0; i < config.general.starsLength; i++) {
    stars[i].draw();
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

function checkForSpawnStar() {
  let isTimeToSpawn = seconds() - lastShootingStarSpawnTime >= shootingStarSpawnInterval
  if (isTimeToSpawn && framesPercent < 0.85) {
    spawnShootingStar();
  }
}
function spawnShootingStar() {
  let s = new ShootingStar(config.shootingStar.speed, config.shootingStar.trailSize, config.shootingStar.diameter);
  shootingStars.push(s);
  setShootingStarSpawnValues();
}
function setShootingStarSpawnValues()
{
  shootingStarSpawnInterval = random(config.shootingStars.minSpawnInterval, config.shootingStars.maxSpawnInterval);
  lastShootingStarSpawnTime = seconds();
}

function drawTitle() {
  textSize(TITLE_SIZE)
  textAlign(CENTER);
  text(TITLE, width / 2, height / 2 - 200);
}

function drawSubTitle() {
  textSize(SUB_TITLE_SIZE)
  textAlign(CENTER);
  text(SUB_TITLE, width / 2, height / 2 - 125);
}

function updateTypeBox() {
  if (seconds() - typeBoxTimer >= TYPE_BOX_COOLDOWN) {
    typeBoxTimer = seconds();
    mustShowTypeBox = !mustShowTypeBox;
  }

  if (mustShowTypeBox) {
    let adjustLevel = 20;
    text(" ".repeat(SUB_TITLE.length + adjustLevel) + "|", width / 2, height / 2 - 125)
  }
}