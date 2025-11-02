export default class ArtSlides extends Phaser.GameObjects.Container {
  constructor(scene, x, y, layer) {
    super(scene, x, y);
    this.posX = x;
    this.posY = y; // Corner
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
    const s1 = this.createSlide1();
    const s2 = this.createSlide2();
    const s3 = this.createSlide3();
    const s4 = this.createSlide4(); 

    this.slides.push(
      s1, 
      s2, 
      s3,
      s4
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

  createSlide1() {
    const container = this.scene.add.container(this.posX, this.posY);

    const boss = this.scene.add.sprite(55, 82, 'boss');
    const gus = this.scene.add.sprite(210, 40, 'gus');
    const machine = this.scene.add.sprite(150, 100, 'machine');
    const bomb = this.scene.add.sprite(105, 40, 'bomb');
    const pig = this.scene.add.sprite(150, 30, 'pig');
    const drill = this.scene.add.sprite(150, 60, 'drill');
   
    const cB = this.scene.add.image(235, 80, 'cursorBase');
    const cS = this.scene.add.image(235, 105, 'cursorSelect');
    const cD = this.scene.add.image(235, 130, 'cursorDelete');
    
    boss.play('boss-animation');
    gus.play('gus-animation');
    machine.play('machine-animation');
    
    bomb.play('bomb-animation');
    pig.play('pig-animation');
    drill.play('drill-animation');


    container.add([
      boss,
      gus, 
      machine,
      bomb,
      pig,
      drill,
      cB,
      cS,
      cD
    ]);

    return container;
  }

  createSlide2() {
    const container = this.scene.add.container(this.posX, this.posY);

    const caveBg = this.scene.add.image(80, 55, 'caveBackground').setScale(0.5);
    const mushroom = this.scene.add.sprite(52, 100, 'mushroom');
    const tree = this.scene.add.sprite(150, 100, 'tree');

    mushroom.play('mushroom-animation');
    tree.play('tree-animation');
    
    container.add([
      caveBg,
      mushroom,
      tree
    ]);

    return container;
  }

  createSlide3() {
    const container = this.scene.add.container(this.posX, this.posY);

    const spikeI = this.scene.add.image(50, 80, 'spikeIllustration').setScale(0.5);
    const wolfBg = this.scene.add.image(200, 125, 'wolfBackground').setScale(0.5);
    const musicUi = this.scene.add.sprite(200, 55, 'musicUi').setScale(0.5);

    musicUi.play('musicUi-animation');
  
    container.add([
      spikeI,
      wolfBg,
      musicUi
    ]);

    return container;
  }

  createSlide4() {
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

    if (!anims.exists('gus-animation')) {
      anims.create({
        key: 'gus-animation',
        frames: anims.generateFrameNumbers('gus', { start: 0, end: -1 }),
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

    if (!anims.exists('machine-animation')) {
      anims.create({
        key: 'machine-animation',
        frames: anims.generateFrameNumbers('machine', { start: 0, end: -1 }),
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
  }
}
