import { Ticker } from "./Ticker.mjs";

export class ShapeSpawnerTicker extends Ticker {
  constructor(
    shapeFactory,
    gameScreen,
    physicsManager
  ) {
    super();
    this.shapeFactory = shapeFactory;
    this.gameScreen = gameScreen;
    this.physicsManager = physicsManager;
    this.lastTimeAShapeWasAdded = 0;
  }

  tick(currentTime) {
    this.spawnShape(currentTime);
  }

  spawnShape(currentTime) {
    if (this.physicsManager.getGravityValue() <= 0) {
      return 
    }
    if (this.physicsManager.getNumberOfShapesPerSec() <= 0) {
      return;
    }
    if (
      currentTime.lastTime - this.lastTimeAShapeWasAdded >
      1000 / this.physicsManager.getNumberOfShapesPerSec()
    ) {
    
      let x = Math.random() * this.gameScreen.gameContainer.width - 50;
      x = Math.max(x, 50);
      let shape = this.shapeFactory.createShape(x, -50, 50, 50);
      this.gameScreen.addShape(shape);
      this.lastTimeAShapeWasAdded = currentTime.lastTime;
    }
  }
}
