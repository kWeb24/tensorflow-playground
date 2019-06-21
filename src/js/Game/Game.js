import Phaser from 'phaser';

export default class Game extends Phaser.Game {
  constructor() {
    const gameCanvas = document.getElementById('gameCanvas');

    if (!gameCanvas) return false;

    const config = {
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: gameCanvas,
      type: Phaser.CANVAS,
    };

    super(config);
  }
}
