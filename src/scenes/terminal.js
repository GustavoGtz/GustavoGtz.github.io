// This contains all the logic to display the "title screen" which is an simple
// press space to continue but dreesed up as a commodore terminal
import fontPng from '../assets/fonts/commodoreFont.png';
import fontXml from '../assets/fonts/commodoreFont.xml';

export default class Terminal extends Phaser.Scene {
  constructor() {
    super('Terminal');
  }

 preload() {
    const fontKey = 'c64';
    this.load.bitmapFont(fontKey, fontPng, fontXml);
}


  create() {
    this.cameras.main.setBackgroundColor('#50459b');
    this.textColor = '#887ecb';
    this.fontSize = 20;
    
    this.welcomeText = '64K RAM SYSTEM 38911 BASIC BYTES'
    this.add.bitmapText(0, 0 , 'c64', this.welcomeText, 20);

    
    /*
   this.textLines = [
      '**** FIRMIN 64 BASIC V2 ****',
      '64K RAM SYSTEM  38911 BASIC BYTES FREE',
      '',
      'TYPE START() OR PRESS SPACE TO RUN'
    ];

    let testtext = this.displayText = this.add.text(20, 40, '', {
      fontFamily: this.fontFam,
      fontSize: this.fontSize,
      color: this.textColor,
      lineSpacing: 8
    });
    testtext.setResolution(1);

    this.cursor = this.add.text(20, 150, '█', {
      fontFamily: 'Courier',
      fontSize: 14,
      color: this.textColor
    }); */

    

    this.cursorVisible = true;
    this.inputBuffer = '';

    this.lineIndex = 1;
    this.typeNextLine();

    // Blinking cursor
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        this.cursorVisible = !this.cursorVisible;
        this.cursor.setVisible(this.cursorVisible);
      }
    });

    this.input.keyboard.on('keydown', this.handleInput, this);
  }

  typeNextLine() {
    if (this.lineIndex < this.textLines.length) {
      this.displayText.text += this.textLines[this.lineIndex] + '\n';
      this.lineIndex++;
      this.time.delayedCall(400, this.typeNextLine, [], this);
    } else {
      this.displayText.text += '\nREADY.\n';
    }
  }

  handleInput(e) {
    if (e.key === ' ') {
      this.startGame();
    } else if (e.key === 'Enter') {
      if (this.inputBuffer.trim().toLowerCase() === 'start()') {
        this.startGame();
      } else {
        this.displayText.text += '\nSYNTAX ERROR\nREADY.\n';
        this.inputBuffer = '';
      }
    } else if (e.key === 'Backspace') {
      this.inputBuffer = this.inputBuffer.slice(0, -1);
      this.updatePrompt();
    } else if (e.key.length === 1) {
      this.inputBuffer += e.key;
      this.updatePrompt();
    }
  }

  updatePrompt() {
    this.prompt?.destroy();
    this.prompt = this.add.text(
      20,
      this.displayText.y + this.displayText.height,
      `READY. ${this.inputBuffer}`,
      { fontFamily: 'Courier', fontSize: 14, color: this.textColor }
    );
  }

  startGame() {
    this.scene.start('GameScene');
  }
}