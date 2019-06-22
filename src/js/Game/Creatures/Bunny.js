import Phaser from 'phaser';
import { getRandomInRange } from '../../Helpers/MathHelpers';

export default class Bunny extends Phaser.GameObjects.Sprite {
  constructor(scene, tex) {
    const randX = getRandomInRange(0, window.innerWidth);
    const randY = getRandomInRange(0, window.innerHeight);
    super(scene, randX, randY, tex);
  }

  update() {}
}
