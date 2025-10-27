import './style.css'
import Phaser from 'phaser';
import Loader from './scenes/loader.js';
import Terminal from './scenes/terminal.js';
import Transitions from './scenes/transitions.js';
import Esc from './scenes/esc.js';
import SubwayStation from './scenes/subwayStation.js';
import City from './scenes/city.js';
import ArtBuilding from './scenes/artBuilding.js';
import ProfileBuilding from './scenes/profileBuilding.js';
import ProjectBuilding from './scenes/projectBuilding.js';


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
      gravity: { y: 200 },
      debug: true
    }
  },
  scene:[Loader,
         Terminal,
         Transitions,
         Esc,
         SubwayStation,
         City,
         ArtBuilding,
         ProfileBuilding,
         ProjectBuilding,
  ]
}

const game = new Phaser.Game(config);
