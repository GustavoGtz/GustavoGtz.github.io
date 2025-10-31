import Firmin from '../gameobjects/firmin.js'

export default class ArtBuilding extends Phaser.Scene {
  constructor() {
    super('ArtBuilding');
  }

  create() {
    this.street = 'art';

    this.buildArtBuildingTilemap();
    this.buildFirmin();

    this.setBounds();
    this.setExit();
  }

  update() {
    const firminBounds = this.firmin.getBounds();
    
    const isInsideExitZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.exitZone.getBounds(),
      firminBounds);
    
    if (!isInsideExitZone) { this.firmin.clearInteraction(); }
  }
  
  buildFirmin(){
    let firminSpawnX = 0;
    let firminSpawnY = 0;
    let firminFlipX = true;
    
    const spawnData = this.tilemap.getObjectLayer('Spawn').objects[0];
    firminSpawnX = spawnData.x + spawnData.width / 2;
    firminSpawnY = spawnData.y + spawnData.height / 2;

    this.firmin = new Firmin(this,
                             this.tilemapSpawnPointX + firminSpawnX,
                             this.tilemapSpawnPointY + firminSpawnY,
                             this.firminLayer);
    this.physics.add.collider(this.firmin, this.contourLayer);
    this.firmin.flipX = firminFlipX;
  }
  
  setBounds() {
    const spawnX = this.tilemapSpawnPointX;
    const spawnY = this.tilemapSpawnPointY;

    const tileWidth = this.tilemap.tileWidth;
    const tileHeight = this.tilemap.tileHeight;

    const mapWidth = this.tilemap.width * tileWidth;
    const mapHeight = this.tilemap.height * tileHeight;

    const marginTiles = 0;

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
    const exitData = this.tilemap.getObjectLayer('Exit').objects[0];
    /* Little fix to translate the position from tiled (Top left corner) to Phaser (Center) */
    const exitWidth = exitData.width;
    const exitHeight = exitData.height;
    const exitPosX = exitData.x + exitWidth / 2;
    const exitPosY = exitData.y + exitHeight / 2;

    this.exitZone = this.add.rectangle(exitPosX,
                                       exitPosY,
                                       exitWidth,
                                       exitHeight);
    this.physics.add.existing(this.exitZone, true);
    this.exitZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.exitZone, (player, zone) => {
      player.setInteraction(() => {
        this.exitBuilding();
      });
    }, null, this);
    
  }

  exitBuilding() {
    this.firmin.anims.play('firmin-enter');

    this.firmin.on('animationcomplete-firmin-enter', () => {
      this.scene.start('Transitions', {
        next: 'City',
        args: { street: this.street, spawn: 'building' },
        name: 'black',
        duration: 500,
        ui: null,
        entry: 'fade',
        exit: 'fade'
      });
    }, this);
  }


  buildArtBuildingTilemap() {
    this.tilemapSpawnPointX = 0;
    this.tilemapSpawnPointY = 0;

    this.tilemap = this.make.tilemap({key : 'artBuildingTilemap'});
    this.tileset = this.tilemap.addTilesetImage('ArtBuildingTileset', 'artBuildingTileset');

    this.tilemap.createLayer(
      'Background 0', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(0);

    this.tilemap.createLayer(
      'Background 1', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(1);

    this.tilemap.createLayer(
      'Background 2', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(2);

    this.firminLayer = 4;

    this.contourLayer = this.tilemap.createLayer(
      'Contour', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(5);
    this.contourLayer.setCollisionByProperty({collides: true});
    
  }
}
