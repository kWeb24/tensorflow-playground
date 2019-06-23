import FitnessChart from './FitnessChart';
import GenotypeMapChart from './GenotypeMapChart';

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

    this.populationList = document.querySelector('.sidebar__populationList');

    if (
      !this.generation ||
      !this.highScore ||
      !this.avgScore ||
      !this.population ||
      !this.epochLength ||
      !this.mutationRate ||
      !this.progress ||
      !this.populationList
    ) {
      return false;
    }

    this.fragment = document.createDocumentFragment();
    this.liPrefab = document.createElement('li');
    this.liPrefab.classList.add('sidebar__pop');

    this.fitnessChart = new FitnessChart();
    this.genotypeMapChart = new GenotypeMapChart();

    return true;
  }

  setupEvents() {
    window.addEventListener('tob-bar-stats', (e) => this.updateBar(e.detail));
    window.addEventListener('epoch-length', (e) => {
      this.epochLength.innerText = e.detail.epochLength;
    });
    window.addEventListener('mutation-rate', (e) => {
      this.mutationRate.innerText = e.detail.mutationRate;
    });
    window.addEventListener('population-changes', (e) => this.updatePopulationMatrix(e));
  }

  updateBar(data) {
    this.generation.innerText = data.generation;
    this.highScore.innerText = data.highScore;
    this.avgScore.innerText = data.avgScore;
    this.population.innerText = data.population;
    this.progress.innerText = data.progress;
  }

  updatePopulationMatrix(e) {
    this.fragment = document.createDocumentFragment();
    this.populationList.innerHTML = '';
    e.detail.species.forEach((specie) => {
      const item = this.liPrefab.cloneNode(true, true);
      if (specie.parents.length && specie.alive) {
        item.classList.add('sidebar__pop--child');
      } else if (!specie.alive) {
        item.classList.add('sidebar__pop--dead');
      }
      this.fragment.append(item);
    });
    this.populationList.append(this.fragment);
  }
}
