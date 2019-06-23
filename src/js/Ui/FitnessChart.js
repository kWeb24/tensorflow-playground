import Chart from 'chart.js';

export default class FitnessChart {
  constructor() {
    if (!this.vars()) return false;
    this.setupEvents();
  }

  vars() {
    this.canvas = document.getElementById('sidebar__fitness');

    if (!this.canvas) return false;

    this.canvas.height = 150;

    this.config = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'HighScore',
            backgroundColor: '#4bed81',
            borderColor: '#4bed81',
            data: [],
            fill: false,
          },
          {
            label: 'AvgScore',
            backgroundColor: '#4bc4ed',
            borderColor: '#4bc4ed',
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
    datasets[0].data.push(e.detail.highScorePerGen);
    datasets[1].data.push(e.detail.avgScore);
    this.chart.update();
  }
}
