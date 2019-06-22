import Phaser from 'phaser';
// import Bunny from '../Creatures/Bunny';
import BunnyGeneration from '../../Network/Generations/BunnyGeneration';
import BunnyModel from '../../Network/Models/BunnyModel';

import Food from '../Resources/Food';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.bunnyGeneration = null;
    this.foodSources = [];
    this.epochLengthInSeconds = 5;
    this.msInSec = 1000;
    this.epochLength = this.epochLengthInSeconds * this.msInSec;
  }

  preload() {
    this.load.setBaseURL('http://tensorflow-playground.test');
    this.load.image('bunny', 'assets/creatures/bunny.png');
    this.load.image('food', 'assets/resources/food.png');
  }

  create() {
    // const bunny = new Bunny(this, 'bunny');
    // this.bunnyPopulation.push(bunny);
    // this.add.existing(bunny);
    this.bunnyGeneration = new BunnyGeneration(10, this, 'bunny');
    this.createFoodSources();
    this.createBunniesGeneration();
  }

  createFoodSources() {
    this.data.foods = this.add.group();
    for (let i = 0; i < 100; i++) {
      const source = new Food(this, 'food');
      this.foodSources.push(source);
      this.data.foods.add(source);
      this.add.existing(source);
    }
  }

  createBunniesGeneration() {
    this.bunnyGeneration.init(BunnyModel);
    this.bunnyGeneration.species.forEach((bunny) => {
      this.add.existing(bunny.body);
    });

    setInterval(() => {
      this.bunnyGeneration.evolve();
      this.bunnyGeneration.species.forEach((bunny) => {
        this.add.existing(bunny.body);
      });
    }, this.epochLength);
  }

  update() {
    this.bunnyGeneration.species.forEach((bunny) => {
      bunny.update();
    });
  }
}
