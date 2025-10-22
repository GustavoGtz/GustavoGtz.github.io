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
  }

  setSubwayEntry() {
    /* HardCoded Value */
    const entryWidth = 20;
    const entryHeight = 80;
    const entryPosX = this.x - 20;
    const entryPosY = this.y + 10;

    this.entryZone = this.scene.add.rectangle(entryPosX,
                                        entryPosY,
                                        entryWidth,
                                        entryHeight);
    this.scene.physics.add.existing(this.entryZone, true);
    this.entryZone.setVisible(false);
  }

  setSubwayEntryAction(character) {
    this.firmin = character;
    this.scene.physics.add.overlap(this.firmin, this.entryZone, (player, zone) => {
      player.setInteraction(() => {
        this.subwayTravel();
      })
    }, null, this.scene);
  }

  subwayTravel() {
    this.firmin.anims.play('firmin-enter', true);
    
    this.scene.time.delayedCall(1500, () => {
      this.play('subway-close-door', true);
      this.scene.time.delayedCall(1500, () => {
        this.play('subway-go', true);
        this.scene.tweens.add({
          targets: this,
          x: this.x - 400, // Move subway left
          duration: 2500,
          ease: 'Sine.easeInOut',
        });

        // Step 4: After subway leaves, trigger transition scene
        this.scene.time.delayedCall(3000, () => {
            this.scene.scene.start('Transitions', {
              next: 'City',
              args: { street: null, spawn: null },
              name: 'subway',
              duration: null,
              ui: 'stationSelection',
              entry: 'fade',
              exit: 'fade'
            });
        });
      });
    });
  }

  createAnimations(anims) {
    if(!anims.exists('subway-idle')){
      anims.create({
        key: 'subway-idle',
        frames: [{key: 'subway', frame: 0}],
        frameRate: 1,
      }); 
    }
    
    if(!anims.exists('subway-close-door')){
      anims.create({
        key: 'subway-close-door',
        frames: anims.generateFrameNumbers('subway', {start: 0, end: 3}),
        frameRate: 8,
        repeat: 0,
      });
    }

    if(!anims.exists('subway-go')){
      anims.create({
        key: 'subway-go',
        frames: [{key: 'subway', frame: 4 }],
        frameRate: 1,
      });
    }
  }
}
