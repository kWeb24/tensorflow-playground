import Phaser from 'phaser';
import { getRandomInRange } from '../../Helpers/MathHelpers';

export default class Bunny extends Phaser.GameObjects.Sprite {
  constructor(scene, tex, model) {
    const randX = getRandomInRange(0, window.innerWidth);
    const randY = getRandomInRange(0, window.innerHeight);
    super(scene, randX, randY, tex);
    this.horizontal = 0;
    this.vertical = 0;
    this.model = model;
    this.foodConsumed = 0;
    this.selectedTargetPos = null;
    this.selectedTargetObj = null;
    this.selectedTargetDist = null;
    this.foodReachDistance = 10;
    this.scene = scene;
    this.circleShape = new Phaser.Geom.Circle(this.x, this.y, this.foodReachDistance);
  }

  update() {
    this.model.think();
    this.model.adjustScore();

    if (this.horizontal < 0.5) {
      this.x -= 1;
    } else if (this.horizontal > 0.5) {
      this.x += 1;
    }

    if (this.vertical < 0.5) {
      this.y -= 1;
    } else if (this.vertical > 0.5) {
      this.y += 1;
    }

    if (this.isFoodInRange()) {
      this.eat(this.selectedTargetObj);
    }

    this.horizontal = 0;
    this.vertical = 0;

    this.clearDebugGraphics(true);
  }

  move(x, y) {
    this.horizontal = x;
    this.vertical = y;
  }

  findFood() {
    this.scene.data.foods.children.entries.forEach((children) => {
      const distance = Phaser.Math.Distance.Between(this.x, this.y, children.x, children.y);
      if (!this.selectedTargetPos || distance < this.selectedTargetDist) {
        this.selectedTargetPos = { x: children.x, y: children.y };
        this.selectedTargetObj = children;
        this.selectedTargetDist = distance;
      }
    });

    return this.selectedTargetPos;
  }

  eat() {
    this.foodConsumed++;
    this.scene.data.foods.remove(this.selectedTargetObj, true, true);
    this.selectedTargetObj = null;
    this.selectedTargetPos = null;
    this.findFood();
  }

  isFoodInRange() {
    return (
      Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.selectedTargetPos.x,
        this.selectedTargetPos.y
      ) < this.foodReachDistance
    );
  }

  drawDebugGraphics() {
    this.graphics = this.scene.add.graphics();
    this.graphics.strokeCircle(this.x, this.y, this.foodReachDistance);
    if (this.selectedTargetPos) {
      this.graphics.lineBetween(this.x, this.y, this.selectedTargetPos.x, this.selectedTargetPos.y);
    }
  }

  clearDebugGraphics(redraw = false) {
    if (this.graphics) {
      this.graphics.clear();
      this.graphics.destroy();
    }

    if (redraw) this.drawDebugGraphics();
  }

  kill() {
    this.clearDebugGraphics();
    this.destroy();
  }
}
