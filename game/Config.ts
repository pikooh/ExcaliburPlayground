declare var globals: any;
import * as ex from "excalibur";

export class Config {
    static PLAYER_SPEED    = 200;
    static PLAYER_STARTX   = 500;
    static PLAYER_STARTY   = 200;
    static PLAYER_WIDTH    = 50;
    static PLAYER_HEIGHT   = 50;
    static PLAYER_COORDS   =    {walkR: [11,18], walkUp: [19,26], idle:  5, pick: 12};

    static SPRITE_SCALE    = .5;
    static SPRITE_ANIM_SPEED = 100;

    static MonsterWalkFrameSpeed = 100;

    static STATION_DURATION = 1000;

    static CUSTOMER_WIDTH  = 128/2;
    static CUSTOMER_HEIGHT = 256/2;
    static CUSTOMER_SPEED  = 200;
    static CUSTOMER_TYPES  = [
      {color: "yellow", coords: {walkR: [29,36], walkUp: [30,37], idle: 16, pick: 30} },
      {color: "grey",   coords: {walkR: [ 0, 7], walkUp: [ 8,15], idle: 28, pick:  1} },
      {color: "red",    coords: {walkR: [44,51], walkUp: [ 4,52], idle: 38, pick: 45} },
      {color: "blue",   coords: {walkR: [33,40], walkUp: [24,41], idle: 27, pick: 34} }
    ];
    static CUSTOMER_NAMES  = [
      "Thomas",
      "Gimli",
      "James",
      "Mr. Man",
      "Albert",
      "Stephanie",
      "Frieda",
      "Polly"
    ];

    static ELEPHANTFOOD_NAME  = "Elephant Food";
    static ELEPHANTFOOD_COLOR = ex.Color.Yellow;
    static ELEPHANTFOOD_WIDTH = 424;
    static ELEPHANTFOOD_HEIGHT = 342;
    static ELEPHANTFOOD_SCALE_STATION = .2;

    static INVENTORY = {
      POS_X: 0,
      POS_Y: 0,
      COLOR: ex.Color.White,
      SPACING: 2,
      ITEMS: {
        HEIGHT: 64,
        WIDTH: 64,
        SPRITE_WIDTH: 284,
        SPRITE_HEIGHT: 284,
        MAX: 6
      }
    };


    static DOGFOOD_COLOR = ex.Color.Red;
    static CATFOOD_COLOR = ex.Color.Green;
    static DOGFOOD_NAME  = "Dog Food";
    static CATFOOD_NAME  = "Cat Food";

    // defined by electron wrapper
    static GAME_WIDTH = 1024;
    static GAME_HEIGHT = 768;

    static DOOR_POS_X = Config.GAME_WIDTH / 2;
    static DOOR_POS_Y = Config.GAME_HEIGHT;

}
