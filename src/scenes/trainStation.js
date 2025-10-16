// This will be the scene where ALL the subway stations will be.
// Its very similar in structure but
// Acordin to a "string" it will change little thinks
// like the decoration and the exit.

import Firmin from '../gameobjects/firmin.js'

export default class TrainStation extends Phaser.Scene {
  constructor(){
    super('TrainStation');
  }

  /*
   * data structure
   *
   * station: The station of subway to spawn
   * spawn: Where it's going to spawn the character
   *        It can be:
   *         - subway
   *         - exitDoor
  */
  init(data) {
    this.station = data.station;
    this.firmin = new Firmin(this, 50, 50);
  }

  create() {
    console.log(this.station);
  }
}
