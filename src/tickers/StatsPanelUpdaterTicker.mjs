import { Ticker } from './Ticker.mjs';

export class StatsPanelUpdaterTicker extends Ticker {
  constructor(statsPanel, gameScreen) {
    super();
    this.statsPanel = statsPanel;
    this.gameScreen = gameScreen;
  }

  tick(currentTime) {
    this.statsPanel.updateStats(this.gameScreen.getVisibleShapes().length,
     this.gameScreen.getOccupiedArea());
  }
}