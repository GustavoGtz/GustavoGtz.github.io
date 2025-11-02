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
      keyScrollSpeed: 3, // speed for key scrolling
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
    }, config);

    scene.add.existing(this);

    const { fontFamily, fontSize, textColor, backgroundColor, backgroundAlpha } = this.config;

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

    // Mask
    const maskGraphics = scene.make.graphics({ add: false });
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.fillRect(this.x, this.y, width, height);
    const mask = maskGraphics.createGeometryMask();
    this.text.setMask(mask);

    // Scroll with mouse wheel
    scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      const bounds = this.getBounds();
      if (!Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) return;
      this.scroll(deltaY * this.config.scrollSpeed);
    });

    // Scroll with UP/DOWN keys
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S
    });

    // Update key scroll in scene’s update loop
    scene.events.on('update', this.updateScroll, this);
  }

  // Core scroll logic
  scroll(amount) {
    const maxScroll = Math.min(0, this.height - this.text.height);
    this.text.y = Phaser.Math.Clamp(this.text.y - amount, maxScroll, 0);
  }

  // Called every frame
  updateScroll() {
    if (!this.cursors) return;
    if (this.cursors.up.isDown) this.scroll(-this.config.keyScrollSpeed);
    if (this.cursors.down.isDown) this.scroll(this.config.keyScrollSpeed);
  }

  setText(newText) {
    this.text.setText(newText);
    this.text.y = 0;
  }

  appendText(extraText) {
    this.text.setText(this.text.text + extraText);
  }
}
