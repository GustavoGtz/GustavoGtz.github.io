export default class EscMenu extends Phaser.Scene {
  constructor() {
    super("EscMenu");
  }

  init(data) {
    this.from = data.from;
  }

  create() {
    this.idxSelection = 0;
    this.totalOptions = 4;

    this.playBackgroundAnimation();
    this.createSelectionMenu();
    this.addControls();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.GOBACK)) {
    this.returnToScene();
    } 
    else if (Phaser.Input.Keyboard.JustDown(this.SELECT)) {
        this.selectOption();
    } 
    else if (Phaser.Input.Keyboard.JustDown(this.GOUP)) {
        this.idxSelection = (this.idxSelection - 1 + this.totalOptions) % this.totalOptions;
        this.updateButtons();
    } 
    else if (Phaser.Input.Keyboard.JustDown(this.GODOWN)) {
        this.idxSelection = (this.idxSelection + 1) % this.totalOptions;
        this.updateButtons();
    }
  }

  playBackgroundAnimation() {
    this.cameras.main.setBackgroundColor(0x5CAB5E);

    const bgAnimation = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'escMenuBackground',
      0
    ).setOrigin(0.5, 0.5);
    bgAnimation.setScale(2);

    if(!this.anims.exists('play-esc-menu-background')){
      this.anims.create({
        key: 'play-esc-menu-background',
        frames: this.anims.generateFrameNumbers('escMenuBackground', { frames: [0, 1, 2, 3] }),
        frameRate: 8,
        repeat: -1
      });
    }
    bgAnimation.play('play-esc-menu-background');
  }

  createSelectionMenu() {
    const menuSelecitonUI = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'escMenuSelection');
    menuSelecitonUI.setOrigin(0.5, 0.5);
    menuSelecitonUI.setScale(2);
    
    this.createButtons();
  }

  createButtons() {
    this.buttons = [
      this.add.sprite(230, 150, 'escMenuButtons', 0).setScale(2), // Art
      this.add.sprite(230, 185, 'escMenuButtons', 3).setScale(2), // Profile
      this.add.sprite(230, 220, 'escMenuButtons', 6).setScale(2), // Project
      this.add.sprite(230, 255, 'escMenuButtons', 9).setScale(2)  // Exit
    ];
    this.frameOffsets = [0, 3, 6, 9];
    this.updateButtons();
  }

  updateButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      const baseFrame = this.frameOffsets[i];
      if (i === this.idxSelection) {
        this.buttons[i].setFrame(baseFrame + 1);
      } else {
        this.buttons[i].setFrame(baseFrame + 0);
      }
    }
  }

  selectOption() {
      const baseFrame = this.frameOffsets[this.idxSelection];
      this.buttons[this.idxSelection].setFrame(baseFrame + 2);

      this.time.delayedCall(200, () => {
          switch (this.idxSelection) {
              case 0: this.quickTravel('art'); break;
              case 1: this.quickTravel('profile'); break;
              case 2: this.quickTravel('project'); break;
              case 3: this.returnToScene(); break;
          }
      });
  }

  addControls() {
    this.GOBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.SELECT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.GOUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.GODOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  returnToScene() {    
    this.scene.stop();       
    this.scene.wake(this.from);
  }

  quickTravel(destinationStreet) {
    this.events.emit(
      'quickTravelResult',
      {street : destinationStreet});
    this.returnToScene();
  }
}
