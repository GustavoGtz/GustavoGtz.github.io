export default class ScrollableTextBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, textString = '', config = {}) {
    super(scene, x, y);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = textString;
    
    this.config = Object.assign({
      fontFamily: 'commodore64',
      fontSize: '10px',
      textColor: '#5cab5e',
      scrollSpeed: 0.3,
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
    }, config);

    scene.add.existing(this);

    const {
      fontFamily,
      fontSize,
      textColor,
      backgroundColor,
      backgroundAlpha
    } = this.config;

    this.bg = scene.add.graphics();
    this.bg.fillStyle(backgroundColor, backgroundAlpha);
    this.bg.fillRect(0, 0, width, height);
    this.add(this.bg);

    this.text = scene.add.text(0, 0, textString, {
      fontFamily,
      fontSize,
      color: textColor,
      wordWrap: { width: width, useAdvancedWrap: true },
      align: 'left'
    });
    this.add(this.text);

    const maskGraphics = scene.make.graphics({ add: false });
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.fillRect(this.x, this.y, width, height);
    const mask = maskGraphics.createGeometryMask();
    this.text.setMask(mask);

    scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      // Check if pointer is within bounds
      const bounds = this.getBounds();
      if (!Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) return;

      // Scroll text
      const maxScroll = Math.min(0, height - this.text.height);
      this.text.y -= deltaY * this.config.scrollSpeed;
      this.text.y = Phaser.Math.Clamp(this.text.y, maxScroll, 0);
    });
  }

  setText(newText) {
    this.text.setText(newText);
    this.text.y = 0;
  }

  appendText(extraText) {
    this.text.setText(this.text.text + extraText);
  }
}
