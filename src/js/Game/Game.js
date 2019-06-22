import Phaser from 'phaser';
import GameScene from './Scenes/Game';

export default class Game extends Phaser.Game {
  constructor() {
    const gameCanvas = document.getElementById('gameCanvas');

    if (!gameCanvas) return false;

    const config = {
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: gameCanvas,
      type: Phaser.CANVAS,
      backgroundColor: '#a8d67e',
      scene: [GameScene],
    };

    super(config);
  }
}
