class ShootingStar {
    constructor(speed, trailSize, diameter) {
        this.speed = speed;
        this.diameter = diameter;
        this.radius = diameter / 2
        this.trailSize = trailSize
        this.history = [];
        this.position = createVector(random(100, width - 100), -100);
        this.direction = createVector(random(0.5, 1.1) * (this.position.x < width / 2 ? 1 : -1), 1);
    }

    update() {
        this.#move();
        this.#updateHistory();
        fill(255, 255, 255, 255)
        circle(this.position.x, this.position.y, this.diameter);
        this.#drawTrail();
    }

    #move() {
        let moveAmount = createVector(this.direction.x, this.direction.y).mult(this.speed);
        this.position.add(moveAmount);
    }

    #updateHistory() {
        if (this.history.length == this.trailSize) {
            this.history.splice(0, 1);
        }
        this.history.push(createVector(this.position.x, this.position.y));
    }
    #drawTrail() {
        let angle = this.#getTrailAngle();
        let leftPoint = this.#getTrailPointFrom(angle + 90);
        let rightPoint = this.#getTrailPointFrom(angle - 90);
        beginShape();
        vertex(this.history[0].x, this.history[0].y);
        vertex(leftPoint.x, leftPoint.y);
        vertex(rightPoint.x, rightPoint.y);
        endShape();
    }
    #getTrailAngle() {
        let distance = createVector(this.position.x - this.history[0].x, this.position.y - this.history[0].y);
        return atan2(distance.y, distance.x);
    }
    #getTrailPointFrom(angle) {
        let x = this.position.x + this.radius * cos(angle);
        let y = this.position.y + this.radius * sin(angle);
        return createVector(x, y);
    }
}