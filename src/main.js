import './style.css'
import Phaser from 'phaser';
import Loader from './scenes/loader.js';
import Terminal from './scenes/terminal.js';
import Transitions from './scenes/transitions.js';
import TrainStation from './scenes/trainStation.js';

import testImg from './assets/img.png';

class GameScene extends Phaser.Scene {
  constructor(){
    super("scene-game")
  }

  preload(){
    this.load.image("test", testImg)
  }
  create(){
    this.add.image(50, 50, "test").setOrigin(0, 0)
  }
  update(){}
}

const screen = {
  width: 640,
  height: 360,
}

const config = {
  type: Phaser.WEBGL,
  width: screen.width,
  height: screen.height,
  pixelArt: true,
  roundPixels: true,
  canvas: gameCanvas,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y:300 },
      debug: true
    }
  },
  scene:[Loader,
         Terminal,
         Transitions,
         TrainStation]
}

const game = new Phaser.Game(config);
