function seconds() {
    return millis() / 1000;
}

function getRandomPositionOnScreen() {
    return createVector(random(0, width), random(0, height));
}

function getWindForce() {
    let x = map(windNoise.getValue(), 0, 1, -1, 1) * windIntensity.x;
    let y = map(windNoise.getValue(), 0, 1, -1, 1) * windIntensity.y;
    return createVector(x, y);
}