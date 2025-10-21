// This will be the scene where ALL the subway stations will be.
// Its very similar in structure but
// Acordin to a "string" it will change little thinks
// like the decoration and the exit.

import Firmin from '../gameobjects/firmin.js'
import Subway from '../gameobjects/subway.js'

export default class SubwayStation extends Phaser.Scene {
  constructor() {
    super('SubwayStation');
  }

  /*
   * data structure
   *
   * station: The station of subway to spawn
   * spawn: Where it's going to spawn the character
   *        It can be:
   *         - tunnel
   *         - subway
  */
  init(data) {
    this.station = data.station || 'profile';
    this.spawn = data.spawn || 'subway';
  }

  create() {

    this.buildSubwayStationTilemap();
    this.buildFirmin();
    // Not working at all
    this.buildSubway();
    this.buildStairs();
    this.setBounds();
    this.setExit();
  }

  buildFirmin(){
    let firminSpawnX = 0;
    let firminSpawnY = 0;

    switch (this.spawn) {
      case 'tunnel':
        const tunnelData = this.tilemap.getObjectLayer('Tunnel Spawn').objects[0];
        firminSpawnX = tunnelData.x;
        firminSpawnY = tunnelData.y;
        break;
        
      case 'subway':
        const subwayData = this.tilemap.getObjectLayer('Subway Spawn').objects[0];
        firminSpawnX = subwayData.x;
        firminSpawnY = subwayData.y;
        break;
      default:
        break;
    }

    this.firmin = new Firmin(this,
                             this.tilemapSpawnPointX + firminSpawnX,
                             this.tilemapSpawnPointY + firminSpawnY,
                             this.firminLayer);
    this.physics.add.existing(this.firmin);
    this.physics.add.collider(this.firmin, this.contourLayer);
  }

  buildSubway() {
    //this.setSubwayEntry();
    //this.subway = new Subway(this, 0, 100);
    //this.subway.setDepth(this.subwayLayer);
  }

  /* Hardcoded way to implement stairs without 
     implementing more complex things like a slope movement */
  buildStairs() {
    const startX = 650; /* HardCoded Value */
    const startY = 222; /* HardCoded Value */
    const stairWidth = 3;
    const stairHeight = 4;
    const stepsNumber = 24;
 
    const stairs = this.physics.add.staticGroup();
    for (let i = 0; i < stepsNumber; i++) {
      const step = this.add.rectangle(
        startX + i * stairWidth, 
        startY - i * stairHeight, 
        stairWidth, 
        stairHeight, 
        0x000000);
      this.physics.add.existing(step, true);
      stairs.add(step);
    }
    stairs.fillAlpha = 0;
    this.physics.add.collider(this.firmin, stairs);
  }

  setBounds() {
    const spawnX = this.tilemapSpawnPointX;
    const spawnY = this.tilemapSpawnPointY;

    const tileWidth = this.tilemap.tileWidth;
    const tileHeight = this.tilemap.tileHeight;

    const mapWidth = this.tilemap.width * tileWidth;
    const mapHeight = this.tilemap.height * tileHeight;

    const marginTiles = 1;

    const worldOrginX = spawnX - marginTiles * tileWidth;
    const worldOriginY = spawnY - marginTiles * tileHeight;
    
    const worldWidth = mapWidth + 2 * marginTiles * tileWidth;
    const worldHeight = mapHeight + 2 * marginTiles * tileHeight;

    this.cameras.main.setBounds(
      worldOrginX, 
      worldOriginY, 
      worldWidth, 
      worldHeight
    );
    this.physics.world.setBounds(
      spawnX, 
      spawnY, 
      mapWidth, 
      mapHeight
    );
  }

  setExit() {
    // By somehow we obtained the correct position
    // for the moment we gonna say its a const variable
    const exitPosX = 700;
    const exitPosY = 100;
    const exitWidth = 32;
    const exitHeight = 64;

    this.exitZone = this.add.rectangle(exitPosX,
                                        exitPosY,
                                        exitWidth,
                                        exitHeight);
    this.physics.add.existing(this.exitZone, true);
    this.exitZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.exitZone, (player, zone) => {
      player.setInteraction(() => {
        this.exitStation();
      });
    }, null, this);
  }
  
  exitStation() {
    this.scene.start('Transitions', {
      next: 'City',
      args: {street: this.station , spawn: 'subway'},
      name: 'black',
      duration: 500,
      ui: null,
      entry: 'fade',
      exit: 'fade'
    }
    )
  }

  buildSubwayStationTilemap() {
    this.tilemapSpawnPointX = 0;
    this.tilemapSpawnPointY = 0;

    this.tilemap = this.make.tilemap({ key: 'subwayStationTilemap' });
    this.tileset = this.tilemap.addTilesetImage('SubwayStationTileset', 'subwayStationTileset');

    this.tilemap.createLayer(
      'Station Background', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(0);

    this.tilemap.createLayer(
      'Station Background Decoration', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(1);

    this.subwlayLayer = 2;

    this.tilemap.createLayer(
      'Columns', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(3);

    this.tilemap.createLayer(
      'Tunnel Background 2', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(4);

    this.tilemap.createLayer(
      'Tunnel Background 1', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(5);

    this.tilemap.createLayer(
      'Tunnel Decoration', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(6);


    this.firminLayer = 8;

    this.tilemap.createLayer(
      'Tunnel Exit', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(9);

    this.tilemap.createLayer(
      'Tunnel Exit Decoration', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(10);

    // We only save this layer because its the important one
    this.contourLayer = this.tilemap.createLayer(
      'Contour', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(7);
    this.contourLayer.setCollisionByProperty({ collides: true });
  }

  update() {
    let firminBounds = this.firmin.getBounds();
    
    let isInsideExitZone = Phaser.Geom.Intersects.RectangleToRectangle(this.exitZone.getBounds(), firminBounds);
    if (!isInsideExitZone) { this.firmin.clearInteraction(); }
    
    // The same with other like subwayentryzone
  }
}
