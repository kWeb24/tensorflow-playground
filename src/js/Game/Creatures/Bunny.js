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
    this.foodReachDistance = 100;
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

    // console.log(
    //   Phaser.Math.Distance.Between(
    //     this.x,
    //     this.y,
    //     this.selectedTargetPos.x,
    //     this.selectedTargetPos.y
    //   )
    // );
    this.findFood();
    if (this.isFoodInRange()) {
      this.eat(this.selectedTargetObj);
    }

    this.horizontal = 0;
    this.vertical = 0;
  }

  move(x, y) {
    // console.log(`${x}/${y}`);
    this.horizontal = x;
    this.vertical = y;
  }

  findFood() {
    this.scene.data.foods.children.entries.forEach((children) => {
      const distance = Phaser.Math.Distance.Between(this.x, this.y, children.x, children.y);
      if (!this.selectedTargetPos || distance < this.selectedTargetPos) {
        this.selectedTargetPos = { x: children.x, y: children.y };
        this.selectedTargetObj = children;
      }
    });

    return this.selectedTargetPos;
  }

  eat() {
    console.log('eat');
    this.foodConsumed++;
    // this.selectedTargetObj.destroy();
    this.scene.data.foods.remove(this.selectedTargetObj, true, true);
    this.selectedTargetObj = null;
    this.selectedTargetPos = null;
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

  kill() {
    this.destroy();
  }
}
