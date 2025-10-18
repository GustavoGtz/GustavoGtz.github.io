// TODO:
// Keep adding the elements to be loaded

/* FONTS */
import c64FontPng from '../assets/fonts/commodoreFont.png';
import c64FontXml from '../assets/fonts/commodoreFont.xml';

/* SPRITES */
import tutorial from '../assets/sprites/simples/Tutorial.png';

/* SPRITESHEETS */
import firmin from '../assets/sprites/multiples/Firmin.png';
import subwayTransition from '../assets/sprites/multiples/SubwayTransition.png';

/* TILEMAP AND TILESET */
import subwayStationTileset from '../assets/tilemaps/SubwayStationTileset.png'
import subwayStationTilemap from '../assets/tilemaps/SubwayStationTilemap.json'


export default class Loader extends Phaser.Scene {
  constructor() {
    super("Loader");
  }

  preload() {
    this.createLoadingScreen();
    this.setLoadEvents();
    this.loadFonts();
    this.loadAudios();
    this.loadSprites();
    this.loadSpriteSheets();
    this.loadTilemaps();
  }

  createLoadingScreen(){
  }

  setLoadEvents(){
    this.load.on(
      "complete",
      () => {
        this.scene.start("Terminal");
      },
      this);
  }

  loadFonts(){
    this.load.bitmapFont('c64', c64FontPng, c64FontXml);

  }

  loadAudios(){
  }

  loadSprites(){
    this.load.image("tutorial", tutorial); 
  }

  loadSpriteSheets(){
    this.load.spritesheet("firmin", firmin, {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("subwayTransition", subwayTransition, {
      frameWidth: 800,
      frameHeight: 220,
    });
  }

  loadTilemaps(){
    this.load.image('subwayStationTileset', subwayStationTileset);    
    this.load.tilemapTiledJSON('subwayStationTilemap', subwayStationTilemap);
  }
}
