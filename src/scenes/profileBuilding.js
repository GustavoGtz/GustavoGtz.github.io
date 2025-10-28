// This is gonna be the inside of the main building in Profile Street
// It will show the profile information such as
// name, degree, mail, linkedin
// Inforamton about the project itself.
// Readme???
// Interests

import Firmin from '../gameobjects/firmin.js'
import ScrollableTextBox from '../gameobjects/scrollableTextBox.js'


export default class ProfileBuilding extends Phaser.Scene {
  constructor() {
    super('ProfileBuilding');
  }

  create() {
    this.street = 'profile';

    this.buildProfileBuildingTilemap();
    this.buildFirmin();
    this.buildTelevision();
    this.buildAboutMeMarquee();
    this.buildAboutMeText();
    this.buildContactText();

    this.setBounds();
    this.setExit();
  }

  update() {
    const firminBounds = this.firmin.getBounds();
    const isInsideExitZone = Phaser.Geom.Intersects.RectangleToRectangle(this.exitZone.getBounds(), firminBounds);
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

  buildTelevision() {
    // TODO: Replace this position with the info from the tilmap.
    const posX = 200;
    const posY = 150;

    if (!this.anims.exists('crtTelevision-loop')) {
      this.anims.create({
        key: 'crtTelevision-loop',
        frames: this.anims.generateFrameNumbers('crtTelevision', { start: 0, end: 1 }),
        frameRate: 1,
        repeat: -1 // loop infinito
      });
    }

    const tv = this.add.sprite(posX, posY, 'crtTelevision');
    tv.setDepth(10);
    tv.play('crtTelevision-loop');
  }

  buildAboutMeMarquee() {
    // TODO: Replace this position with the info from the tilmap.
    const posX = 100;
    const posY = 100;

    if (!this.anims.exists('marquee-loop')) {
      this.anims.create({
        key: 'marquee-loop',
        frames: this.anims.generateFrameNumbers('aboutMeMarquee', { start: 0, end: 15 }),
        frameRate: 8,
        repeat: -1 // loop infinito
      });
    }

    const marquee = this.add.sprite(posX, posY, 'aboutMeMarquee');
    marquee.setDepth(10);
    marquee.play('marquee-loop');
  }

  buildAboutMeText() {
    // TODO: Replace this position with the info from the tilmap.

    const framePosX = 300;
    const framePosY = 80;
    const frameHeight = 100;
    const frameWidth = 100;


    const aboutText = `
        Hi, my name is Gustavo Gutierrez Navarro, and I am a computer science graduate.
        I have a strong interest in the art of video games, not only in their artistic expression but also in the possibilities that computers provide to create engaging and memorable experiences.
        Currently, I am focused on expanding my knowledge in video game development using high-level programming techniques, including AI models and algorithms, to discover new ways to enhance gameplay and player experiences.
    `;

    const box = new ScrollableTextBox(
      this,
      framePosX,
      framePosY,
      frameWidth,
      frameHeight,
      aboutText
    );
    box.setDepth(10);
  }

  buildContactText() {
    // TODO: Replace this position with the info from the tilmap.

    const framePosX = 500;
    const framePosY = 150;
    const frameHeight = 50;
    const frameWidth = 300;


    const contactText = `
        https://www.linkedin.com/in/gustavo-gutierrez-navarro-47213a192/.
        https://github.com/GustavoGtz.
        gustavogtznav@gmail.com
    `;

    const box = new ScrollableTextBox(
      this,
      framePosX,
      framePosY,
      frameWidth,
      frameHeight,
      contactText
    );
    box.setDepth(10);
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


  buildProfileBuildingTilemap() {
    this.tilemapSpawnPointX = 0;
    this.tilemapSpawnPointY = 0;

    this.tilemap = this.make.tilemap({key : 'profileBuildingTilemap'});
    this.tileset = this.tilemap.addTilesetImage('ProfileBuildingTileset', 'profileBuildingTileset');

    this.tilemap.createLayer(
      'Background', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(0);

    this.tilemap.createLayer(
      'Cables', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(1);

    this.tilemap.createLayer(
      'Decoration', this.tileset,
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
