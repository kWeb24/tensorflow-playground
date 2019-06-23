import * as tf from '@tensorflow/tfjs';
import BunnyBrain from '../Brains/BunnyBrain';
import Bunny from '../../Game/Creatures/Bunny';
import { randomGaussian } from '../../Helpers/MathHelpers';
import { dispatchEvent } from '../../Helpers/EventsHelper';

export default class BunnyModel {
  constructor(id, scene, tex) {
    this.id = id;
    this.score = 0;
    this.fitness = 0;
    this.parents = [];
    this.scene = scene;
    this.tex = tex;
    this.inputLayers = 4;
    this.hiddenLayers = 100;
    this.outputLayers = 2;
    this.mutationRate = 0.05;
    this.brain = new BunnyBrain(this.inputLayers, this.hiddenLayers, this.outputLayers);
    this.body = new Bunny(scene, tex, this);

    dispatchEvent('mutation-rate', { mutationRate: `${this.mutationRate * 100}%` });
  }

  think() {
    const bodyPositionX = this.body.x;
    const bodyPositionY = this.body.y;
    const closestFoodPositionX = this.body.findFood().x;
    const closestFoodPositionY = this.body.findFood().y;
    const input = [
      bodyPositionX / this.inputLayers,
      bodyPositionY / this.inputLayers,
      closestFoodPositionX / this.inputLayers,
      closestFoodPositionY / this.inputLayers,
    ];
    const result = this.brain.predict(input);
    this.body.move(result[0], result[1]);
  }

  clone() {
    const clone = new BunnyModel(this.id, this.scene, this.tex);
    clone.brain.dispose();
    clone.brain = this.brain.clone();
    return clone;
  }

  kill() {
    this.brain.dispose();
    this.body.kill();
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

  // approximator
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
    this.score = this.body.foodConsumed > 0 ? this.body.foodConsumed * 10 : 0.001;
  }

  walk() {}

  resurrect() {
    this.body = new Bunny(this.scene, this.tex, this);
  }

  update() {
    this.body.update();
  }
}
