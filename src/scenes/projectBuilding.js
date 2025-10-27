// This is gonna be the inside of the main building in Projects Street
// It will show the project information such as
// project and his details about it

import Firmin from '../gameobjects/firmin.js'

export default class ProjectBuilding extends Phaser.Scene {
  constructor() {
    super('ProjectBuilding');
  }

  create() {
    this.street = 'project';

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
