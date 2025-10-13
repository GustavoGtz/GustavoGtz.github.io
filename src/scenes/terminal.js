// TODO:
// For the moment this version is functional but it can be improved!

export default class Terminal extends Phaser.Scene {
  constructor() {
    super('Terminal');
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor('#50459b');
    this.textColor = '#887ecb';
    this.fontSize = 20;
    this.verticalSpace = 20;
    
    this.initialText = [
      'COMMODORE 64 BASIC V2',
      '64K RAM SYSTEM 38911 BASIC BYTES FREE',
      '',
      ' FIRMIN IN THE CITY',
      '  * GUSTAVO GUTIERREZ PORTFOLIO',
      '  * 2025',
      '',
      ' PRESS SPACE BAR TO START'
    ];
    for (let i = 0; i < this.initialText.length; i++) {
      this.add.bitmapText(0, i*this.verticalSpace, 'c64', this.initialText[i], this.fontSize);
    }

    this.cursorTimer = 0;
    this.cursorVisible = true;
    this.blinkingCursor = this.add.text(
        0,
        this.verticalSpace * this.initialText.length, // Y position below last line
        '  █',
        { 
            font: this.fontSize + 'px Courier',
            fill: this.textColor                
        }
    );

    this.input.keyboard.on('keydown-SPACE', (event) => {
      this.startGame();
    });
  }

  update(time, delta) {

    this.cursorTimer += delta;
    if (this.cursorTimer > 500) {
        this.cursorTimer = 0;
        this.blinkingCursor.setVisible(!this.blinkingCursor.visible);
    }
  }

  startGame() {
  this.scene.start('Transitions', {
    next: 'trainStation',
    args: 'profileStation',
    name: 'subway',
    ui: 'tutorial',
    time: null
  });
  }
}
