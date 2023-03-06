class Tree {
    constructor(position, branchAngle, branchSize, branchesLength, color, branchDecrementFactor) {
        this.position = position;
        this.branchAngle = branchAngle;
        this.branchSize = branchSize;
        this.branchesLength = branchesLength;
        this.branchDecrementFactor = branchDecrementFactor;
        this.color = color;
    }

    draw() {
        angleMode(DEGREES);
        this.#drawBranch(this.position, 90, this.branchSize,0)
    }
    #drawBranch(position, angle, size, count) {
        if (count >this.branchesLength)
            return;
        strokeWeight(5);
        stroke(this.color);
        let endPosition = createVector( position.x - cos(angle) * size, position.y - sin(angle) * size)
        line(position.x, position.y, endPosition.x, endPosition.y);
        this.#drawBranch(endPosition, angle + this.branchAngle, size / this.branchDecrementFactor,count+1)
        this.#drawBranch(endPosition, angle - this.branchAngle, size / this.branchDecrementFactor,count+1)
    }
}