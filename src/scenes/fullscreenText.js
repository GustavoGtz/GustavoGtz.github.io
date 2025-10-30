import ScrollableTextBox from '../gameobjects/scrollableTextBox.js';

export default class FullscreenText extends Phaser.Scene {
  constructor() {
    super('FullscreenText');
  }

  init(data) {
    this.text = data.text || '';
    this.from = data.from;
  }

  create() {
    this.buildText();
    this.addControls();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.QUIT)) {
      this.scene.stop();       
      this.scene.wake(this.from);
    }
  }

  buildText() {
    // === Dark overlay background ===
    this.bg = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.9
    );

    // === Scrollable text box centered ===
    const margin = 40;
    const boxWidth = this.cameras.main.width - margin * 2;
    const boxHeight = this.cameras.main.height - margin * 2;

    this.scrollBox = new ScrollableTextBox(
      this,
      margin,
      margin,
      boxWidth,
      boxHeight,
      this.text,
      {
        fontFamily: 'press_start_2p',
        fontSize: '20px',
        textColor: '#5cab5e',
        scrollSpeed: 0.4,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
      }
    );

    this.add.existing(this.scrollBox);
  }

  addControls() {
    this.QUIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);    
  }
}
