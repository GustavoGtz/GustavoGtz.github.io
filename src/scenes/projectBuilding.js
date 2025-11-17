import Firmin from '../gameobjects/firmin.js'
import ScrollableTextBox from '../gameobjects/scrollableTextBox.js'

export default class ProjectBuilding extends Phaser.Scene {
  constructor() {
    super('ProjectBuilding');
  }

  create() {
    this.street = 'project';

    this.buildProjectBuildingTilemap();
    this.buildFirmin();
    this.buildOthelloText();
    this.buildBeavertaleText();
    this.setBounds();
    this.setExit();
  }

  update() {
    const firminBounds = this.firmin.getBounds();
    
    const isInsideExitZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.exitZone.getBounds(),
      firminBounds);

    const isInsideOthelloTextZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.othelloTextZone.getBounds(),
      firminBounds);
    
    const isInsideBeavertaleTextZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.beaverTaleTextZone.getBounds(),
      firminBounds);
    
    if (!isInsideExitZone &&
        !isInsideOthelloTextZone &&
        !isInsideBeavertaleTextZone) { this.firmin.clearInteraction(); }
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

  buildOthelloText() {
    const othelloText = `Q-LEARNING WITH OTHELLO
      The initial purpose of this project was to learn how to use unsupervised learning, so I chose
      a simple problem in this field: creating an intelligent agent capable of playing a classic board game.

      I chose the game Othello because of its connection to the story written by William Shakespeare
      and the atmosphere I could bring into the program.

      The project was developed in C, using NCURSES for the TUI (Terminal User Interface). 
      The implementation specifically used TABULAR Q-LEARNING, meaning all the learning data 
      was stored in a CSV file. I recognize that this is not the best approach, nor even a good one,
      but it was a solid starting point to learn and build a first version.

      The program is not fully complete, although it is functional. I plan to create a better version of this project,
      with an improved UI and a small chatbot that will talk to the user while simulating Othello, 
      the king from the tale. Most importantly, I intend to replace the tabular method with Deep Q-Learning 
      to significantly improve the agent’s intelligence.

      The project is available on my GitHub!
    `;

    const othelloTextData = this.tilemap.getObjectLayer('Othello Text').objects[0];
    
    const othelloTextWidth = othelloTextData.width;
    const othelloTextHeight = othelloTextData.height;
    const othelloTextPosX = othelloTextData.x;
    const othelloTextPosY = othelloTextData.y;
        
    const othello = new ScrollableTextBox(
      this,
      othelloTextPosX,
      othelloTextPosY,
      othelloTextWidth,
      othelloTextHeight,
      othelloText
    ).setDepth(3);

    this.othelloTextZone = this.add.rectangle(
      othelloTextPosX + 50,
      othelloTextPosY + 50,
      othelloTextWidth,
      othelloTextHeight
    );
  
    this.physics.add.existing(this.othelloTextZone, true);
    this.othelloTextZone.setVisible(false);
    
    this.physics.add.overlap(this.firmin, this.othelloTextZone, (player, zone) => {
      player.setInteraction(() => {
        this.scene.sleep();
        this.scene.launch('FullscreenText', { text: othelloText, from: this.scene.key });
      }, false);
    }, null, this);
  }

  buildBeavertaleText() {
    const beaverTaleText = `BEAVER TALE: THE VIDEOGAME
      Beaver Tale is my personal project, a 2D pixel art video game developed in Unity. 
      It’s a classic platformer where the goal is to reach point B from point A, but with a little twist. 
      You play as Gus, a beaver. And like a real beaver, you don’t have great physical abilities, 
      but you do have construction knowledge. Using that, you’ll build structures to overcome 
      your lack of jumping or speed.

      This project is a collaborative effort with my partner and two talented friends who are composing the music. 
      I’m responsible for all the game’s art, game design, and product management, as well as some of the marketing 
      and programming, mainly UI elements and a few gameplay mechanics.

      The project is planned for release this December (hopefully :D). 
      You can follow our progress on Instagram at @beavertalegame.
      `;

    const beaverTaleTextData = this.tilemap.getObjectLayer('Beaver Text').objects[0];
    
    const beaverTaleTextWidth = beaverTaleTextData.width;
    const beaverTaleTextHeight = beaverTaleTextData.height;
    const beaverTaleTextPosX = beaverTaleTextData.x;
    const beaverTaleTextPosY = beaverTaleTextData.y;
        
    const beaverTale = new ScrollableTextBox(
      this,
      beaverTaleTextPosX,
      beaverTaleTextPosY,
      beaverTaleTextWidth,
      beaverTaleTextHeight,
      beaverTaleText
    ).setDepth(3);

    this.beaverTaleTextZone = this.add.rectangle(
      beaverTaleTextPosX + 50,
      beaverTaleTextPosY + 50,
      beaverTaleTextWidth,
      beaverTaleTextHeight
    );
  
    this.physics.add.existing(this.beaverTaleTextZone, true);
    this.beaverTaleTextZone.setVisible(false);
    
    this.physics.add.overlap(this.firmin, this.beaverTaleTextZone, (player, zone) => {
      player.setInteraction(() => {
        this.scene.sleep();
        this.scene.launch('FullscreenText', { text: beaverTaleText, from: this.scene.key });
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
    this.firmin.flipX = false;
    this.firmin.anims.play('firmin-enter');
    
    this.firmin.on('animationcomplete-firmin-enter', () => {
      this.scene.start('Transitions', {
        next: 'City',
        args: { street: this.street, spawn: 'building' },
        naText: 'black',
        duration: 250,
        ui: null,
        entry: 'fade',
        exit: 'fade'
      });
    }, this);
  }

  buildProjectBuildingTilemap() {
    this.tilemapSpawnPointX = 0;
    this.tilemapSpawnPointY = 0;

    this.tilemap = this.make.tilemap({key : 'projectBuildingTilemap'});
    this.tileset = this.tilemap.addTilesetImage('ProjectBuildingTileset', 'projectBuildingTileset');

    this.tilemap.createLayer(
      'Walls', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(0);

    this.tilemap.createLayer(
      'Walls Decoration', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(1);

    this.tilemap.createLayer(
      'Decoration 1', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(2);

    this.tilemap.createLayer(
      'Decoration 2', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(3);

    this.tilemap.createLayer(
      'Decoration 3', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(4);

    this.firminLayer = 6;

    this.contourLayer = this.tilemap.createLayer(
      'Contour', this.tileset,
      this.tilemapSpawnPointX, this.tilemapSpawnPointY
    ).setDepth(5);
    this.contourLayer.setCollisionByProperty({collides: true});
  }
}
