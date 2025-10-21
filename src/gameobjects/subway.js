export default class Subway extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "subway");
    this.scene = scene;
    this.scene.add.existing(this);
    this.movementSpeed = 80;

    this.createAnimations(scene.anims);

    this.play('subway-idle');
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
        frameRate: 2,
        repeat: 0,
      });
    }

    if(!anims.exists('subway-go')){
      anims.create({
        key: 'subway-go',
        frames: anims.generateFrameNumbers('subway', {start: 4, end: 7}),
        frameRate: 6,
        repeat: 0,
        hideOnComplete: true,
      });
    }
  }
}
