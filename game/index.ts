/// <reference path="../bower_components/excalibur-tiled/dist/excalibur-tiled" />
declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./Config";
import {Resources} from "./Resources";
import {Player} from "./Player";
// TODO: inheritance yo
import {RabbitFoodStation} from "./RabbitFoodStation";
import {ElephantFoodStation} from "./ElephantFoodStation";
import {Blob} from "./Blob";
import {FoodStation} from "./FoodStation";
import {Food} from "./Item";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";
import {CustomerSpawner} from "./CustomerSpawner";

import {Storage} from "./Storage";
import {MainMenu} from "./MainMenu";
import {EndGameScreen} from "./EndGameScreen";
import {Timer} from "./Timer";
import {ScoreCounter} from "./ScoreCounter";

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
globals.game = game;
globals.conf = Config;
globals.resources = Resources;
globals.storage = new Storage();

game.add("menu", new MainMenu(game));

let endScene = new ex.Scene();
let endScreen = new EndGameScreen();
endScene.add(endScreen);
game.add("end", endScene);

// TODO: menu/endscreen/game as custom scenes, override onActivate to make game replayable!
let gameScene = new ex.Scene();
let elephantFoodStation = new ElephantFoodStation(300, 300, new Food(globals.conf.ELEPHANTFOOD_NAME, globals.conf.ELEPHANTFOOD_COLOR));
gameScene.add(elephantFoodStation);

let rabbitFoodStation = new RabbitFoodStation(600, 300, new Food(globals.conf.RABBITFOOD_NAME, globals.conf.RABBITFOOD_COLOR));
gameScene.add(rabbitFoodStation);

let inv = new Inventory();
gameScene.add(inv);

let scoreCounter = new ScoreCounter(300, 30);
globals.scoreCounter = scoreCounter;
gameScene.add(scoreCounter);

let player = new Player(inv);
globals.player = player;
gameScene.add(player);

// player moves wherever is clicked - TODO: how to cancel this on "real" targets?
//game.input.pointers.primary.on("down", (evt: PointerEvent) => {
//  player.goTo(evt);
//});

let spawner = new CustomerSpawner(500, 520, 200, 20, ex.Color.White);
gameScene.add(spawner);

let blob = new Blob(550, 50);
gameScene.add(blob);

let timer = new Timer(700, 30, 10);
gameScene.add(timer);
game.add("game", gameScene);

globals.startMenu = () => {
  game.goToScene("menu");
};

globals.endScreen = () => {
  game.goToScene("end");
};

// TODO: levels
globals.startGame = () => {
  game.goToScene("game");
};

// Create a new TiledResource loadable
var map = new Extensions.Tiled.TiledResource("game/assets/test.json");

var loader = new ex.Loader([map]);

for (let r in globals.resources) {
  loader.addResource(globals.resources[r]);
}


game.start(loader).then(function(){
  // Process the data in the map as you like
  map.data.tilesets.forEach(function(ts) {
    console.log(ts.image, ts.imageTexture.isLoaded());
  });

  // get a Excalibur `TileMap` instance
  var tm = map.getTileMap();

  // draw the tile map
  gameScene.add(tm);

  globals.startMenu();
});
