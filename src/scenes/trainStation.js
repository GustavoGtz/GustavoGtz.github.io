// This will be the scene where ALL the subway stations will be.
// Its very similar in structure but
// Acordin to a "string" it will change little thinks
// like the decoration and the exit.

import Firmin from '../gameobjects/firmin.js'

export default class TrainStation extends Phaser.Scene {
  constructor() {
    super('TrainStation');
  }

  /*
   * data structure
   *
   * station: The station of subway to spawn
   * spawn: Where it's going to spawn the character
   *        It can be:
   *         - subway
   *         - exitDoor
  */
  init(data) {
    this.station = data.station || 'profile';
    this.spawn = data.spawn || 'subway';
  }

  create() {
    this.tilemapSpawnPointX = 0;
    this.tilemapSpawnPointY = 30;

    this.buildSubwayStationTilemap();
    this.buildFirmin();
    this.buildCameraSettings();

    //this.firmin = new Firmin(this, 100, 100);
    //this.add.existing(this.firmin);
    //this.physics.add.existing(this.firmin);

    //this.physics.add.collider(this.firmin, contourLayer);
  }

  buildFirmin(){
    this.firmin = new Firmin(this, 100, 100);
    this.add.existing(this.firmin);
    this.physics.add.existing(this.firmin);
    this.firmin.setDepth(7);
    this.physics.add.collider(this.firmin, this.contourLayer);
  }

  buildCameraSettings() {
    this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.firmin);
    //this.cameras.main.setLerp(0.1, 0.1); Delay
    this.cameras.main.setZoom(2);
    this.cameras.main.followOffset.set(0, 0);
  }

  buildSubwayStationTilemap() {
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

    this.tilemap.createLayer(
      'Columns', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(2);

    this.tilemap.createLayer(
      'Tunnel Background 2', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(3);

    this.tilemap.createLayer(
      'Tunnel Background 1', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(4);

    this.tilemap.createLayer(
      'Tunnel Decoration', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(6);

    // The 8 layer is reserved for the character

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
    ).setDepth(5);
    this.contourLayer.setCollisionByProperty({ collides: true });
  }
}
