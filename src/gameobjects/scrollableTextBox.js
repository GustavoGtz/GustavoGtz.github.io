export default class ScrollableTextBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, textString = '', config = {}) {
    super(scene, x, y);
    scene.add.existing(this);

    // === Default config ===
    this.config = Object.assign({
      fontFamily: 'pressStart2P',
      fontSize: '6px',
      textColor: '#5cab5e',
      scrollSpeed: 0.3,
      backgroundColor: 0x000000,
      backgroundAlpha: 1,
      buttonColor: 0x5cab5e,
      buttonHoverColor: 0x8ee88a,
      buttonSize: 10
    }, config);

    const {
      fontFamily,
      fontSize,
      textColor,
      backgroundColor,
      backgroundAlpha,
      buttonColor,
      buttonHoverColor,
      buttonSize
    } = this.config;

    // === Background rectangle ===
    this.bg = scene.add.graphics();
    this.bg.fillStyle(backgroundColor, backgroundAlpha);
    this.bg.fillRect(0, 0, width, height);
    this.add(this.bg);

    // === Text ===
    this.text = scene.add.text(0, 0, textString, {
      fontFamily,
      fontSize,
      color: textColor,
      wordWrap: { width: width - buttonSize * 2, useAdvancedWrap: true },
      align: 'left'
    });
    this.add(this.text);

    // === Mask ===
    const maskGraphics = scene.make.graphics({ add: false });
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.fillRect(this.x, this.y, width, height);
    const mask = maskGraphics.createGeometryMask();
    this.text.setMask(mask);

    // === Save boundaries ===
    this.width = width;
    this.height = height;

    // === Scroll buttons ===
    this.upButton = this.createButton(width - buttonSize - 2, 2, buttonSize, '▲', () => this.scroll(-15));
    this.downButton = this.createButton(width - buttonSize - 2, height - buttonSize - 2, buttonSize, '▼', () => this.scroll(15));
    this.add(this.upButton);
    this.add(this.downButton);

    // === Scroll bar indicator ===
    this.scrollBar = scene.add.graphics();
    this.add(this.scrollBar);
    this.updateScrollBar();

    // === Mouse wheel ===
    scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      const bounds = this.getBounds();
      if (!Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) return;
      this.scroll(deltaY * this.config.scrollSpeed * 5);
    });
  }

  /** Create arrow button */
  createButton(x, y, size, label, onClick) {
    const container = this.scene.add.container(x, y);
    const g = this.scene.add.graphics();
    g.fillStyle(this.config.buttonColor, 1);
    g.fillRoundedRect(0, 0, size, size, 2);

    const txt = this.scene.add.text(size / 4, size / 6, label, {
      fontFamily: 'monospace',
      fontSize: `${size - 4}px`,
      color: '#000000'
    });

    container.add([g, txt]);
    container.setSize(size, size);
    container.setInteractive(new Phaser.Geom.Rectangle(0, 0, size, size), Phaser.Geom.Rectangle.Contains);

    container.on('pointerover', () => {
      g.clear();
      g.fillStyle(this.config.buttonHoverColor, 1);
      g.fillRoundedRect(0, 0, size, size, 2);
    });
    container.on('pointerout', () => {
      g.clear();
      g.fillStyle(this.config.buttonColor, 1);
      g.fillRoundedRect(0, 0, size, size, 2);
    });
    container.on('pointerdown', onClick);

    return container;
  }

  /** Scroll the text */
  scroll(amount) {
    const maxScroll = Math.min(0, this.height - this.text.height);
    this.text.y = Phaser.Math.Clamp(this.text.y - amount, maxScroll, 0);
    this.updateScrollBar();
  }

  /** Update scrollbar visual */
  updateScrollBar() {
    const viewRatio = this.height / this.text.height;
    const scrollRatio = -this.text.y / (this.text.height - this.height);
    const barHeight = Math.max(10, this.height * viewRatio);

    this.scrollBar.clear();
    if (viewRatio < 1) {
      this.scrollBar.fillStyle(0x5cab5e, 0.6);
      this.scrollBar.fillRoundedRect(
        this.width - 6,
        scrollRatio * (this.height - barHeight),
        4,
        barHeight,
        2
      );
    }
  }

  /** Replace text and reset scroll */
  setText(newText) {
    this.text.setText(newText);
    this.text.y = 0;
    this.updateScrollBar();
  }

  /** Append text to the end */
  appendText(extraText) {
    this.text.setText(this.text.text + extraText);
    this.updateScrollBar();
  }
}
