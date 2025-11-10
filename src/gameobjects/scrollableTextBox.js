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
      scrollSpeed: 0.3,  // mouse scroll speed
      keyScrollSpeed: 3, // key scroll speed
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
      margin: { top: 5, right: 5, bottom: 5, left: 5 } // NEW margin config
    }, config);

    scene.add.existing(this);

    const { fontFamily, fontSize, textColor, backgroundColor, backgroundAlpha, margin } = this.config;

    // Background
    this.bg = scene.add.graphics();
    this.bg.fillStyle(backgroundColor, backgroundAlpha);
    this.bg.fillRect(0, 0, width, height);
    this.add(this.bg);

    // Text area with margin
    const textX = margin.left;
    const textY = margin.top;
    const textWidth = width - margin.left - margin.right;
    const textHeight = height - margin.top - margin.bottom;

    this.text = scene.add.text(textX, textY, textString, {
      fontFamily,
      fontSize,
      color: textColor,
      wordWrap: { width: textWidth, useAdvancedWrap: true },
      align: 'left'
    });
    this.add(this.text);

    // Mask with respect to margins
    const maskGraphics = scene.make.graphics({ add: false });
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.fillRect(this.x + margin.left, this.y + margin.top, textWidth, textHeight);
    const mask = maskGraphics.createGeometryMask();
    this.text.setMask(mask);

    // Scroll with mouse wheel
    scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      const bounds = this.getBounds();
      if (!Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) return;
      this.scroll(deltaY * this.config.scrollSpeed);
    });

    // Scroll with keys
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S
    });

    scene.events.on('update', this.updateScroll, this);
  }

  scroll(amount) {
    const margin = this.config.margin;
    const visibleHeight = this.height - margin.top - margin.bottom;
    const maxScroll = Math.min(0, visibleHeight - this.text.height);
    this.text.y = Phaser.Math.Clamp(this.text.y - amount, maxScroll + margin.top, margin.top);
  }

  updateScroll() {
    if (!this.cursors) return;
    if (this.cursors.up.isDown) this.scroll(-this.config.keyScrollSpeed);
    if (this.cursors.down.isDown) this.scroll(this.config.keyScrollSpeed);
  }

  setText(newText) {
    this.text.setText(newText);
    this.text.y = this.config.margin.top;
  }

  appendText(extraText) {
    this.text.setText(this.text.text + extraText);
  }
}
