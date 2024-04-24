export class PhysicsManager {
    constructor(initialGravity, initialNumberOfShapesPerSec) {
        this.gravityValue = initialGravity;
        this.numberOfShapesPerSec = initialNumberOfShapesPerSec;
    }

    increaseGravity() {
        this.gravityValue += 1;
    }

    decreaseGravity() {
        this.gravityValue -= 1;
    }

    increaseNumberOfShapesPerSec() {
        this.numberOfShapesPerSec += 1;
    }

    decreaseNumberOfShapesPerSec() {
        this.numberOfShapesPerSec -= 1;
    }

    getGravityValue() {
        return this.gravityValue;
    }

    getNumberOfShapesPerSec() {
        return this.numberOfShapesPerSec;
    }
}