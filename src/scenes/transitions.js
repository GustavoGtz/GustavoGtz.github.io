// TODO's:
// 1. Change the dispatch to a dynamical one
export default class Transitions extends Phaser.Scene {
  constructor() {
    super('Transitions');
  }

  /* Structure of Data
   *
   * next: The name of the scene to be loaded
   * args: If the scene to be loaded has arguments
   * name: The name of the transition to be showed
   *       Actual possibles values:
   *         - subway
   *         - teleport
   *         - wipe
   * time: The duration of the transition. It can be NULL if the
   *       time depends by the user or the animation itthis
   * ui:   The elements to be displayed in front of the transition.
   *       It can be NULL if it's no UI to show
   *       Actual possibles values:
   *         - tutorial
   *         - stationSelection
   *         - null
   */
  
  init(data) {
    this.next = data.next;
    this.args = data.args;
    this.name = data.name;
    this.time = data.time;
    this.ui   = data.ui;
  }

  create() {
    // TODO: Ajustar la pantalla
    //       y guardar variables importantes

    // TODO: Desplegar la animacion
    this.playTransition();

    // TODO: Desplegar la UI
    this.showUI();

    // TODO: If the time is NOT NONE
    //       Create a time manager to controll the exit
    //       if not, let the user manage the exit time
  }

  playTransition() {
    switch(this.name) {
      case 'subway':
        this.playSubwayTransition();
        break;
      case 'teleport':
        this.playTeleportTransition();
        break;
      case 'wipe':
        this.playWipeTransition();
        break;
      default:
        console.log("Not any valid Transition selected");
        break;
    }
  }

  playSubwayTransition() {
    console.log("SUBWAY TRANSITION");
  }
  
  playTeleportTransition() {
    console.log("TELEPORT TRANSITION");
  }

  playWipeTransition() {
    console.log("WIPE TRANSITION");
  }

  showUI() {
    switch(this.ui) {
      case 'tutorial':
        this.showTutorialUI();
        break;
      case 'stationSelection':
        this.showStationSelectionUI();
        break;
      default:
        console.log("Not any UI selected");
        break;
    }
  }

    showTutorialUI() {
      console.log("TUTORIAL UI");
    }

    showStationSelectionUI() {
      console.log("STATION SELECTION UI");
      // In this UI, the user can change 'this.next' and 'this.args'
    }

  loadNext(){
    // TODO: Se detienen los sonidos
    this.scene.start(this.next, this.args);
  }
}

