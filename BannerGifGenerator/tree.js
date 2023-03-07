class Tree {
    constructor(position, branchAngle, branchSize, branchesLength, color, branchDecrementFactor) {
        this.position = position;
        this.branchAngle = branchAngle;
        this.branchSize = branchSize;
        this.branchesLength = branchesLength;
        this.branchDecrementFactor = branchDecrementFactor;
        this.color = color;
        this.branches = [];

        angleMode(DEGREES);
        this.#setBranch(this.position, 90, this.branchSize, 0)
    }
    #setBranch(startPosition, angle, size, count) {
        if (count > this.branchesLength)
            return;

        let endPosition = createVector(startPosition.x - cos(angle) * size, startPosition.y - sin(angle) * size)
        this.branches.push(new Branch(startPosition, endPosition, this.color));

        this.#setBranch(endPosition, angle + this.branchAngle, size / this.branchDecrementFactor, count + 1)
        this.#setBranch(endPosition, angle - this.branchAngle, size / this.branchDecrementFactor, count + 1)
    }

    draw() {
        for (let i = 0; i < this.branches.length; i++) {
            this.branches[i].draw();
        }
    }
}

class Branch {
    constructor(startPosition, endPosition, color) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.color = color;
    }

    draw() {
        strokeWeight(5);
        stroke(this.color);
        line(this.startPosition.x, this.startPosition.y, this.endPosition.x, this.endPosition.y);
    }
}