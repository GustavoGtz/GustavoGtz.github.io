export default class ArtSlides extends Phaser.GameObjects.Container {
  constructor(scene, x, y, layer) {
    super(scene, x, y);
    this.posX = x;
    this.posY = y;
    this.scene = scene;
    this.layer = layer;

    this.scene.add.existing(this);
    this.setDepth(layer);

    this.slides = [];
    this.slideIndex = 0;
    this.cooldown = false;

    this.createAnimations(scene.anims); 
    this.buildSlides();
    this.showActualSlide();
  }

  buildSlides() {
    const bossSlide = this.createBossSlide();
    const gusSlide = this.createGusSlide();
    const goblinsSlide = this.createGoblinsSlide();
    const forestSlide = this.createForestSlide();
    const caveSlide = this.createCaveSlide();
    const wolfSlide = this.createWolfSlide();
    const instagramSlide = this.createInstagramSlide(); 

    this.slides.push(
      bossSlide,
      gusSlide,
      goblinsSlide, 
      forestSlide,
      caveSlide,
      wolfSlide,
      instagramSlide
      );
  }

  nextSlide() {
    if (!this.slides || this.slides.length === 0) return;

    if (this.cooldown) return;
    this.cooldown = true;
    this.scene.time.delayedCall(600, () => (this.cooldown = false)); // 0.6s cooldown

    this.slideIndex = (this.slideIndex + 1) % this.slides.length;

    this.showActualSlide();
  }

  showActualSlide() {
    this.slides.forEach((slide, i) => {
      slide.setVisible(i === this.slideIndex);
    });
  }

  createBossSlide() {
    const container = this.scene.add.container(this.posX, this.posY);

    const boss = this.scene.add.sprite(55, 82, 'boss');
    const bossBaseHuman = this.scene.add.sprite(145, 120, 'bossBaseHuman');
    const bossBaseRobot = this.scene.add.sprite(195, 120, 'bossBaseRobot');
    
    const bomb = this.scene.add.sprite(135, 60, 'bomb');
    const pig = this.scene.add.sprite(175, 60, 'pig');
    const drill = this.scene.add.sprite(210, 60, 'drill');
    
    boss.play('boss-animation');
    bossBaseHuman.play('boss-base-human-animation');
    bossBaseRobot.play('boss-base-robot-animation');
    
    bomb.play('bomb-animation');
    pig.play('pig-animation');
    drill.play('drill-animation');


    container.add([
      boss,
      bossBaseHuman,
      bossBaseRobot,
      bomb,
      pig,
      drill,
    ]);

    return container;
  }

  createGusSlide() {
    const container = this.scene.add.container(this.posX, this.posY);
    
    const gus = this.scene.add.sprite(20, 130, 'gus');
    const gusHelmet = this.scene.add.sprite(55, 130, 'gusHelmet');
    const gusDeath = this.scene.add.sprite(115, 130, 'gusDeath');
    const gusHelmetDeath = this.scene.add.sprite(170, 130, 'gusHelmetDeath');

    const gusSmall = this.scene.add.sprite(170, 50, 'gusSmall').setScale(2);
    const gusLogo = this.scene.add.sprite(155, 90, 'gusLogo').setScale(2);
    const gusResourcesPanel = this.scene.add.sprite(60, 60, 'gusResourcesPanel');

    const cB = this.scene.add.image(220, 80, 'cursorBase');
    const cS = this.scene.add.image(220, 105, 'cursorSelect');
    const cD = this.scene.add.image(220, 130, 'cursorDelete');
    
    gus.play('gus-animation');
    gusHelmet.play('gus-helmet-animation');
    gusResourcesPanel.play('gus-resources-panel-animation');

    container.add([
      gus,
      gusHelmet,
      gusDeath,
      gusHelmetDeath,
      gusSmall,
      gusLogo,
      gusResourcesPanel,
      cB,
      cS,
      cD
    ]);

    return container;
  }

  createGoblinsSlide() {
    const container = this.scene.add.container(this.posX, this.posY);

    const spikeI = this.scene.add.image(50, 80, 'spikeIllustration').setScale(0.5);
    const goblins = this.scene.add.image(185, 110, 'goblins').setScale(1);
    const musicUi = this.scene.add.sprite(185, 50, 'musicUi').setScale(0.5);

    musicUi.play('musicUi-animation');
  
    container.add([
      spikeI,
      goblins,
      musicUi
    ]);

    return container;
  }

  createForestSlide() {
    const container = this.scene.add.container(this.posX, this.posY);

    const forestBg = this.scene.add.image(80, 55, 'forestBackground').setScale(0.5);
    const forestTileset = this.scene.add.image(200, 60, 'forestTileset').setScale(0.5);
    const forestMachine = this.scene.add.sprite(150, 100, 'forestMachine');
    const tree = this.scene.add.sprite(52, 100, 'tree');

    forestMachine.play('forest-machine-animation');
    tree.play('tree-animation');

    
    container.add([
      forestBg,
      forestTileset,
      forestMachine,
      tree
    ]);

    return container;
  }

  createCaveSlide() {
    const container = this.scene.add.container(this.posX, this.posY);

    const caveBg = this.scene.add.image(80, 55, 'caveBackground').setScale(0.5);
    const caveTileset = this.scene.add.image(200, 60, 'caveTileset').setScale(0.5);
    const caveMachine = this.scene.add.sprite(150, 100, 'caveMachine');
    const mushroom = this.scene.add.sprite(52, 100, 'mushroom');
    
    caveMachine.play('cave-machine-animation');
    mushroom.play('mushroom-animation');
    
    container.add([
      caveBg,
      caveTileset,
      caveMachine,
      mushroom,
    ]);

    return container;
  }

  createWolfSlide() {
    const container = this.scene.add.container(this.posX, this.posY);

    const wolfBg = this.scene.add.image(100, 80, 'wolfBackground').setScale(1);
    const loadingWolfDark = this.scene.add.sprite(220, 60, 'loadingWolfDark').setScale(1);
    const loadingWolfWhite = this.scene.add.sprite(220, 120, 'loadingWolfWhite').setScale(1);
    
    loadingWolfDark.play('loading-wolf-dark-animation');
    loadingWolfWhite.play('loading-wolf-white-animation');

    container.add([
      wolfBg,
      loadingWolfDark,
      loadingWolfWhite
    ]);

    return container;
  }

  createInstagramSlide() {
    const container = this.scene.add.container(this.posX, this.posY);

    const dBird = this.scene.add.image(40, 60, 'draculaBird').setScale(0.1);
    const lBirds = this.scene.add.image(150, 60, 'loveBirds').setScale(0.1);

    const text = '@gustabuu_d to checkout my\ndrawings in traditional!';
    const bitmapText = this.scene.add.bitmapText(0, 120, 'c64', text, 12);

    container.add([
      dBird,
      lBirds,
      bitmapText
    ]);

    return container;
  }

  
  createAnimations(anims) {
    if (!anims.exists('boss-animation')) {
        anims.create({
        key: 'boss-animation',
        frames: anims.generateFrameNumbers('boss', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      }); 
    }

    if (!anims.exists('boss-base-human-animation')) {
        anims.create({
        key: 'boss-base-human-animation',
        frames: anims.generateFrameNumbers('bossBaseHuman', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      }); 
    }

    if (!anims.exists('boss-base-robot-animation')) {
        anims.create({
        key: 'boss-base-robot-animation',
        frames: anims.generateFrameNumbers('bossBaseRobot', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      }); 
    }

    if (!anims.exists('gus-animation')) {
      anims.create({
        key: 'gus-animation',
        frames: anims.generateFrameNumbers('gus', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('gus-helmet-animation')) {
      anims.create({
        key: 'gus-helmet-animation',
        frames: anims.generateFrameNumbers('gusHelmet', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('gus-resources-panel-animation')) {
      anims.create({
        key: 'gus-resources-panel-animation',
        frames: anims.generateFrameNumbers('gusResourcesPanel', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('forest-machine-animation')) {
      anims.create({
        key: 'forest-machine-animation',
        frames: anims.generateFrameNumbers('forestMachine', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('cave-machine-animation')) {
      anims.create({
        key: 'cave-machine-animation',
        frames: anims.generateFrameNumbers('caveMachine', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('tree-animation')) {
      anims.create({
        key: 'tree-animation',
        frames: anims.generateFrameNumbers('tree', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('mushroom-animation')) {
      anims.create({
        key: 'mushroom-animation',
        frames: anims.generateFrameNumbers('mushroom', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('bomb-animation')) {
      anims.create({
        key: 'bomb-animation',
        frames: anims.generateFrameNumbers('bomb', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('pig-animation')) {
      anims.create({
        key: 'pig-animation',
        frames: anims.generateFrameNumbers('pig', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('drill-animation')) {
      anims.create({
        key: 'drill-animation',
        frames: anims.generateFrameNumbers('drill', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('musicUi-animation')) {
      anims.create({
        key: 'musicUi-animation',
        frames: anims.generateFrameNumbers('musicUi', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('loading-wolf-dark-animation')) {
      anims.create({
        key: 'loading-wolf-dark-animation',
        frames: anims.generateFrameNumbers('loadingWolfDark', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!anims.exists('loading-wolf-white-animation')) {
      anims.create({
        key: 'loading-wolf-white-animation',
        frames: anims.generateFrameNumbers('loadingWolfWhite', { start: 0, end: -1 }),
        frameRate: 8,
        repeat: -1
      });
    }
  }
}
