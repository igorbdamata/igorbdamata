class Tree {
    constructor(position, branchAngle, branchSize, branchesLength, color, branchDecrementFactor) {
        this.position = position;
        this.branchAngle = branchAngle;
        this.branchSize = branchSize;
        this.maxBranchesGeneration = branchesLength;
        this.branchDecrementFactor = branchDecrementFactor;
        this.color = color;
        this.branches = [];

        angleMode(DEGREES);
        this.#setBranch(this.position, 90, this.branchSize, 0)
    }
    #setBranch(startPosition, angle, size, generation) {
        if (generation > this.maxBranchesGeneration)
            return;

        let endPosition = createVector(startPosition.x - cos(angle) * size, startPosition.y - sin(angle) * size)
        this.branches.push(new Branch(startPosition, endPosition, this.color, generation));

        let nextbranchStartPosition = endPosition;
        let nextBranchSize = size/this.branchDecrementFactor;
        let nextGeneration = generation + 1;
        this.#setBranch(nextbranchStartPosition, angle + this.branchAngle, nextBranchSize, nextGeneration);
        this.#setBranch(nextbranchStartPosition, angle - this.branchAngle, nextBranchSize, nextGeneration);
    }

    draw() {
        for (let i = 0; i < this.branches.length; i++) {
            this.branches[i].draw();
        }
    }
}

class Branch {
    constructor(startPosition, endPosition, color, generation) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.color = color;
        this.generation = generation;
    }

    draw() {
        strokeWeight(5);
        stroke(this.color);
        let startPositionXWithWindForce = this.startPosition.x + getWindForce().x * this.generation;
        let endPositionXWithWindForce = this.endPosition.x + getWindForce().x * (this.generation + 1);
        line(startPositionXWithWindForce, this.startPosition.y + getWindForce().y * this.generation, endPositionXWithWindForce, this.endPosition.y + getWindForce().y * (this.generation + 1));
        noStroke();
    }
}