import * as PIXI from "../../lib/pixi.mjs";

export class ShapeFactory {

  createShape(type, x, y, width, height, color) {
    switch (type) {
      case "rectangle":
        return new Rectangle(x, y, width, height, color);
      case "triangle":
        return new Triangle(x, y, width, height, color);
      case "circle":
        return new Circle(x, y, width, height, color);
      default:
        throw new Error("Invalid shape type.");
    }
  }

  getShapeTypes() {
    return ["rectangle", "triangle", "circle"];
  }
}

export class RandomShapeFactory extends ShapeFactory {

  createShape(x, y, width, height) {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    color = parseInt(color, 16);
    const random = Math.floor(Math.random() * 3);
    const allShapeTypes = this.getShapeTypes();
    return super.createShape(allShapeTypes[random], x, y, width, height, color);
  }
}

export class Shape {
  constructor(x, y, width, height, color) {
    this.pixiShape = new PIXI.Graphics();
    this.pixiShape.x = x;
    this.pixiShape.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  set x(value) {
    this.pixiShape.x = value;
  }

  set y(value) {
    this.pixiShape.y = value;
  }

  get x() {
    return this.pixiShape.x;
  }

  get y() {
    return this.pixiShape.y;
  }

  getArea() { 
    throw new Error(
      "Not implemented. Can't use base asbtract class. \
        This method and should be implemented by subclasses."
    );
  }

  draw(container) {
    throw new Error(
      "Not implemented. Can't use base asbtract class. \
        This method and should be implemented by subclasses."
    );
  }

  remove() {
    this.pixiShape.parent.removeChild(this.pixiShape);
  }

  setOnClick(onClickFunction) {
    this.pixiShape.interactive = true;
    this.pixiShape.on("pointerdown", onClickFunction);
  }
}

export class Rectangle extends Shape {
  
  draw(container) {
    this.pixiShape.rect(0, 0, this.width, this.height);

    this.pixiShape.fill(this.color);
    this.pixiShape.interactive = true;
    this.pixiShape.on("pointerdown", (event) => {
      container.removeChild(this.pixiShape);
      event.stopPropagation();
    });
    container.addChild(this.pixiShape);
   
  }
  getArea() {
    return this.width * this.height;
  }
}

export class Triangle extends Shape {
  
  draw(container) {
    this.pixiShape.moveTo(0, 0);
    this.pixiShape.lineTo(this.width, 0);
    this.pixiShape.lineTo(this.width / 2, this.height);
    this.pixiShape.closePath();
    this.pixiShape.fill(this.color);
    this.pixiShape.interactive = true;

    this.pixiShape.on("pointerdown", (event) => {
      container.removeChild(this.pixiShape);
      event.stopPropagation();
    });
    container.addChild(this.pixiShape);
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
}

export class Circle extends Shape {
    
  draw(container) {
    this.pixiShape.circle(this.width / 2, this.width / 2, this.width / 2);
    this.pixiShape.fill(this.color);
    this.pixiShape.interactive = true;

    this.pixiShape.on("pointerdown", (event) => {
      container.removeChild(this.pixiShape);
      event.stopPropagation();
    });
    container.addChild(this.pixiShape);
  }
  getArea() {
    return Math.PI * (this.width / 2) * (this.width / 2); 
  }
}
