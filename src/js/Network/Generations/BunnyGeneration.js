import { dispatchEvent } from '../../Helpers/EventsHelper';

export default class BunnyGeneration {
  constructor(population, scene, tex) {
    this.initialPopulation = population;
    this.population = population;
    this.species = [];
    this.generation = 1;
    this.highScore = 0;
    this.avgScore = 0;
    this.totalScore = 0;
    this.fitness = 0;
    this.progress = 0;
    this.foodSources = 0;
    this.scene = scene;
    this.tex = tex;
  }

  init(BunnyModel) {
    for (let i = 0; i < this.population; i++) {
      const newBunny = new BunnyModel(i, this.scene, this.tex, this);
      this.species.push(newBunny);
    }

    this.dispatchCounters();
    this.dispatchPopulationChanges();
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

  calcGenerationHighScore() {
    this.generation += 1;
    const genHighscore = Math.max.apply(Math, this.species.map((creature) => creature.score));
    this.highScore = genHighscore > this.highScore ? genHighscore : this.highScore;
    return genHighscore;
  }

  calcTotalScore() {
    let totalScore = 0;
    this.species.forEach((creature) => {
      totalScore += creature.score;
    });
    return totalScore;
  }

  calcFitness() {
    const totalScore = this.calcTotalScore();
    this.progress = totalScore / this.population - this.avgScore;
    this.avgScore = totalScore / this.population;
    for (let i = 0; i < this.population; i++) {
      this.species[i].fitness = this.species[i].score / totalScore;
    }
  }

  createNewGeneration() {
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

    return newGeneration;
  }

  evolve() {
    const genHighscore = this.calcGenerationHighScore();
    this.calcFitness();
    const newGeneration = this.createNewGeneration();

    for (let i = 0; i < this.initialPopulation; i++) {
      this.species[i].kill();
    }

    this.species = newGeneration;
    for (let i = 0; i < this.initialPopulation; i++) {
      this.species[i].resurrect();
    }

    this.dispatchCounters(genHighscore.toFixed(5));
    this.dispatchPopulationChanges();
  }

  dispatchCounters(genHighscore = null) {
    dispatchEvent('tob-bar-stats', {
      generation: this.generation,
      highScore: this.highScore.toFixed(5),
      highScorePerGen: genHighscore || this.highScore.toFixed(5),
      avgScore: this.avgScore.toFixed(5),
      population: this.population,
      progress: this.progress.toFixed(5),
      sources: this.foodSources,
    });
  }

  dispatchPopulationChanges() {
    dispatchEvent('population-changes', { species: this.species });
  }

  remove(id) {
    this.species[id].kill();
    this.species.splice(id, 1);
    this.refreshPopulation();
  }

  refreshPopulation() {
    this.species.forEach((specie, index) => specie.setIndex(index));
    this.population = this.species.length;
  }

  rateGeneration() {
    const genHighscore = this.calcGenerationHighScore();
    this.calcFitness();
    this.dispatchCounters(genHighscore.toFixed(5));
    this.dispatchPopulationChanges();
  }
}
