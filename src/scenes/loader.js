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
import teleportTransition from '../assets/sprites/multiples/TeleportTransition.png';
import escButtons from '../assets/sprites/multiples/EscButtons.png';
import escBackground from '../assets/sprites/multiples/EscBackground.png';
import stationSelectorButtons from '../assets/sprites/multiples/StationSelectorButtons.png';
import aboutMeMarquee from '../assets/sprites/multiples/AboutMeMarquee.png';
import crtTelevision from '../assets/sprites/multiples/CrtTelevision.png';
import signsTexts from '../assets/sprites/multiples/SignsTexts.png';

/* TILEMAP AND TILESET */
import subwayStationTileset from '../assets/tilemaps/SubwayStationTileset.png'
import streetTileset from '../assets/tilemaps/StreetTileset.png'
import artBuildingTileset from '../assets/tilemaps/ArtBuildingTileset.png'
import profileBuildingTileset from '../assets/tilemaps/ProfileBuildingTileset.png'
import projectBuildingTileset from '../assets/tilemaps/ProjectBuildingTileset.png'

import subwayStationTilemap from '../assets/tilemaps/SubwayStationTilemap.json'
import artStreetTilemap from '../assets/tilemaps/ArtStreetTilemap.json'
import profileStreetTilemap from '../assets/tilemaps/ProfileStreetTilemap.json'
import projectStreetTilemap from '../assets/tilemaps/ProjectStreetTilemap.json'
import artBuildingTilemap from '../assets/tilemaps/ArtBuildingTilemap.json'
import profileBuildingTilemap from '../assets/tilemaps/ProfileBuildingTilemap.json'
import projectBuildingTilemap from '../assets/tilemaps/ProjectBuildingTilemap.json'

/* ART SLIDES */
import caveBackground from '../assets/sprites/artslides/CaveBackground.png'
import boss from '../assets/sprites/artslides/Boss.png'
import cursorBase from '../assets/sprites/artslides/CursorBase.png'
import cursorDelete from '../assets/sprites/artslides/CursorDelete.png'
import cursorSelect from '../assets/sprites/artslides/CursorSelect.png'
import gus from '../assets/sprites/artslides/Gus.png'
import tree from '../assets/sprites/artslides/Tree.png'
import mushroom from '../assets/sprites/artslides/Mushroom.png'
import machine from '../assets/sprites/artslides/Machine.png'
import bomb from '../assets/sprites/artslides/Bomb.png'
import pig from '../assets/sprites/artslides/Pig.png'
import drill from '../assets/sprites/artslides/Drill.png'
import musicUI from '../assets/sprites/artslides/MusicUI.png'
import spikeIllustration from '../assets/sprites/artslides/SpikeIllustration.png'
import wolfBackground from '../assets/sprites/artslides/WolfBackground.png'
import draculaBird from '../assets/sprites/artslides/DraculaBird.png'
import loveBirds from '../assets/sprites/artslides/LoveBirds.png'

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
    this.load.image("caveBackground", caveBackground);
    this.load.image("wolfBackground", wolfBackground);
    this.load.image("spikeIllustration", spikeIllustration)
    this.load.image("cursorBase", cursorBase);
    this.load.image("cursorSelect", cursorSelect);
    this.load.image("cursorDelete", cursorDelete);

    this.load.image("draculaBird", draculaBird);
    this.load.image("loveBirds", loveBirds);
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
    this.load.spritesheet("teleportTransition", teleportTransition, {
      frameWidth: 224,
      frameHeight: 160,
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
    this.load.spritesheet("boss", boss, {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("gus", gus, {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("tree", tree, {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("mushroom", mushroom, {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("machine", machine, {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("bomb", bomb, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("pig", pig, {
      frameWidth: 30,
      frameHeight: 30
    });
    this.load.spritesheet("drill", drill, {
      frameWidth: 64,
      frameHeight: 32
    });
    this.load.spritesheet("musicUi", musicUI, {
      frameWidth: 160,
      frameHeight: 77
    });
    this.load.spritesheet("signsTexts", signsTexts, {
      frameWidth: 48,
      frameHeight: 16
    });
  }

  loadTilemaps(){
    /* Tilesets */
    this.load.image('subwayStationTileset', subwayStationTileset);   
    this.load.image('streetTileset', streetTileset)
    this.load.image('artBuildingTileset', artBuildingTileset);
    this.load.image('profileBuildingTileset', profileBuildingTileset);
    this.load.image('projectBuildingTileset', projectBuildingTileset);

    /* Tilemaps */
    this.load.tilemapTiledJSON('subwayStationTilemap', subwayStationTilemap);
    this.load.tilemapTiledJSON('artStreetTilemap', artStreetTilemap);
    this.load.tilemapTiledJSON('profileStreetTilemap', profileStreetTilemap);
    this.load.tilemapTiledJSON('projectStreetTilemap', projectStreetTilemap);  
    this.load.tilemapTiledJSON('artBuildingTilemap', artBuildingTilemap);
    this.load.tilemapTiledJSON('profileBuildingTilemap', profileBuildingTilemap);
    this.load.tilemapTiledJSON('projectBuildingTilemap', projectBuildingTilemap);
  }
}
