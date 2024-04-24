import * as PIXI from "../../lib/pixi.mjs";

export class GameScreen {
  constructor(parentNode, x, y, width, height, backgroundColor, shapeFactory) {
    this.shapes = [];

    this.gameContainer = new PIXI.Graphics();
    this.gameContainer.x = x;
    this.gameContainer.y = y;

    this.fixedTopHeight = height;

    this.gameContainer.rect(0, 0, width, height);
    this.gameContainer.fill(backgroundColor);

    this.mask = new PIXI.Graphics()
      .rect(0, 0, width, height)
      .fill(0x000000);
    this.gameContainer.mask = this.mask;
    this.gameContainer.addChild(this.mask);

    parentNode.addChild(this.gameContainer);

    this.gameContainer.interactive = true;
    this.gameContainer.on("pointerdown", (event) => {
      const { x, y } = event.data.getLocalPosition(this.gameContainer);
      const shape = shapeFactory.createShape(x, y, 50, 50);
      this.addShape(shape);
    });
    
    setInterval(() => this.cleanupShapes(), 100);
  }

  addShape(shape) {
    shape.draw(this.gameContainer);
    shape.setOnClick((event) => {
      this.shapes = this.shapes.filter((s) => s !== shape);
      this.gameContainer.removeChild(shape.pixiShape);
      event.stopPropagation();
    });
    this.shapes.push(shape);
  }

  getVisibleShapes() {
    return this.shapes.filter((shape) => this.isShapeVisible(shape));
  }

  applyGravity(gravityValue) {
    this.shapes.forEach((shape) => (shape.y += gravityValue));
  }

  getOccupiedArea() {
    return this.getVisibleShapes().reduce(
      (acc, shape) => acc + shape.getArea(),
      0
    );
  }

  cleanupShapes() {

    if (this.gravityValue === 0) {
      return;
    }
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (!this.isShapeVisible(this.shapes[i])) {
        this.shapes[i].remove();
      }
    }
    this.shapes = this.getVisibleShapes();
  }

  isShapeVisible(shape) {

    return shape.y < this.fixedTopHeight && shape.y > -100;
    
  }
}
