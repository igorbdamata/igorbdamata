class Star {
    constructor(position, diameter) {
        this.position = position;
        this.diameter = diameter;
        this.noiseIntensity = random(0.01, 0.05);
    }

    draw() {
        fill(objectColor)
        circle(this.position.x, this.position.y, this.diameter * noise(seconds() * this.noiseIntensity));
    }
}