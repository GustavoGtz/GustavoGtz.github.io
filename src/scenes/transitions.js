// TODO's:
// 1. Change the dispatch to a dynamical one

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
   *        - fade
   *        - null
   * exit: The way to disolve from this scene to the next one
   *       It can be Null
   *       Actual possibles values:
   *        - fade
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

    this.playTransition();

    if (this.ui !== null) {
      this.showUI();
    }

    if (this.duration) {
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

    if(!this.anims.exists('play-subway-transition')){
      this.anims.create({
        key: 'play-subway-transition',
        frames: this.anims.generateFrameNumbers('subwayTransition', { frames: [0, 1, 2, 3] }),
        frameRate: 8,
        repeat: -1
      });
    }

    subwayTransition.play('play-subway-transition');
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
    // Here I will implamaented a menu selecito with controls and everytging.
    console.log("STATION SELECTION UI");
    // In this UI, the user can change 'this.next' and 'this.args'
  }

  playEntry() {
    switch(this.entry) {
      case 'fade':
        this.playFadeEntry();
        break;
      default:
        console.log("Not any valid entry selected");
    } 
  }

  playFadeEntry() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
  }

  playExit() {
    switch(this.exit) {
      case 'fade':
        this.playFadeExit();
        break;
      default:
        this.startScene();
        console.log("Not any valid exit selected");
    }
  }

  playFadeExit() {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.time.delayedCall(1000, () => { this.startScene(); });
  }

  loadNext(){
    if (this.exit !== null) {
      this.playExit(); // Play exit will manage the load
    }
    else {
      this.startScene();
    }
  }

  startScene(){
    this.scene.start(this.next, this.args);
  }
}

