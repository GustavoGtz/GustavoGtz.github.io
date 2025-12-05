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
    this.buildSnakeText();
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

    const isInsideSnakeTextZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.snakeTextZone.getBounds(),
      firminBounds);
    
    if (!isInsideExitZone &&
        !isInsideOthelloTextZone &&
        !isInsideBeavertaleTextZone &&
        !isInsideSnakeTextZone) { this.firmin.clearInteraction(); }
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
    const othelloText = `Unsupervised Learning in Othello

    This program was a personal project I developed to learn how to use unsupervised learning techniques. 
    I chose a simple problem in this field to start my journey, the task of creating an intelligent agent 
    capable of playing the classic board game Othello (also known as Reversi). I chose this problem because 
    of its simplicity and because of the thematic potential connected to the story written by William 
    Shakespeare, which I could explore later.

    The whole project was developed in the C programming language, using the NCURSES library to build a 
    TUI (Terminal User Interface). The implementation included the classic game interface and rules, as well as a 
    module for an intelligent agent. This agent uses a tabular Q-learning algorithm. Despite his approach is neither 
    ideal nor highly efficient, it served as a solid starting point to learn and build a first version.

    As mentioned before, this program is not fully complete and remains a prototype. My vision is to create a more 
    advanced version of this project in the future, with an improved interface, a better Q-learning algorithm 
    (such as deep Q-learning), and even an interactive chatbot playing as Othello from the original story.

    This project is available on my GitHub page, feel free to check it out!`;

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
    const beaverTaleText = `Beavertale

    Beavertale is an ongoing video game project with a 2D pixel-art style, currently being developed in Unity. 
    Its gameplay follows the basic concepts of classic platformers but adds a unique twist. You play as Gus, 
    a beaver. Like a real beaver, Gus doesn’t have great physical abilities; instead, he has powerful construction 
    knowledge and abilities, allowing him to build structures to overcome his lack of speed and jumping ability. 
    The game combines classic platforming with resource management and puzzle solving.

    This project is a collaborative effort with my partner and two talented friends who are helping us compose the music. 
    As for my role, I’m responsible for all the game art, interface design, character and level design, mechanics, 
    product management, marketing, and even some of the programming.

    We plan to release the game next year. You can follow our progress on Instagram at @beavertalegame and 
    stay updated as we get closer to release.`;

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

  buildSnakeText() {
    const snakeText = `Retro Snake – Classic Video Game

    This program is a simple implementation of the classic Snake video game popularized by 
    Nokia phones. It was developed entirely in Python using the PyGame library.

    The project is a desktop application and does not use external assets, except for a few 
    sound effects. Everything else is built using the library’s basic graphics and simple shapes.

    This program was one of my first video-game–related projects. Nowadays, I know it has several 
    issues, but it served as a valuable learning experience and helped me begin understanding game development.

    This project is available on my GitHub.`;

    const snakeTextData = this.tilemap.getObjectLayer('Snake Text').objects[0];
    
    const snakeTextWidth = snakeTextData.width;
    const snakeTextHeight = snakeTextData.height;
    const snakeTextPosX = snakeTextData.x;
    const snakeTextPosY = snakeTextData.y;
        
    const snake = new ScrollableTextBox(
      this,
      snakeTextPosX,
      snakeTextPosY,
      snakeTextWidth,
      snakeTextHeight,
      snakeText
    ).setDepth(3);

    this.snakeTextZone = this.add.rectangle(
      snakeTextPosX + 50,
      snakeTextPosY + 50,
      snakeTextWidth,
      snakeTextHeight
    );
  
    this.physics.add.existing(this.snakeTextZone, true);
    this.snakeTextZone.setVisible(false);
    
    this.physics.add.overlap(this.firmin, this.snakeTextZone, (player, zone) => {
      player.setInteraction(() => {
        this.scene.sleep();
        this.scene.launch('FullscreenText', { text: snakeText, from: this.scene.key });
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
