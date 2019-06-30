import Phaser from 'phaser';
import BunnyGeneration from '../../Network/Generations/BunnyGeneration';
import BunnyModel from '../../Network/Models/BunnyModel';
import Food from '../Resources/Food';

import { dispatchEvent } from '../../Helpers/EventsHelper';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.bunnyGeneration = null;
    this.foodSources = [];
    this.epochLengthInSeconds = 3;
    this.msInSec = 1000;
    this.epochLength = this.epochLengthInSeconds * this.msInSec;
    dispatchEvent('epoch-length', { epochLength: `${this.epochLengthInSeconds}s` });
  }

  preload() {
    this.load.setBaseURL('http://tensorflow-playground.test');
    this.load.image('bunny', 'assets/creatures/bunny.png');
    this.load.image('food', 'assets/resources/food.png');
  }

  create() {
    this.bunnyGeneration = new BunnyGeneration(25, this, 'bunny');
    this.createFoodSources(true);
    this.createBunniesGeneration();
    this.matter.world.setBounds();
  }

  createFoodSources(createGroup = false, count = 100) {
    if (createGroup) {
      this.data.foods = this.add.group();
    }

    for (let i = 0; i < count; i++) {
      const source = new Food(this, 'food');
      // this.foodSources.push(source);
      this.data.foods.add(source);
      this.add.existing(source);
    }
  }

  removeFoodSources() {
    this.data.foods.clear(true);
    this.foodSources.forEach((source) => source.destroy());
  }

  createBunniesGeneration() {
    this.bunnyGeneration.init(BunnyModel);
    this.bunnyGeneration.foodSources = this.data.foods.children.entries.length;
    this.bunnyGeneration.species.forEach((bunny) => {
      this.add.existing(bunny.body);
    });

    setInterval(() => {
      if (!this.bunnyGeneration.species.length) return false;
      // this.removeFoodSources();
      this.createFoodSources(false, 5);
      this.bunnyGeneration.foodSources = this.data.foods.children.entries.length;
      this.bunnyGeneration.rateGeneration();
      this.bunnyGeneration.species.forEach((specie) => specie.body.payLivingCost());
      // this.bunnyGeneration.evolve();
      // this.bunnyGeneration.species.forEach((bunny) => {
      //   this.add.existing(bunny.body);
      // });
    }, this.epochLength);
  }

  update() {
    this.bunnyGeneration.species.forEach((bunny) => {
      bunny.update();
    });
  }
}
