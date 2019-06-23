import Phaser from 'phaser';
import { getRandomInRange } from '../../Helpers/MathHelpers';

export default class Food extends Phaser.GameObjects.Sprite {
  constructor(scene, tex) {
    const randX = getRandomInRange(25, scene.game.renderer.width - 25);
    const randY = getRandomInRange(25, scene.game.renderer.height - 25);
    super(scene, randX, randY, tex);
  }
}
