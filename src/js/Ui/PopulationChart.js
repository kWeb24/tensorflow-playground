import Chart from 'chart.js';

export default class PopulationChart {
  constructor() {
    if (!this.vars()) return false;
    this.setupEvents();
  }

  vars() {
    this.canvas = document.getElementById('sidebar__population');

    if (!this.canvas) return false;

    this.canvas.height = 150;

    this.config = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Population',
            backgroundColor: '#f58a42',
            borderColor: '#f58a42',
            data: [],
            fill: false,
          },
          {
            label: 'Foods',
            backgroundColor: '#41f0db',
            borderColor: '#41f0db',
            data: [],
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 10,
            boxWidth: 10,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            borderWidth: 1,
          },
        },
      },
    };

    Chart.defaults.global.defaultFontColor = '#fff';
    Chart.defaults.scale.gridLines.color = '#848484';
    this.chart = new Chart(this.canvas.getContext('2d'), this.config);
    return true;
  }

  setupEvents() {
    window.addEventListener('tob-bar-stats', (e) => this.addGeneration(e));
  }

  addGeneration(e) {
    const { labels, datasets } = this.config.data;
    labels.push(e.detail.generation);
    datasets[0].data.push(e.detail.population);
    datasets[1].data.push(e.detail.sources);
    this.chart.update();
  }
}
