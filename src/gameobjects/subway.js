export default class Subway extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, layer) {
    super(scene, x, y, "subway");
    this.scene = scene;
    this.layer = layer;
    this.scene.add.existing(this);
    this.movementSpeed = 80;
    this.setDepth(layer);
    this.createAnimations(scene.anims);
    this.setSubwayEntry();
    this.play('subway-idle');

    this.createTrainCars();

  }

  createTrainCars() {
    this.trainLength = 2; // the 0 it's the head
    const carSpacing = 272;
    this.cars = [];

    for (let i = 1; i <= this.trainLength; i++) {
      const texture = 'subwayBack';
      const car = this.scene.add.sprite(this.x + (carSpacing * i), this.y, texture);
      car.setDepth(this.layer - i * 0.01);
      car.play('subway-back-idle');
      this.cars.push(car);
    }
  }

  setSubwayEntry() {
    /* HardCoded Value */
    const entryWidth = 20;
    const entryHeight = 80;
    const entryPosX = this.x - 20;
    const entryPosY = this.y + 10;

    this.entryZone = this.scene.add.rectangle(entryPosX, entryPosY, entryWidth, entryHeight);
    this.scene.physics.add.existing(this.entryZone, true);
    this.entryZone.setVisible(false);
  }

  setSubwayEntryAction(character) {
    this.firmin = character;
    this.scene.physics.add.overlap(this.firmin, this.entryZone, (player, zone) => {
      player.setInteraction(() => {
        this.subwayTravel();
      });
    }, null, this.scene);
  }

  subwayTravel() {
    this.firmin.anims.play('firmin-enter', true);

    this.scene.time.delayedCall(1500, () => {
      this.play('subway-close-door', true);

      this.scene.time.delayedCall(1500, () => {
        this.play('subway-go', true);

        const moveDistance = 1000;
        const duration = 2500;
        this.cars.forEach(car => {
          car.play('subway-back-go');
        });

        this.scene.tweens.add({
          targets: [this, ...this.cars],
          x: `-=${moveDistance}`,
          duration,
          ease: 'Sine.easeInOut',
        });

        this.scene.time.delayedCall(2000, () => {
          this.scene.scene.start('Transitions', {
            next: 'SubwayStation',
            args: { station: null, spawn: 'subway' },
            name: 'subway',
            duration: null,
            ui: 'stationSelection',
            entry: 'fade',
            exit: 'fade',
          });
        });
      });
    });
  }

  createAnimations(anims) {
    // Front car animations
    if (!anims.exists('subway-idle')) {
      anims.create({
        key: 'subway-idle',
        frames: [{ key: 'subway', frame: 0 }],
        frameRate: 1,
      });
    }

    if (!anims.exists('subway-close-door')) {
      anims.create({
        key: 'subway-close-door',
        frames: anims.generateFrameNumbers('subway', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: 0,
      });
    }

    if (!anims.exists('subway-go')) {
      anims.create({
        key: 'subway-go',
        frames: [{ key: 'subway', frame: 4 }],
        frameRate: 1,
      });
    }

    if (!anims.exists('subway-back-idle')) {
      anims.create({
        key: 'subway-back-idle',
        frames: [{ key: 'subwayBack', frame: 0 }],
        frameRate: 1,
      });
    }

    if (!anims.exists('subway-back-go')) {
      anims.create({
        key: 'subway-back-go',
        frames: [{ key: 'subwayBack', frame: 1 }],
        frameRate: 1,
      });
    }
  }
}
