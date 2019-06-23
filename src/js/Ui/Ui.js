export default class Ui {
  constructor() {
    if (this.vars()) {
      this.setupEvents();
    }
  }

  vars() {
    this.selectors = {
      id: {
        generation: 'generation',
        highScore: 'highScore',
        avgScore: 'avgScore',
        population: 'population',
        epochLength: 'epochLength',
        mutationRate: 'mutationRate',
        progress: 'progress',
      },
    };

    this.generation = document.getElementById(this.selectors.id.generation);
    this.highScore = document.getElementById(this.selectors.id.highScore);
    this.avgScore = document.getElementById(this.selectors.id.avgScore);
    this.population = document.getElementById(this.selectors.id.population);
    this.epochLength = document.getElementById(this.selectors.id.epochLength);
    this.mutationRate = document.getElementById(this.selectors.id.mutationRate);
    this.progress = document.getElementById(this.selectors.id.progress);

    if (
      !this.generation ||
      !this.highScore ||
      !this.avgScore ||
      !this.population ||
      !this.epochLength ||
      !this.mutationRate ||
      !this.progress
    ) {
      console.log('killin');
      return false;
    }

    return true;
  }

  setupEvents() {
    console.log('dupa');
  }
}
