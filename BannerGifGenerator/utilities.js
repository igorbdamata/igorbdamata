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