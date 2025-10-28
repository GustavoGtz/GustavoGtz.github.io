// TODO:
// Keep adding the elements to be loaded

/* FONTS */
import c64FontPng from '../assets/fonts/commodoreFont.png';
import c64FontXml from '../assets/fonts/commodoreFont.xml';

/* SPRITES */
import eButton from '../assets/sprites/simples/EButton.png';
import tutorial from '../assets/sprites/simples/Tutorial.png';
import escMenu from '../assets/sprites/simples/EscMenu.png';
import stationSelectorMenu from '../assets/sprites/simples/StationSelectorMenu.png';

/* SPRITESHEETS */
import firmin from '../assets/sprites/multiples/Firmin.png';
import subway from '../assets/sprites/multiples/Subway.png';
import subwayBack from '../assets/sprites/multiples/SubwayBack.png';
import subwayTransition from '../assets/sprites/multiples/SubwayTransition.png';
import escButtons from '../assets/sprites/multiples/EscButtons.png';
import escBackground from '../assets/sprites/multiples/EscBackground.png';
import stationSelectorButtons from '../assets/sprites/multiples/StationSelectorButtons.png';
import aboutMeMarquee from '../assets/sprites/multiples/AboutMeMarquee.png';
import crtTelevision from '../assets/sprites/multiples/CrtTelevision.png';

/* TILEMAP AND TILESET */
import subwayStationTileset from '../assets/tilemaps/SubwayStationTileset.png'
import streetTileset from '../assets/tilemaps/StreetTileset.png'
import profileBuildingTileset from '../assets/tilemaps/ProfileBuildingTileset.png'

import subwayStationTilemap from '../assets/tilemaps/SubwayStationTilemap.json'
import artStreetTilemap from '../assets/tilemaps/ArtStreetTilemap.json'
import projectStreetTilemap from '../assets/tilemaps/ProjectStreetTilemap.json'
import profileStreetTilemap from '../assets/tilemaps/ProfileStreetTilemap.json'
import profileBuildingTilemap from '../assets/tilemaps/ProfileBuildingTilemap.json'

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
    this.load.image("escMenu", escMenu);
    this.load.image("stationSelectorMenu", stationSelectorMenu);
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
    this.load.spritesheet("escButtons", escButtons, {
      frameWidth: 112,
      frameHeight: 16,
    });
    this.load.spritesheet("escBackground", escBackground, {
      frameWidth: 224,
      frameHeight: 160,
    });
    this.load.spritesheet("stationSelectorButtons", stationSelectorButtons, {
      frameWidth: 144,
      frameHeight: 32,
    });
    this.load.spritesheet("aboutMeMarquee", aboutMeMarquee, {
      frameWidth: 160,
      frameHeight: 16
    });
    this.load.spritesheet("crtTelevision", crtTelevision, {
      frameWidth: 64,
      frameHeight: 48
    });
  }

  loadTilemaps(){
    /* Tilesets */
    this.load.image('subwayStationTileset', subwayStationTileset);   
    this.load.image('streetTileset', streetTileset)
    this.load.image('profileBuildingTileset', profileBuildingTileset);

    /* Tilemaps */
    this.load.tilemapTiledJSON('subwayStationTilemap', subwayStationTilemap);
    this.load.tilemapTiledJSON('artStreetTilemap', artStreetTilemap);
    this.load.tilemapTiledJSON('projectStreetTilemap', projectStreetTilemap);
    this.load.tilemapTiledJSON('profileStreetTilemap', profileStreetTilemap);
    this.load.tilemapTiledJSON('profileBuildingTilemap', profileBuildingTilemap);
  }
}
