import { Scene } from "phaser";
import Player from "../models/Player";

export class Game extends Scene {
  private player!: Player;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.setPath("assets");
    this.load.image("background", "bg.png");
    this.load.image("logo", "logo.png");
  }

  create() {
    this.add.image(512, 384, "background");

    this.player = new Player(this, 512, 384, 18);
  }

  update(_time: number, delta: number) {
    this.player.update(delta / 1000); // delta viene en ms, lo pasamos a segundos
  }
}
