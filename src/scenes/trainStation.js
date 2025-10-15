// This will be the scene where ALL the subway stations will be.
// Its very similar in structure but
// Acordin to a "string" it will change little thinks
// like the decoration and the exit.

export default class TrainStation extends Phaser.Scene {
  constructor(){
    super('TrainStation');
  }

  init(data) {
    this.station = data.station;
  }

  create() {
    console.log(this.station);
  }
}
