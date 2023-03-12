function spawnShootingStar() {
    let s = new ShootingStar(config.shootingStar.speed, config.shootingStar.trailSize, config.shootingStar.diameter);
    shootingStars.push(s);
    setShootingStarSpawnValues();
}
function setShootingStarSpawnValues() {
    shootingStarSpawnInterval = random(config.shootingStars.minSpawnInterval, config.shootingStars.maxSpawnInterval);
    lastShootingStarSpawnTime = seconds();
}

function spawnTreeAt(position) {
    tree = new Tree(
        position,
        config.tree.branchAngle,
        config.tree.branchSize,
        config.tree.maxBranchesGeneration,
        config.tree.branchDecrementFactor,
        config.default.color)
}