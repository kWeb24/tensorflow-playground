import * as tf from '@tensorflow/tfjs';

export default class BunnyBrain {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    // Random initial weights
    this.inputWeights = tf.randomNormal([this.inputNodes, this.hiddenNodes]);
    this.outputWeights = tf.randomNormal([this.hiddenNodes, this.outputNodes]);
  }

  predict(userInput) {
    let output;

    // Execute and clear GPU memory
    tf.tidy(() => {
      // This network is not good fit for the task
      // Need to change it for Policy Network
      const inputLayer = tf.tensor(userInput, [1, this.inputNodes]);
      const hiddenLayer = inputLayer.matMul(this.inputWeights).tanh();
      const outputLayer = hiddenLayer.matMul(this.outputWeights).tanh();
      output = outputLayer.dataSync();
    });

    return output;
  }

  clone() {
    const clone = new BunnyBrain(this.inputNodes, this.hiddenNodes, this.outputNodes);
    clone.dispose();
    clone.inputWeights = tf.clone(this.inputWeights);
    clone.outputWeights = tf.clone(this.outputWeights);
    return clone;
  }

  dispose() {
    this.inputWeights.dispose();
    this.outputWeights.dispose();
  }
}
