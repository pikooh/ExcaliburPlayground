declare var globals: any;
import * as ex from "excalibur";
import { ScoreCounter } from "./Timer";
import { MoneyEffect } from "./Effects";

export class Blob extends ex.Actor {
  private _speed: number;
  private _scoreCounter: ScoreCounter;

  constructor(x, y) {
    super(x, y,
          globals.conf.BLOB.WIDTH,
          globals.conf.BLOB.HEIGHT);

    this._speed = globals.conf.BLOB.SPEED;
    this._scoreCounter = globals.scoreCounter;

    this.collisionType = ex.CollisionType.Passive;

    this.on("pointerdown", (event) => {
      this.kill();
      this._scoreCounter.updateScore(globals.conf.BLOB.WORTH);

      this.scene.add(new MoneyEffect(this.pos.x, this.pos.y));
    });

    let nrOfPoints = ex.Util.randomIntInRange(3, 6);

    for(let i = 0; i < nrOfPoints; i++) {
      let randomX = ex.Util.randomIntInRange(200, 800);
      let randomY = ex.Util.randomIntInRange(200, 600);

      this.actions.moveTo(randomX, randomY, this._speed).delay(500);
    }

    this.actions.repeatForever();
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureBlob, 1, 2, 57, 34);

    let speed = globals.conf.BLOB.ANIM_SPEED;

    let walkAnim = spriteSheet.getAnimationByIndices(engine,[0,1], speed);
    walkAnim.loop = true;
    this.addDrawing("walk", walkAnim);

    this.setDrawing("walk");

    // Remove Blob after X seconds
    let blobRemovalTimer = new ex.Timer(() => {
      this.kill();
    }, globals.conf.BLOB.LIFETIME * 1000, true);

    engine.add(blobRemovalTimer);
  }
}
