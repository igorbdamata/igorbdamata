const TITLE = "Igor B. da Mata..."
const TITLE_SIZE = 100;
const TYPE_BOX_COOLDOWN = 0.75;

let config;

let windIntensity;

let typeBoxTimer = 0;
let mustShowTypeBox = false;

let stars = [];
let shootingStars = [];
let tree;

let shootingStarSpawnInterval;
let lastShootingStarSpawnTime;

function keyTyped() {
  if (key == "r") {
    saveGif("banner.gif", gifLength);
  }
}

function preload() {
  config = loadJSON("configs.json");
}

function setup() {
  createCanvas(1280, 640);

  noiseSeed(config.general.noiseSeed);

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
  spawnShootingStar();
}

function draw() {
  noStroke();
  background(config.general.backgroundColor);
  fill(config.default.color)

  drawBorder();
  drawStars();
  tree.draw();
  updateShootingStars()
  checkForSpawnStar();
  drawTitle();
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
  if (seconds() - lastShootingStarSpawnTime >= shootingStarSpawnInterval) {
    spawnShootingStar();
  }
}
function spawnShootingStar() {
  let s = new ShootingStar(config.shootingStar.speed, config.shootingStar.trailSize, config.shootingStar.diameter);
  shootingStars.push(s);
  shootingStarSpawnInterval = random(config.shootingStars.minSpawnInterval, config.shootingStars.maxSpawnInterval);
  lastShootingStarSpawnTime = seconds();
}

function drawTitle()
{
  textSize(TITLE_SIZE)
  textAlign(CENTER);
  text(TITLE, width / 2, height / 2 - 200);
  if (seconds() - typeBoxTimer >= TYPE_BOX_COOLDOWN) {
    typeBoxTimer = seconds();
    mustShowTypeBox = !mustShowTypeBox;
  }
  if (mustShowTypeBox) {
    rect(width / 2 + 393, height / 2 - 200 - TITLE_SIZE / 1.3, 2, TITLE_SIZE / 1.3)
  }
}