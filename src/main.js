import './style.css'
import testImg from './assets/img.png';

import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor(){
    super("scene-game")
  }

  preload(){
    this.load.image("test", testImg)
  }
  create(){
    this.add.image(0, 0, "test")
  }
  update(){}
}

const config = {
  type: Phaser.WEBGL,
  width: 500,
  height: 500,
  canvas: gameCanvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y:300 },
      debug: true
    }
  },
  scene:[GameScene]
}

const game = new Phaser.Game(config);