declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Food";

class InventoryItem extends ex.Actor {
  private _inv:Inventory;
  private _type:string;

  constructor(x, y, type: string, inv: Inventory) {
    super(x, y, globals.conf.INVENTORY.ITEMS.WIDTH, globals.conf.INVENTORY.ITEMS.HEIGHT);

    this._type = type;
    this._inv = inv;

    this.on("pointerdown", (event) => {
      this._inv.removeItem(this);
    });
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta);

    if(globals.conf.GAME.DEBUG) {
      ctx.fillStyle = 'rgb(200,0,0)';
      ctx.fillRect(this.pos.x, this.pos.y, globals.conf.INVENTORY.ITEMS.WIDTH, globals.conf.INVENTORY.ITEMS.HEIGHT);
    }
  }

  onInitialize(engine: ex.Engine): void {
    let conf = globals.conf.INVENTORY.SPRITE[this._type];
    let tex = globals.resources.TextureInventory;
    let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

    let scale_x = globals.conf.INVENTORY.ITEMS.WIDTH  / conf.w;
    let scale_y = globals.conf.INVENTORY.ITEMS.HEIGHT / conf.h;

    sprite.scale.setTo(globals.conf.STATIONS.CONF.SCALE, globals.conf.STATIONS.CONF.SCALE);
    this.addDrawing( sprite );
  }

  public getType() {
    return this._type;
  }
}

export class Inventory extends ex.Actor {
  inventory: InventoryItem[];
  private _maxItems: number;

  constructor() {
    let inv = globals.conf.INVENTORY;

    super(inv.POS_X,
          inv.POS_Y,
          inv.ITEMS.WIDTH * inv.ITEMS.MAX + ((inv.ITEMS.MAX - 1) * inv.SPACING),
          inv.ITEMS.HEIGHT);

    this.inventory = new Array<InventoryItem>();
    this._maxItems = inv.ITEMS.MAX;
  }

  public addItem(newItem: Food) {
    if ( this.inventory.length >= this._maxItems) {
      return;
    }

    let c = globals.conf.INVENTORY;
    let pos_x = this.pos.x + this.inventory.length * (c.ITEMS.WIDTH + c.SPACING);
    let pos_y = this.pos.y;

    let newActor = new InventoryItem(pos_x, pos_y, newItem.name, this);

    this.inventory.push(newActor);
    this.add(newActor);
  }

  public checkAndRemoveItem(itemToCheck: Food) {
    let itemToRemove = null;

    for (let inventoryItem of this.inventory) {
      if (inventoryItem.getType() === itemToCheck.name) {
        itemToRemove = inventoryItem;
      }
    }

    if (itemToRemove) {
      this.removeItem(itemToRemove);
      return true;
    }
    return false;
  }

  public removeItem(itemToRemove: InventoryItem) {
    this.inventory.splice( this.inventory.indexOf(itemToRemove), 1 );
    this.remove(itemToRemove);

    // Update remaining items' positions ("float" to the left)
    this.inventory.forEach((item, index) => {
      item.pos.x = globals.conf.INVENTORY.POS_X + index * (globals.conf.INVENTORY.ITEMS.WIDTH + globals.conf.INVENTORY.SPACING);
    });
  }

  public resetState():void {
    this.inventory.forEach((item) => {
      this.remove(item);
    });
    this.inventory = new Array<InventoryItem>();
  }

}
