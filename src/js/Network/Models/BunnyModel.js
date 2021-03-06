import * as tf from '@tensorflow/tfjs';
import BunnyBrain from '../Brains/BunnyBrain';
import Bunny from '../../Game/Creatures/Bunny';
import { randomGaussian } from '../../Helpers/MathHelpers';
import { dispatchEvent } from '../../Helpers/EventsHelper';

export default class BunnyModel {
  constructor(id, scene, tex, generation) {
    this.id = id;
    this.score = 0;
    this.fitness = 0;
    this.parents = [];
    this.scene = scene;
    this.tex = tex;
    this.inputLayers = 2;
    this.hiddenLayers = 4;
    this.outputLayers = 2;
    this.mutationRate = 0.05;
    this.alive = true;
    this.brain = new BunnyBrain(this.inputLayers, this.hiddenLayers, this.outputLayers);
    this.body = new Bunny(scene, tex, this);
    this.generation = generation;

    dispatchEvent('mutation-rate', { mutationRate: `${this.mutationRate * 100}%` });
  }

  think() {
    this.body.findFood();
    const closestFoodDist = this.body.selectedTargetDist;
    const relativeAngleToFood = this.body.selectedTargetAngle;

    const input = [relativeAngleToFood, closestFoodDist];
    const result = this.brain.predict(input);
    this.body.move(result[0], result[1]);
  }

  clone() {
    const clone = new BunnyModel(this.id, this.scene, this.tex, this.generation);
    clone.brain.dispose();
    clone.body.killBunny();
    clone.brain = this.brain.clone();
    return clone;
  }

  kill() {
    this.brain.dispose();
    this.body.killBunny();
  }

  mutate() {
    const ih = this.brain.inputWeights.dataSync().map((x, y) => BunnyModel.fn(x, y));
    const ihShape = this.brain.inputWeights.shape;
    this.brain.inputWeights.dispose();
    this.brain.inputWeights = tf.tensor(ih, ihShape);

    const ho = this.brain.outputWeights.dataSync().map((x, y) => BunnyModel.fn(x, y));
    const hoShape = this.brain.outputWeights.shape;
    this.brain.outputWeights.dispose();
    this.brain.outputWeights = tf.tensor(ho, hoShape);
  }

  static fn(x, y) {
    if (Math.random() < this.mutationRate) {
      const offset = randomGaussian() * 0.5;
      const newx = x + offset;
      return newx;
    }
    return x;
  }

  crossover(partner) {
    const parentAInDna = this.brain.inputWeights.dataSync();
    const parentAOutDna = this.brain.outputWeights.dataSync();
    const parentBInDna = partner.brain.inputWeights.dataSync();
    const parentBOutDna = partner.brain.outputWeights.dataSync();

    const mid = Math.floor(Math.random() * parentAInDna.length);
    const childInDna = [
      ...parentAInDna.slice(0, mid),
      ...parentBInDna.slice(mid, parentBInDna.length),
    ];
    const childOutDna = [
      ...parentAOutDna.slice(0, mid),
      ...parentBOutDna.slice(mid, parentBOutDna.length),
    ];

    const child = this.clone();
    const inputShape = this.brain.inputWeights.shape;
    const outputShape = this.brain.outputWeights.shape;

    child.brain.dispose();

    child.brain.inputWeights = tf.tensor(childInDna, inputShape);
    child.brain.outputWeights = tf.tensor(childOutDna, outputShape);

    return child;
  }

  adjustScore() {
    this.score = this.body.foodConsumed > 0 ? this.body.foodConsumed * 10 : 0;
  }

  resurrect() {
    this.body = new Bunny(this.scene, this.tex, this);
  }

  update() {
    this.body.update();
  }

  die() {
    this.generation.remove(this.id);
  }

  setIndex(index) {
    this.id = index;
  }

  reproduce() {
    this.generation.calcFitness();
    const partner = this.generation.pickOne();
    const child = this.crossover(partner);
    child.mutate();
    child.id = this.generation.species.length + 1;
    child.parents = [{ id: this.id, score: this.score }, { id: partner.id, score: partner.score }];
    child.resurrect();
    child.body.energy = 50;
    this.body.energy -= 30;
    this.generation.species.push(child);
    this.generation.refreshPopulation();
    this.scene.add.existing(child.body);
  }
}
