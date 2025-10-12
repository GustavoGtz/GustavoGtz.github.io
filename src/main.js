import './style.css'

import Phaser, { Physics } from 'phaser'

class GameScene extends Phaser.Scene {
  constructor(){
    super("scene-game")
  }

  preload(){
    this.load.image("bg", "assets/img.png")
  }
  create(){
    this.add.image(0, 0, "bg")
  }
  update(){}
}

const config = {
  type: Phaser.WEBGL,
  width: 500,
  height: 500,
  canvas: gameCanvas,
  Physics: {
    default: 'arcade',
    arcade: {
      gravity: { y:300 },
      debug: true
    }
  },
  scene:[GameScene]
}

const game = new Phaser.Game(config);