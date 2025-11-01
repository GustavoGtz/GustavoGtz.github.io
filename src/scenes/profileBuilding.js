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
    this.buildContactMeText();

    this.setBounds();
    this.setExit();
  }

  update() {
    const firminBounds = this.firmin.getBounds();
    
    const isInsideExitZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.exitZone.getBounds(),
      firminBounds);
    const isInsideAboutMeZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.aboutMeZone.getBounds(),
      firminBounds);
    const isInsideContactMeZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.contactMeZone.getBounds(),
      firminBounds);
    
    if (!isInsideExitZone &&
        !isInsideAboutMeZone &&
        !isInsideContactMeZone) { this.firmin.clearInteraction(); }
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
    if (!this.anims.exists('crtTelevision-loop')) {
      this.anims.create({
        key: 'crtTelevision-loop',
        frames: this.anims.generateFrameNumbers('crtTelevision', { start: 0, end: 1 }),
        frameRate: 1,
        repeat: -1
      });
    }
    
    const tvData = this.tilemap.getObjectLayer('Television').objects[0];
    /* Little fix to translate the position from tiled (Top left corner) to Phaser (Center) */
    const tvPosX = tvData.x + tvData.width / 2;
    const tvPosY = tvData.y + tvData.height / 2;

    const tv = this.add.sprite(tvPosX, tvPosY, 'crtTelevision').setDepth(3);
    tv.play('crtTelevision-loop');
  }

  buildAboutMeMarquee() {
    if (!this.anims.exists('marquee-loop')) {
      this.anims.create({
        key: 'marquee-loop',
        frames: this.anims.generateFrameNumbers('aboutMeMarquee', { start: 0, end: 15 }),
        frameRate: 8,
        repeat: -1
      });
    }
    
    const marqueeData = this.tilemap.getObjectLayer('Marquee').objects[0];
    /* Little fix to translate the position from tiled (Top left corner) to Phaser (Center) */
    const marqueePosX = marqueeData.x + marqueeData.width / 2;
    const marqueePosY = marqueeData.y + marqueeData.height / 2;

    const marquee = this.add.sprite(marqueePosX, marqueePosY, 'aboutMeMarquee').setDepth(3);
    marquee.play('marquee-loop');
  }

  buildAboutMeText() {
    const aboutMeText = `
        Hi, my name is Gustavo Gutierrez Navarro, and I am a computer science graduate from Mexico.
        I have a strong interest in the art of video games, not only in their artistic expression but also in
        the possibilities that computers provide to create engaging and memorable experiences.
        Currently, I am focused on expanding my knowledge in video game development using high-level programming
        techniques, including AI models and algorithms, to discover new ways to enhance gameplay and player experiences. 

        Thanks for exploring my portfolio, if you haven't seen yet, you can check my art and project sections
        in this game experience I created! :D
    `;
    
    const aboutMeData = this.tilemap.getObjectLayer('About Me Text').objects[0];
    
    const aboutMeFrameWidth = aboutMeData.width;
    const aboutMeFrameHeight = aboutMeData.height;
    const aboutMeFramePosX = aboutMeData.x;
    const aboutMeFramePosY = aboutMeData.y;
    
    const aboutMe = new ScrollableTextBox(
      this,
      aboutMeFramePosX,
      aboutMeFramePosY,
      aboutMeFrameWidth,
      aboutMeFrameHeight,
      aboutMeText
    ).setDepth(8);

    /* FullScreen readable ui */

    /* REPLACE FOR DATA OBJECT IN TILED*/
    const aboutMeZoneWidth = 150;
    const aboutMeZoneHeight = 100;
    const aboutMeZonePosX = 430;
    const aboutMeZonePosY = 200;
    
    this.aboutMeZone = this.add.rectangle(
      aboutMeZonePosX,
      aboutMeZonePosY,
      aboutMeZoneWidth,
      aboutMeZoneHeight,
    );
    
    this.physics.add.existing(this.aboutMeZone, true);
    this.aboutMeZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.aboutMeZone, (player, zone) => {
      player.setInteraction(() => {
        this.scene.sleep();
        this.scene.launch('FullscreenText', { text: aboutMeText, from: this.scene.key });
      }, false);
    }, null, this); 
  }
  
  buildContactMeText() {
    const contactMeText = `
        Feel free to contact me at any time by email or linkedin!
        gustavogtznav@gmail.com
        https://www.linkedin.com/in/gustavo-gutierrez-navarro-47213a192

        You can also find on my Github:
        https://github.com/GustavoGtz
    `;
    
    const contactMeData = this.tilemap.getObjectLayer('Contact Text').objects[0];

    const contactMeWidth = contactMeData.width;
    const contactMeHeight = contactMeData.height;
    const contactMePosX = contactMeData.x;
    const contactMePosY = contactMeData.y;
    
    const contactMe = new ScrollableTextBox(
      this,
      contactMePosX,
      contactMePosY,
      contactMeWidth,
      contactMeHeight,
      contactMeText
    ).setDepth(3);

    /* FullScreen readable ui */

    /* REPLACE FOR DATA OBJECT IN TILED*/
    const contactMeZoneWidth = 100;
    const contactMeZoneHeight = 100;
    const contactMeZonePosX = 660;
    const contactMeZonePosY = 200;
    
    this.contactMeZone = this.add.rectangle(
      contactMeZonePosX,
      contactMeZonePosY,
      contactMeZoneWidth,
      contactMeZoneHeight
    );
    
    this.physics.add.existing(this.contactMeZone, true);
    this.contactMeZone.setVisible(false);

    this.physics.add.overlap(this.firmin, this.contactMeZone, (player, zone) => {
      player.setInteraction(() => {
        this.scene.sleep();
        this.scene.launch('FullscreenText', { text: contactMeText, from: this.scene.key });
      }, false);
    }, null, this); 
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
