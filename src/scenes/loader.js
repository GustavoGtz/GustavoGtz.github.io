// TODO:
// Keep adding the elements to be loaded

/* FONTS */
import c64FontPng from '../assets/fonts/commodoreFont.png';
import c64FontXml from '../assets/fonts/commodoreFont.xml';

/* SPRITES */
import eButton from '../assets/sprites/simples/EButton.png';
import tutorial from '../assets/sprites/simples/Tutorial.png';
import escMenuSelection from '../assets/sprites/simples/EscMenuSelection.png';

/* SPRITESHEETS */
import firmin from '../assets/sprites/multiples/Firmin.png';
import subway from '../assets/sprites/multiples/Subway.png';
import subwayBack from '../assets/sprites/multiples/SubwayBack.png';
import subwayTransition from '../assets/sprites/multiples/SubwayTransition.png';
import escMenuButtons from '../assets/sprites/multiples/EscMenuButtons.png';
import escMenuBackground from '../assets/sprites/multiples/EscMenuBackground.png';

/* TILEMAP AND TILESET */
import subwayStationTileset from '../assets/tilemaps/SubwayStationTileset.png'
import subwayStationTilemap from '../assets/tilemaps/SubwayStationTilemap.json'
import streetTileset from '../assets/tilemaps/StreetTileset.png'
import artStreetTilemap from '../assets/tilemaps/ArtStreetTilemap.json'
import projectStreetTilemap from '../assets/tilemaps/ProjectStreetTilemap.json'
import profileStreetTilemap from '../assets/tilemaps/ProfileStreetTilemap.json'


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
    this.load.image("eButton", eButton); 
    this.load.image("tutorial", tutorial); 
    this.load.image("escMenuSelection", escMenuSelection);
  }

  loadSpriteSheets(){
    this.load.spritesheet("firmin", firmin, {
      frameWidth: 40,
      frameHeight: 40,
    });
     this.load.spritesheet("subway", subway, {
       frameWidth: 320,
       frameHeight: 112,
     });
    this.load.spritesheet("subwayBack", subwayBack, {
      frameWidth: 320,
      frameHeight: 112
    });
    this.load.spritesheet("subwayTransition", subwayTransition, {
      frameWidth: 800,
      frameHeight: 220,
    });
    this.load.spritesheet("escMenuButtons", escMenuButtons, {
      frameWidth: 112,
      frameHeight: 16,
    })
    this.load.spritesheet("escMenuBackground", escMenuBackground, {
      frameWidth: 224,
      frameHeight: 160,
    })
  }

  loadTilemaps(){
    /* Tilesets */
    this.load.image('subwayStationTileset', subwayStationTileset);   
    this.load.image('streetTileset', streetTileset) 

    /* Tilemaps */
    this.load.tilemapTiledJSON('subwayStationTilemap', subwayStationTilemap);
    this.load.tilemapTiledJSON('artStreetTilemap', artStreetTilemap);
    this.load.tilemapTiledJSON('projectStreetTilemap', projectStreetTilemap);
    this.load.tilemapTiledJSON('profileStreetTilemap', profileStreetTilemap);
  }
}
