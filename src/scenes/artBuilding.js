// This is gonna be the inside of the main building in Art Street
// It will show the portfolio art such as
// Sprites, Drawings,
// Anything artistic.

import Firmin from '../gameobjects/firmin.js'

export default class ArtBuilding extends Phaser.Scene {
  constructor() {
    super('ArtBuilding');
  }

  create() {
    this.street = 'art';

    //this.buildArtBuildingTilemap();
    //this.buildFirmin();

    //this.setBounds();
    //this.setExit();
  }

  exitBuilding(){
    this.scene.start('Transitions', {
      next: 'Street',
      args: {street: this.street, spawn: 'building'},
      name: 'black',
      duration: 500,
      ui: null,
      entry: 'fade',
      exit: 'fade'
    });
  }
}
