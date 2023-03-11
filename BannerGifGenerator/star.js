class Star {
    constructor(position, diameter) {
        this.position = position;
        this.diameter = diameter;
        this.noiseIntensity = random(1, 2);
    }

    draw() {
        circle(this.position.x, this.position.y, this.diameter + this.#getBrightness());
    }
    #getBrightness() {
        return noise(seconds() * this.noiseIntensity);
    }
}