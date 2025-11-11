import Firmin from '../gameobjects/firmin.js'

export default class City extends Phaser.Scene {
  constructor() {
    super('City')
  }

  /*
   * data structure
   *
   * street: The street of the city to be shown
   *         It can be:
   *          - art
   *          - profile
   *          - project
   * spawn: Where it's going to spawn the character
   *        It can be:
   *         - subway
   *         - building
   */
  init(data) {
    this.street = data.street || 'profile';
    this.spawn = data.spawn || 'subway';
  }

  create() {
    this.buildCityTilemap();
    this.buildFirmin();
    this.setBounds();
    this.setSubwayStationEntry();
    this.setMainBuildingEntry();
  }

  update() {
    const firminBounds = this.firmin.getBounds();
    const isInsideSubwayStationEntryZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.subwayStationEntryZone.getBounds(),
      firminBounds);
    const isInsideMainBuildingEntryZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.mainBuildingEntryZone.getBounds(),
      firminBounds);
    if (!isInsideSubwayStationEntryZone && !isInsideMainBuildingEntryZone) {
      this.firmin.clearInteraction();
    }
  }

  buildFirmin() {
    let firminSpawnX = 0;
    let firminSpawnY = 0;
    let firminFlipX = false;
    
    switch (this.spawn) {
      case 'building':
        const buildingData = this.tilemap.getObjectLayer('Building Spawn').objects[0];
        firminSpawnX = buildingData.x;
        firminSpawnY = buildingData.y;
        break;
        
      case 'subway':
        const subwayData = this.tilemap.getObjectLayer('Subway Spawn').objects[0];
        firminSpawnX = subwayData.x;
        firminSpawnY = subwayData.y;
        firminFlipX = true;
        break;
      default:
        break;
    }
    
    this.firmin = new Firmin(this, this.tilemapSpawnPointX + firminSpawnX, this.tilemapSpawnPointY + firminSpawnY);
    this.add.existing(this.firmin);
    this.firmin.flipX = firminFlipX;
    this.firmin.setDepth(this.firminLayer);
    this.physics.add.existing(this.firmin);
    this.physics.add.collider(this.firmin, this.contourLayer);
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

  setSubwayStationEntry() {
    const subwayStationEntryData = this.tilemap.getObjectLayer('Subway Entry').objects[0];

    /* Little fix to translate the position from tiled (Top left corner) to Phaser (Center) */
    const subwayStationEntryWidth = subwayStationEntryData.width;
    const subwayStationEntryHeight = subwayStationEntryData.height;
    const subwayStationEntryPosX = subwayStationEntryData.x + subwayStationEntryWidth / 2;
    const subwayStationEntryPosY = subwayStationEntryData.y + subwayStationEntryHeight / 2;

    this.subwayStationEntryZone = this.add.rectangle(
      subwayStationEntryPosX,
      subwayStationEntryPosY,
      subwayStationEntryWidth,
      subwayStationEntryHeight);
    
    this.physics.add.existing(this.subwayStationEntryZone, true);
    this.subwayStationEntryZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.subwayStationEntryZone, (player, zone) => {
      player.setInteraction(() => {
        this.enterSubwayStation();
      });
    }, null, this);
  }

  setMainBuildingEntry() {
    const mainBuildingEntryData = this.tilemap.getObjectLayer('Building Entry').objects[0];

    /* Little fix to translate the position from tiled (Top left corner) to Phaser (Center) */
    const mainBuildingEntryWidth = mainBuildingEntryData.width;
    const mainBuildingEntryHeight = mainBuildingEntryData.height;
    const mainBuildingEntryPosX = mainBuildingEntryData.x + mainBuildingEntryWidth / 2;
    const mainBuildingEntryPosY = mainBuildingEntryData.y + mainBuildingEntryHeight / 2;

    this.mainBuildingEntryZone = this.add.rectangle(
      mainBuildingEntryPosX,
      mainBuildingEntryPosY,
      mainBuildingEntryWidth,
      mainBuildingEntryHeight);
    
    this.physics.add.existing(this.mainBuildingEntryZone, true);
    this.mainBuildingEntryZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.mainBuildingEntryZone, (player, zone) => {
      player.setInteraction(() => {
        this.enterBuilding();
      });
    }, null, this);
  }

  enterSubwayStation() {
    this.scene.start('Transitions', {
      next: 'SubwayStation',
      args: {station: this.street, spawn: 'tunnel'},
      name: 'black',
      duration: 250,
      ui: null,
      entry: 'fade',
      exit: 'fade',
    });
  }
  
  enterBuilding() {
    let nextScene = null;
    switch (this.street) {
      case 'art':
        nextScene = 'ArtBuilding';
        break;
      case 'profile':
        nextScene = 'ProfileBuilding';
        break;
      case 'project':
        nextScene = 'ProjectBuilding';
        break;
      default:
        console.log("Not any valid building");
        return;
    }
    this.firmin.flipX = false;
    this.firmin.anims.play('firmin-enter');

    this.firmin.on('animationcomplete-firmin-enter', () => {
      this.scene.start('Transitions', {
        next: nextScene,
        args: null,
        name: 'black',
        duration: 250,
        ui: null,
        entry: 'fade',
        exit: 'fade'
      });
    }, this);
  }

buildCityTilemap() {
  this.tilemapSpawnPointX = 0;
  this.tilemapSpawnPointY = 0;

  switch(this.street) {  
    case 'art':
      this.tilemap = this.make.tilemap({ key: 'artStreetTilemap' });
      this.tileset = this.tilemap.addTilesetImage('StreetTileset', 'streetTileset');
      break;
    case 'profile':
      this.tilemap = this.make.tilemap({ key: 'profileStreetTilemap' });
      this.tileset = this.tilemap.addTilesetImage('StreetTileset', 'streetTileset');
      break;
    case 'project':
      console.log("This street is not implemented yet");
      this.tilemap = this.make.tilemap({ key: 'projectStreetTilemap' });
      this.tileset = this.tilemap.addTilesetImage('StreetTileset', 'streetTileset');
      break;
    default:
      console.log('Unknown street:', this.street);
      break;
  }

  this.tilemap.createLayer(
    'Background', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(0);

  this.tilemap.createLayer(
    'Buildings Background', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(1);

  this.tilemap.createLayer(
    'Buildings', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(2);

  this.tilemap.createLayer(
    'Decoration', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(3);

  this.tilemap.createLayer(
    'Subway Entry Back', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(4);

  this.firminLayer = 7;

  this.tilemap.createLayer(
    'Subway Entry Front', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(10);
  
  this.contourLayer = this.tilemap.createLayer(
    'Contour', this.tileset,
    this.tilemapSpawnPointX, this.tilemapSpawnPointY
  ).setDepth(5);
  this.contourLayer.setCollisionByProperty({ collides: true });
}
}

