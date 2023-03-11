class PerlinNoiseLoop {
    constructor(diameter, seed, offset) {
        this.diameter = diameter;
        this.offset = offset;
        noiseSeed(seed);
    }
    getValue() {
        return this.getValueOf(framesPercent * TWO_PI);
    }
    getValueOf(t) {
        angleMode(RADIANS);
        let x = map(cos(t), -1, 1, this.offset, this.offset + this.diameter);
        let y = map(sin(t), -1, 1, this.offset, this.offset + this.diameter);
        angleMode(DEGREES);
        return noise(x, y);
    }
}