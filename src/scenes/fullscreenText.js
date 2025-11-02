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
    this.addControls();
    this.setTheme();
    this.buildBackground();
    this.buildText();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.QUIT)) {
      this.scene.stop();
      this.scene.wake(this.from);
    }
  }

  addControls() {
    this.QUIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  setTheme() {
    this.theme = {
      margin: 5,
      bgColor: 0x000000,
      bgAlpha: 0.9,
      fontFamily: 'commodore64',
      fontSize: '26px',
      textColor: '#9ae29b',
      scrollSpeed: 0.4,
      textBoxColor: 0x00000,
      textBoxAlpha: 1,

      // CRT effects
      glowColor: '#5cab5e',
      glowStrength: 20,
    };
  }

  buildBackground() {
    this.cameras.main.setBackgroundColor(0x00000);
  }

  buildText() {
    const {
      margin,
      fontFamily,
      fontSize,
      textColor,
      scrollSpeed,
      textBoxColor,
      textBoxAlpha,
      glowColor,
      glowStrength
    } = this.theme;

    const { width, height } = this.cameras.main;

    const boxWidth = width - margin * 2;
    const boxHeight = height - margin * 2;

    // Header instructions
    const headerText = "Press W and S to move, and ESC to quit\n\n";
    const finalText = headerText + this.text;

    this.scrollBox = new ScrollableTextBox(
      this,
      margin,
      margin,
      boxWidth,
      boxHeight,
      finalText,
      {
        fontFamily,
        fontSize,
        textColor,
        backgroundColor: textBoxColor,
        backgroundAlpha: textBoxAlpha,
      }
    );

    this.add.existing(this.scrollBox);

    // CRT-style shadow glow
    const textObj = this.scrollBox.textObject || this.scrollBox.text;
    if (textObj && textObj.setShadow) {
      textObj.setShadow(0, 0, glowColor, glowStrength, true, true);
    }
  }
}
