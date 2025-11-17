import Firmin from '../gameobjects/firmin.js'
import ArtSlides from '../gameobjects/artSlides.js'

export default class ArtBuilding extends Phaser.Scene {
  constructor() {
    super('ArtBuilding');
  }

  create() {
    this.street = 'art';

    this.buildArtBuildingTilemap();
    this.buildFirmin();

    this.buildProjector();
    this.buildSlides();
    this.setBounds();
    this.setExit();
  }

  update() {
    const firminBounds = this.firmin.getBounds();
    
    const isInsideExitZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.exitZone.getBounds(),
      firminBounds);
    const isInsideProjectorZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.projectorZone.getBounds(),
      firminBounds);
    
    if (!isInsideExitZone &&
        !isInsideProjectorZone) { this.firmin.clearInteraction(); }
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

  buildProjector() {
    const projectorData = this.tilemap.getObjectLayer('Projector').objects[0];
    /* Little fix to translate the position from tiled (Top left corner) to Phaser (Center) */
    const projectorWidth = projectorData.width;
    const projectorHeight = projectorData.height;
    const projectorPosX = projectorData.x + projectorWidth / 2;
    const projectorPosY = projectorData.y + projectorHeight / 2;

    this.projectorZone = this.add.rectangle(projectorPosX,
                                            projectorPosY,
                                            projectorWidth,
                                            projectorHeight);
    this.physics.add.existing(this.projectorZone, true);
    this.projectorZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.projectorZone, (player, zone) => {
      player.setInteraction(() => {
        this.nextSlide(); 
      }, false);
    }, null, this);
  }

  nextSlide() {
    if (!this.projectorSlides) { return }
    this.projectorSlides.nextSlide();
  }
  buildSlides() {
    const projectorAreaData = this.tilemap.getObjectLayer('Projector Area').objects[0];

    const areaWidth = projectorAreaData.width;
    const areaHeight = projectorAreaData.height;
    const areaPosX = projectorAreaData.x;
    const areaPosY = projectorAreaData.y;

    this.projectorSlides = new ArtSlides(this, areaPosX, areaPosY, 20);
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
    this.firmin.flipX = false;
    this.firmin.anims.play('firmin-enter');

    this.firmin.on('animationcomplete-firmin-enter', () => {
      this.scene.start('Transitions', {
        next: 'City',
        args: { street: this.street, spawn: 'building' },
        name: 'black',
        duration: 250,
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
