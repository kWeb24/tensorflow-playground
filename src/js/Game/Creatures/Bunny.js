import Phaser from 'phaser';
import { getRandomInRange } from '../../Helpers/MathHelpers';

export default class Bunny extends Phaser.Physics.Matter.Sprite {
  constructor(scene, tex, model) {
    const randX = getRandomInRange(25, scene.game.renderer.width - 25);
    const randY = getRandomInRange(25, scene.game.renderer.height - 25);
    super(scene.matter.world, randX, randY, tex);
    this.setFrictionAir(0.5);

    this.model = model;
    this.scene = scene;

    this.foodConsumed = 0;
    this.visibilityRange = 100;
    this.foodReachDistance = 20;
    this.maxThrust = 10;
    this.thrustRatio = 1000;
    this.turnRatio = 10;
    this.motorsDiff = 0;
    this.motorsThrust = 0;
    this.motorsDiffNegative = false;

    this.selectedTargetPos = null;
    this.selectedTargetObj = null;
    this.selectedTargetDist = null;
    this.selectedTargetAngle = null;

    this.debug = true;
  }

  update() {
    this.model.think();
    this.model.adjustScore();

    this.thrust((this.maxThrust * (this.motorsThrust / 100)) / this.thrustRatio);
    this.angle += ((this.motorsDiff * 100) / this.turnRatio) * this.rotationDirection;

    if (this.isFoodInRange()) {
      this.eat(this.selectedTargetObj);
    }

    this.clearDebugGraphics(true);
  }

  move(motorA, motorB) {
    this.motorsDiff = Math.abs(motorA - motorB);
    this.motorsThrust = (((motorA + motorB) / 2) * 100) / this.maxThrust;
    this.rotationDirection = motorA - motorB < 0 ? -1 : 1;
  }

  findFood() {
    this.selectedTargetObj = null;
    this.selectedTargetPos = null;
    this.selectedTargetDist = null;
    this.selectedTargetAngle = null;
    this.scene.data.foods.children.entries.forEach((children) => {
      const distance = Phaser.Math.Distance.Between(this.x, this.y, children.x, children.y);
      if (distance < this.visibilityRange) {
        if (!this.selectedTargetPos || distance < this.selectedTargetDist) {
          this.selectedTargetPos = { x: children.x, y: children.y };
          this.selectedTargetObj = children;
          this.selectedTargetDist = distance;
          this.selectedTargetAngle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            children.x,
            children.y
          );
        }
      }
    });

    return this.selectedTargetPos;
  }

  eat() {
    this.foodConsumed++;
    this.scene.data.foods.remove(this.selectedTargetObj, true, true);
    this.findFood();
  }

  isFoodInRange() {
    if (!this.selectedTargetPos) return false;
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
    if (!this.debug) return false;
    this.graphics = this.scene.add.graphics();
    this.graphics.strokeCircle(this.x, this.y, this.foodReachDistance);
    this.graphics.strokeCircle(this.x, this.y, this.visibilityRange);
    if (this.selectedTargetPos) {
      this.graphics.lineBetween(this.x, this.y, this.selectedTargetPos.x, this.selectedTargetPos.y);
    }
  }

  clearDebugGraphics(redraw = false) {
    if (!this.debug) return false;
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
