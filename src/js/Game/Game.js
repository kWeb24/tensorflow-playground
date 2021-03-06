import Phaser from 'phaser';
import GameScene from './Scenes/GameScene';

export default class Game extends Phaser.Game {
  constructor() {
    const gameCanvas = document.getElementById('gameCanvas');
    const header = document.querySelector('.topBar');
    const sidebar = document.querySelector('.sidebar');

    if (!gameCanvas || !header || !sidebar) return false;

    const config = {
      width: window.innerWidth - sidebar.getBoundingClientRect().width,
      height: window.innerHeight - header.getBoundingClientRect().height,
      canvas: gameCanvas,
      type: Phaser.CANVAS,
      backgroundColor: '#a8d67e',
      physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
            x: 0,
            y: 0,
          },
        },
      },
      scene: [GameScene],
    };

    super(config);
  }
}
