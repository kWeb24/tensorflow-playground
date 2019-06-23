import { dispatchEvent } from '../../Helpers/EventsHelper';

export default class BunnyGeneration {
  constructor(population, scene, tex) {
    this.population = population;
    this.species = [];
    this.generation = 1;
    this.highScore = 0;
    this.avgScore = 0;
    this.totalScore = 0;
    this.fitness = 0;
    this.progress = 0;
    this.scene = scene;
    this.tex = tex;
  }

  init(BunnyModel) {
    for (let i = 0; i < this.population; i++) {
      const newBunny = new BunnyModel(i, this.scene, this.tex);
      this.species.push(newBunny);
    }

    this.dispatchCounters();
  }

  pickOne() {
    let index = 0;
    let r = Math.random();
    while (r > 0) {
      r -= this.species[index].fitness;
      index += 1;
    }

    index -= 1;

    const selected = this.species[index].clone();
    return selected;
  }

  evolve() {
    // Store High Score
    this.generation += 1;
    const genHighscore = Math.max.apply(Math, this.species.map((creature) => creature.score));
    this.highScore = genHighscore > this.highScore ? genHighscore : this.highScore;

    // Calculate Total Score of this Generation
    let totalScore = 0;
    this.species.forEach((creature) => {
      totalScore += creature.score;
    });

    // Assign Fitness to each creature
    this.progress = totalScore / this.population - this.avgScore;
    this.avgScore = totalScore / this.population;
    for (let i = 0; i < this.population; i++) {
      this.species[i].fitness = this.species[i].score / totalScore;
    }

    // Store new generation temporarily in this array
    const newGeneration = [];

    // Breeding
    for (let i = 0; i < this.population; i++) {
      const parentA = this.pickOne();
      const parentB = this.pickOne();
      const child = parentA.crossover(parentB);
      child.mutate();
      child.id = i;
      child.parents = [
        { id: parentA.id, score: this.species[parentA.id].score },
        { id: parentB.id, score: this.species[parentB.id].score },
      ];
      newGeneration.push(child);
    }

    // Kill Current Generation.
    // i.e. Remove their bodies from MatterJS World and dispose their brain
    for (let i = 0; i < this.population; i++) {
      this.species[i].kill();
    }

    // Add new children to the current generation
    this.species = newGeneration;
    for (let i = 0; i < this.population; i++) {
      this.species[i].resurrect();
    }

    this.dispatchCounters();
  }

  dispatchCounters() {
    dispatchEvent('tob-bar-stats', {
      generation: this.generation,
      highScore: this.highScore.toFixed(5),
      avgScore: this.avgScore.toFixed(5),
      population: this.population,
      progress: this.progress.toFixed(5),
    });
  }
}
