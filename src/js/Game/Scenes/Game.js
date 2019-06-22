import Phaser from 'phaser';
import Bunny from '../Creatures/Bunny';
import Food from '../Resources/Food';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.bunnyPopulation = [];
    this.foodSources = [];
  }

  init() {}

  preload() {
    this.load.setBaseURL('http://tensorflow-playground.test');
    this.load.image('bunny', 'assets/creatures/bunny.png');
    this.load.image('food', 'assets/resources/food.png');
  }

  create() {
    const bunny = new Bunny(this, 'bunny');
    this.bunnyPopulation.push(bunny);
    this.add.existing(bunny);

    this.createFoodSources();
  }

  createFoodSources() {
    for (let i = 0; i < 20; i++) {
      const source = new Food(this, 'food');
      this.foodSources.push(source);
      this.add.existing(source);
    }
  }
}
