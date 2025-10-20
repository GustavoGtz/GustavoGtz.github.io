export default class EscMenu extends Phaser.Scene {
  constructor() {
    super("EscMenu");
  }

  init(data) {
    this.from = data.from;
  }

  create() {

    this.addControls();
    
    // Fondo semi-transparente
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);

    // Texto del menú
    this.add.text(300, 250, "PAUSED", { fontSize: "48px", color: "#ffffff" });

    // Botón para reanudar
    const resumeText = this.add.text(340, 330, "Press ESC to Resume", {
      fontSize: "20px",
      color: "#ffff00",
    });
  }

  addControls() {
    this.GOBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.GOBACK.on("down", () => {
      this.returnToScene();
    });
  }

  returnToScene() {    
    this.scene.stop();       
    this.scene.wake(this.from);
  }

  quickTravel(destinationStreet) {
    this.events.emit(
      'quickTravelResult',
      {street : destinationStreet});
    this.returnToScene();
  }
}
