// TODO:
// Keep adding the elements to be loaded

import c64FontPng from '../assets/fonts/commodoreFont.png';
import c64FontXml from '../assets/fonts/commodoreFont.xml';

export default class Loader extends Phaser.Scene {
  constructor() {
    super("Loader");
  }

  preload() {
    this.createLoadingScreen();
    this.setLoadEvents();
    this.loadFonts();
    this.loadAudios();
    this.loadSprites();
  }

  createLoadingScreen(){
  }

  setLoadEvents(){
    this.load.on(
      "complete",
      () => {
        this.scene.start("Terminal");
      },
      this);
  }

  loadFonts(){
    this.load.bitmapFont('c64', c64FontPng, c64FontXml);

  }

  loadAudios(){
  }

  loadSprites(){
  }
}
