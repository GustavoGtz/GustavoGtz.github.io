// This is gonna be the inside of the main building in Profile Street
// It will show the profile information such as
// name, degree, mail, linkedin
// Inforamton about the project itself.
// Readme???
// Interests

import Firmin from '../gameobjects/firmin.js'

export default class ProfileBuilding extends Phaser.Scene {
  constructor() {
    super('ProfileBuilding');
  }

  create() {
    this.street = 'profile';

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
