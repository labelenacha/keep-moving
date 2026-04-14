import * as Phaser from "phaser";

export default class Player {
  private scene: Phaser.Scene;
  private gfx: Phaser.GameObjects.Graphics;

  x: number;
  y: number;
  radius: number;
  speed: number;

  private keys: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene, x = 512, y = 384, radius = 16, color = 0xffffff) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 220;

    this.gfx = scene.add.graphics();
    this.gfx.setDepth(10);

    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error("Keyboard input no está disponible en esta escena.");

    this.keys = {
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      a: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      d: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      w: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      s: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    };

    this.draw(color);
  }

  update(dtSeconds: number) {
    let dx = 0;
    let dy = 0;

    if (this.keys.left.isDown || this.keys.a.isDown) dx -= 1;
    if (this.keys.right.isDown || this.keys.d.isDown) dx += 1;
    if (this.keys.up.isDown || this.keys.w.isDown) dy -= 1;
    if (this.keys.down.isDown || this.keys.s.isDown) dy += 1;

    // normalizar diagonal
    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      dx /= len;
      dy /= len;
    }

    this.x += dx * this.speed * dtSeconds;
    this.y += dy * this.speed * dtSeconds;

    this.redraw();
  }

  private draw(color: number) {
    this.gfx.clear();
    this.gfx.fillStyle(color, 1);
    this.gfx.fillCircle(this.x, this.y, this.radius);
  }

  private redraw() {
    // si luego quieres optimizar, se puede pasar a un Arc/Shape o RenderTexture.
    this.draw(0xffffff);
  }

  destroy() {
    this.gfx.destroy();
  }
}
