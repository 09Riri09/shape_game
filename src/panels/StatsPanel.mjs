import * as PIXI from "../../lib/pixi.mjs";

export class StatsPanel {
  constructor(parentNode, x, y) {
    this.container = new PIXI.Container();

    const fontSize = Math.max(12, window.innerWidth / 50);

    this.numberOfShapesStat = new PIXI.Text("Shapes number:", {
      fontFamily: "Arial",
      fontSize: fontSize,
      fill: 0xfffff,
      align: "center",
    });
    this.areaText = new PIXI.Text("Shapes area:", {
      fontFamily: "Arial",
      fontSize: fontSize,
      fill: 0xfffff,
      align: "center",
    });
    this.areaText.x = this.numberOfShapesStat.width + 100;

    this.container.addChild(this.numberOfShapesStat);
    this.container.addChild(this.areaText);

    this.container.x = x;
    this.container.y = y;
    parentNode.addChild(this.container);
  }

  updateStats(numberOfShapes, area) {
    this.numberOfShapesStat.text = `Shapes number: ${numberOfShapes}`;
    this.areaText.text = `Shapes area: ${area.toFixed(2)}`;
  }
}
