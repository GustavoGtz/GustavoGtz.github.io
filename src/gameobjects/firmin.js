
export default class Firmin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "firmin");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.movementSpeed = 80;
    this.jumpForce = -80;
    this.onGround = false;
    
    this.addControls();
    this.createAnimations(scene.anims);
    this.initCamera();
  }
  
  addControls() {
    this.controlsEnabled = true; // control variable
    
    this.scene.events.on("update", this.update, this);
    this.cursor = this.scene.input.keyboard.createCursorKeys();

    this.LOOKUP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.MOVELEFT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.LOOKDOWN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.MOVERIGHT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.ESCMENU = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.JUMP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.INTERACT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  createAnimations(anims) {
    if(!anims.exists('firmin-idle')){
      anims.create({
        key: 'firmin-idle',
        frames: anims.generateFrameNumbers('firmin', {start: 4, end: 5}),
        frameRate: 2,
        repeat: -1
      });
    }

    if(!anims.exists('firmin-walk')){
      anims.create({
        key: 'firmin-walk',
        frames: anims.generateFrameNumbers('firmin', {start: 8, end: 9}),
        frameRate: 6,
        repeat: -1
      });
    }

    if(!anims.exists('firmin-jump-air')){
      anims.create({
        key: 'firmin-jump-air',
        frames: [{ key: 'firmin', frame: 7 }],
        frameRate: 1,
      });
    }

    if(!anims.exists('firmin-jump-ground')){
      anims.create({
        key: 'firmin-jump-ground',
        frames: [{ key: 'firmin', frame: 6 }],
        frameRate: 1,
      });
    }

    if(!anims.exists('firmin-look-up')){
      anims.create({
        key: 'firmin-look-up',
        frames: anims.generateFrameNumbers('firmin', {start: 0, end: 1}),
        frameRate: 1,
        repeat: -1
      });
    }

    if(!anims.exists('firmin-look-down')){
      anims.create({
        key: 'firmin-look-down',
        frames: anims.generateFrameNumbers('firmin', {start: 2, end: 3}),
        frameRate: 1,
        repeat: -1
      });
    }

    if(!anims.exists('firmin-enter')){
      anims.create({
        key: 'firmin-enter',
        frames: anims.generateFrameNumbers('firmin', {start: 10, end: 16}),
        framRate: 7,
        repeat: 1
      });
    }

    if(!anims.exists('firmin-teleport')){
      anims.create({
        key: 'firmin-teleport',
        frames: anims.generateFrameNumbers('firmin', {start: 17, end: 29}),
        //framRate: 1,
        duration: 1500,
        repeat: 0,
        hideOnComplete: true,
      });
    }
  }
  
  initCamera(){
    this.cameraEnabled = true; // control variable

    this.offSetX = 0;
    this.offSetY = 50;

    this.camera = this.scene.cameras.main;
    this.camera.startFollow(this);
    this.camera.setZoom(2);
    this.camera.followOffset.set(this.offSetX, this.offSetY);
  }
  
  update(cursors) {
    if (!this.controlsEnabled) { return }
    if (!this.cameraEnabled) { this.camera.followOffset.set(this.offSetX, this.offSetY); }
    
    this.cameraEnabled = false;

    if (this.ESCMENU.isDown) {
      this.scene.scene.sleep();
      this.scene.scene.launch('EscMenu', { from: this.scene.scene.key });

      const escMenuInstance = this.scene.scene.get('EscMenu');

      if (escMenuInstance.data !== null) {
        escMenuInstance.events.once('quickTravelResult', (data) => {
          this.controlsEnabled = false;
          this.setVelocity(0, 0);
          this.anims.play('firmin-teleport', true);
          
          this.once('animationcomplete-firmin-teleport', () => {
            this.executeTeleportation(data);
          });
        });
      }
    }
    
    if (this.MOVERIGHT.isDown) {
      this.body.setVelocityX(this.movementSpeed);
      if (this.onGround) { this.anims.play('firmin-walk', true); }
      this.flipX = true;
    }
    else if (this.MOVELEFT.isDown) {  
      this.body.setVelocityX(-this.movementSpeed);
      if (this.onGround) { this.anims.play('firmin-walk', true); }
      this.flipX = false;
    }
    else {
      this.setVelocityX(0);
      if (this.onGround) {
        if (this.LOOKUP.isDown) {
          this.cameraEnabled = true;
          this.camera.followOffset.set(this.offSetX, this.offSetY + 20);
          this.anims.play('firmin-look-down', true);
        }
        else if (this.LOOKDOWN.isDown) {
          this.cameraEnabled = true;
          this.camera.followOffset.set(this.offSetX, this.offSetY - 20);
          this.anims.play('firmin-look-up', true);
        }
        else {
          this.anims.play('firmin-idle', true);
        }
      }
    }

    // TODO: Interact with E.

    // TOOD: Look UP, Look DOWN.
    
    if (this.onGround && this.JUMP.isDown) { this.startJump(); }

    if (this.body.velocity.y !== 0) { this.jump(false); }

    if (!this.onGround && this.body.velocity.y === 0) { this.endJump(); 

    }
  }

    executeTeleportation(data) {
    this.scene.scene.start('Transitions', {
      next: 'Transitions',
      next: 'City',
      args: {street : data.street, spawn: 'building'},
      name: 'subway', // PLACEHOLDER, IT WILL BE HIS OWN TRANSITON
      ui: null,
      entry: 'fade',
      exit: 'fade'
    });
    }

  startJump() {
    const jumpDelay = 120;
    this.anims.play('firmin-jump-ground', true);
    this.jump(true); 
  }

  jump(impulse) {
    this.onGround = false;
    if (impulse) { this.setVelocityY(this.jumpForce); }
    this.anims.play('firmin-jump-air', true);
  }

  endJump() {
    this.anims.play('firmin-jump-ground', true);
    this.scene.time.delayedCall(100, () => {
      this.onGround = true;
    });
  }
}
