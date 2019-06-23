import Chart from 'chart.js';

export default class GenotypeMapChart {
  constructor() {
    if (!this.vars()) return false;
    this.setupEvents();
  }

  vars() {
    this.canvas = document.getElementById('sidebar__genotype');

    if (!this.canvas) return false;

    this.canvas.height = 300;

    this.config = {
      type: 'radar',
      data: {
        labels: ['Speed', 'Visibility range', 'Reach range'],
        datasets: [
          {
            label: 'AvgValues',
            backgroundColor: 'rgba(75, 237, 129, 0.3)', // #4bc4ed
            borderColor: '#4bed81',
            pointBackgroundColor: '#4bed81',
            data: [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
            ],
          },
        ],
      },
      options: {
        legend: {
          position: 'top',
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
        scale: {
          ticks: {
            callback: () => '',
            backdropColor: 'rgba(0, 0, 0, 0)',
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
    // window.addEventListener('tob-bar-stats', (e) => this.addGeneration(e));
  }

  addGeneration(e) {
    const { labels, datasets } = this.config.data;
    labels.push(e.detail.generation);
    datasets[0].data.push(e.detail.highScore);
    datasets[1].data.push(e.detail.avgScore);
    this.chart.update();
  }
}
