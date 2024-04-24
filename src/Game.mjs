import * as PIXI from "../lib/pixi.mjs";
import { StatsPanel } from "./panels/StatsPanel.mjs";
import { GameScreen } from "./screen/GameScreen.mjs";
import { RandomShapeFactory } from "./shapes/Shapes.mjs";
import { ControlPanel } from "./panels/ControlPanel.mjs";
import { ShapeSpawnerTicker } from "./tickers/ShapeSpawnerTicker.mjs";
import { TickerManager } from "./tickers/TickerManager.mjs";
import { GravityTicker } from "./tickers/GravityTicker.mjs";
import { PhysicsManager } from "./physics/PhysicsManager.mjs";
import { StatsPanelUpdaterTicker } from "./tickers/StatsPanelUpdaterTicker.mjs";


export class Game {

  async start() {
    await this.initPIXI();

    const physicsManager = new PhysicsManager(1, 1);
    const statsPanel = new StatsPanel(this.app.stage, 10, 100);
    const gameScreen = new GameScreen(
      this.app.stage,
      0,
      200,
      this.app.screen.width,
      this.app.screen.height / 2,
      0xffffff,
      new RandomShapeFactory()
    );

    this.gravityPannel = new ControlPanel(
      50,
      gameScreen.gameContainer.y + gameScreen.gameContainer.height + 50,
      "Gravity:", physicsManager, "gravity"
    );

    this.numberOfShapesPerSecPanel = new ControlPanel(
      this.app.screen.width / 2,
      gameScreen.gameContainer.y + gameScreen.gameContainer.height + 50,
      "Shapes per second:", physicsManager, "numberOfShapesPerSec"
    );

    this.tickerManager = new TickerManager();
    this.tickerManager.addTickers(
      new GravityTicker(gameScreen, physicsManager),
      new ShapeSpawnerTicker(new RandomShapeFactory(), gameScreen, physicsManager),
      new StatsPanelUpdaterTicker(statsPanel, gameScreen)
    );
    this.app.ticker.add((time) => {
      this.tickerManager.notify(time);
    });
    
  }

  async initPIXI() {
    this.app = new PIXI.Application();
    await this.app.init({ background: "#135D66", resizeTo: window });
    document.getElementById("game").appendChild(this.app.canvas);
  }
}
