import { Ticker } from "./Ticker.mjs";

export class GravityTicker extends Ticker {
  // super();
  constructor(gameScreen, physicsManager) {
    super();
    this.gameScreen = gameScreen;
    this.physicsManager = physicsManager;
  }

  tick(currentTime) {
    this.applyGravity();
  }

  applyGravity() {
    const gravityValue = this.physicsManager.getGravityValue();
    if (gravityValue === 0) {
      return;
    }
    this.gameScreen.applyGravity(gravityValue);
  }
}
