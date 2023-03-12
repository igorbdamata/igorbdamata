class Star {
    constructor(position, diameter) {
        this.position = position;
        this.diameter = diameter;
        this.noiseIntensity = random(1.0, 2.0);
        this.brightNoise = new PerlinNoiseLoop(10, config.general.noiseSeed, random(0, 1000));
    }

    draw() {
        circle(this.position.x, this.position.y, this.diameter + this.#getBrightness());
    }
    #getBrightness() {
        return map(this.brightNoise.getValue(), 0, 1, 0, this.noiseIntensity);
    }
}