/* ss for STATION SELECTOR */
export default class StationSelector extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    this.idxSelection = 0;
    this.totalOptions = 3;
    this.scene.add.existing(this);

    this.createSelectorMenu();
    this.createSelectorButtons();
    this.addControls();
  }

  createSelectorMenu() {
    const ssMenu = this.scene.add.image(0, 0, 'stationSelectorMenu');
    ssMenu.setOrigin(0.5);
    ssMenu.setScale(2);
    this.add(ssMenu);
  }

  createSelectorButtons() {
    const positions = [-50, 25, 100];
    this.buttons = [];
    this.frameOffsets = [0, 3, 6];

    for (let i = 0; i < positions.length; i++) {
      const btn = this.scene.add.sprite(
        0, positions[i], 
        'stationSelectorButtons', 
        this.frameOffsets[i]).setScale(2);
      this.add(btn);
      this.buttons.push(btn);
    }
    this.updateButtons();
  }

  updateButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      const baseFrame = this.frameOffsets[i];
      this.buttons[i].setFrame(i === this.idxSelection ? baseFrame + 1 : baseFrame);
    }
  }

  addControls() {
    this.SELECT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.GOUP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.GODOWN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.SELECT)) {
      this.selectOption();
    } else if (Phaser.Input.Keyboard.JustDown(this.GOUP)) {
      this.idxSelection = (this.idxSelection - 1 + this.totalOptions) % this.totalOptions;
      this.updateButtons();
    } else if (Phaser.Input.Keyboard.JustDown(this.GODOWN)) {
      this.idxSelection = (this.idxSelection + 1) % this.totalOptions;
      this.updateButtons();
    }
  }

  selectOption() {
    const baseFrame = this.frameOffsets[this.idxSelection];
    this.buttons[this.idxSelection].setFrame(baseFrame + 2);

    this.scene.time.delayedCall(200, () => {
      const destinations = ['art', 'profile', 'project'];
      this.emit('select', destinations[this.idxSelection]);
    });
  }
}
