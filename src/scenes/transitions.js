import StationSelector from '../gameobjects/stationSelector.js';

export default class Transitions extends Phaser.Scene {
  constructor() {
    super('Transitions');
  }

  /* Structure of Data
  *
  * next:        The name of the scene to be loaded.
  * args:        Arguments passed to the next scene (optional).
  * name:        The name of the transition to be shown.
  *              Possible values:
  *                - "subway"
  *                - "teleportation"
  *                - "black"
  * duration:    The duration of the transition, in milliseconds.
  *              Can be NULL if time depends on the user or animation.
  * ui:          The UI elements displayed in front of the transition.
  *              Can be NULL if no UI is shown.
  *              Possible values:
  *                - "tutorial"
  *                - "stationSelector"
  *                - null
  * entry:       The dissolve effect when entering the scene.
  *              Can be NULL.
  *              Possible values:
  *                - "fade"
  *                - null
  * exit:        The dissolve effect when leaving the scene.
  *              Can be NULL.
  *              Possible values:
  *                - "fade"
  *                - null
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

  update() {
    if(this.stationSelector) { this.stationSelector.update(); }
  }

  playTransition() {
    switch(this.name) {
      case 'subway':
        this.playSubwayTransition();
        break;
      case 'teleport':
        this.playTeleportTransition();
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

  playTeleportTransition() {
    this.cameras.main.setBackgroundColor('#5cab5e');

    const teleportTransition = this.add.sprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'teleportTransition'
    ).setOrigin(0.5).setScale(2); ;

    if (!this.anims.exists('play-teleport-transition')) {
      this.anims.create({
        key: 'play-teleport-transition',
        frames: this.anims.generateFrameNumbers('teleportTransition'),
        frameRate: 5,
        repeat: 0
      });
    }

    teleportTransition.once('animationcomplete', () => {
      this.loadNext();
    });

    this.time.delayedCall(800, () => {
      teleportTransition.play('play-teleport-transition');
    });
  }

  playBlackTransition() {
    this.cameras.main.setBackgroundColor(0x000000);
  }

  showUI() {
    switch(this.ui) {
      case 'tutorial':
        this.showTutorialUI();
        break;
      case 'stationSelector':
        this.showStationSelector();
        break;
      default:
        console.log("Not any valid UI selected");
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
  
  showStationSelector() {
    this.stationSelector = new StationSelector(this, this.cameras.main.centerX, this.cameras.main.centerY);

    this.stationSelector.on('select', station => {
      this.args.station = station;
      this.stationSelector.setVisible(false);

      this.time.delayedCall(1500, () => {
        this.loadNext();
      });
    });
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
        console.log("Not any valid exit selected");
        this.startScene();
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

