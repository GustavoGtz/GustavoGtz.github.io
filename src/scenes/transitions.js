// TODO's:
// 1. Change the dispatch to a dynamical one
// 2. Implement the actual transitions like wipe

export default class Transitions extends Phaser.Scene {
  constructor() {
    super('Transitions');
  }

  /* Structure of Data
   *
   * next: The name of the scene to be loaded
   * args: If the scene to be loaded has arguments
   * name: The name of the transition to be showed
   *       Actual possibles values:
   *         - subway
   *         - black
   * duration: The duration of the transition. It can be NULL if the
   *           time depends by the user or the animation itself.
   *           In miliseconds.
   * ui: The elements to be displayed in front of the transition.
   *     It can be NULL if it's no UI to show
   *     Actual possibles values:
   *       - tutorial
   *       - stationSelection
   *       - null
   * entry: The way to disolve from the previous scene to this one
   *       It can be Null
   *       Actual possibles values:
   *        - wipe
   *        - pixelite
   *        - null
   * exit: The way to disolve from this scene to the next one
   *       It can be Null
   *       Actual possibles values:
   *        - wipe
   *        - pixelite
   *        - null
   */
  
  init(data) {
    this.next = data.next;
    this.args = data.args;
    this.name = data.name;
    this.duration = data.duration;
    this.ui = data.ui;
    this.entry = data.entry;
    this.exit  = data.exit;
  }

  create() {
    if (this.entry !== null) {
      this.playEntry();
    }

    // TODO: Desplegar la animacion
    this.playTransition();

    // TODO: Desplegar la UI
    if (this.ui !== null) {
      this.showUI();
    }
    
    if (this.duraton !== null) {
      this.time.addEvent({
        delay: this.duration,
        callback: this.loadNext,
        callbackScope: this,
        loop: false
      });
    }
  }

  playTransition() {
    switch(this.name) {
      case 'subway':
        this.playSubwayTransition();
        break;
      case 'black':
        this.playBlackTransition();
        break;
      default:
        console.log("Not any valid Transition selected");
        break;
    }
  }

  playSubwayTransition() {
    const subwayTransition = this.add.sprite(0, 0, 'subwayTransition', 0).setOrigin(0, 0);

    this.anims.create({
      key: 'go',
      frames: this.anims.generateFrameNumbers('subwayTransition', { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1
    });

    subwayTransition.play('go');
  }
      
  playBlackTransition() {
    this.cameras.main.setBackgroundColor(0x000000);
  }

  showUI() {
    switch(this.ui) {
      case 'tutorial':
        this.showTutorialUI();
        break;
      case 'stationSelection':
        this.showStationSelectionUI();
        break;
      default:
        console.log("Not any UI selected");
        break;
    }
  }

  showTutorialUI() {
    const tutorialUI = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'tutorial');
    tutorialUI.setOrigin(0.5, 0.5);
    tutorialUI.setScale(2); 
  }
  
  showStationSelectionUI() {
    console.log("STATION SELECTION UI");
    // In this UI, the user can change 'this.next' and 'this.args'
  }

  playEntry() {
    switch(this.entry) {
      case 'wipe':
        this.playWipeEntry();
        break;
      case 'pixelite':
        this.playPixeliteEntry();
        break;
      default:
        console.log("Not any entry selected");
    } 
  }

  playWipeEntry() {
    console.log("wipeEntry");
  }

  playPixeliteEntry() {
    console.log("pixeliteEntry");
  }

  playExit() {
    switch(this.exit) {
      case 'wipe':
        this.playWipeExit();
        break;
      case 'pixelite':
        this.playPixeliteExit();
      default:
        console.log("Not any exit selected");
    }
  }

  playWipeExit() {
    
    console.log("Wipe extit");
  }

  playPixeliteExit() {
    console.log("pixelite exit");
  }
  
  loadNext(){
    if (this.exit !== null) {
      this.playExit();
    }
    this.scene.start(this.next, this.args);
  }
}

