declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter, Timer} from "./Timer";
import {FoodStation} from "./FoodStation";
import {Levels} from "./config/Levels";

import {PreGameScene} from "./scenes/PreGameScene";
import {LevelScene} from "./scenes/LevelScene";
import {EndGameScene} from "./scenes/EndGameScene";


export class Director {
    private _currentLevelName: string;
    private _levelData: any;

    private _intro: PreGameScene;
    private _game: LevelScene;
    private _outro: EndGameScene;

    constructor(introScene: PreGameScene, gameScene: LevelScene, outroScene: EndGameScene) {
        this._intro = introScene;
        this._game = gameScene;
        this._outro = outroScene;
    }

    loadLevelData(levelIdentifier:string): any {
        this._currentLevelName = levelIdentifier;
        this._levelData = Levels.getLevel(levelIdentifier);
        return this._levelData;
    }
    
    startLevel() {
        /*
        this.startTime();

        if(this.getLevelData().STATIONS.DECAY && this._stations) {
            //let decayTimer = new ex.Timer(() => {
            // TODO: ewwwwwwww
            setTimeout(() => {
                let randomStation = this._stations[ex.Util.randomIntInRange(0, this._stations.length - 1)];
                randomStation.breakDown();
            }, 10000);
            //}, 10000, false);
        }
        */
    }

    getLevelData(key?: string): any {
        if(key && this._levelData[key]) {
            return this._levelData[key];
        } else if (key) {
            return null;
        } else {
            return this._levelData;
        }
    }

    endLevel():void {
        globals.endScreen();
    }

    onTimeLimitReached() {
        this.endLevel();
    }

    // A level set consists of an intro level, a game level and an endgame scene. The director is responsible for creating and switching between these levels.
    public loadLevelSet(mapName: string):void {
        let setup = this.loadLevelData(mapName);

        if (setup.INTRO) {
            this._intro.load(setup, () => this.onIntroDone());
            globals.preScreen();
        } else {
            this._game.load(setup, this.onGameDone);
            globals.gameScreen();
        }
    }

    public onIntroDone():void {
        this._game.load(this._levelData, results => this.onGameDone(results));
        globals.gameScreen();
    }
    
    public onGameDone(result): void {
        this._outro.load(this._levelData, result, () => this.onEndSceneDone());
        globals.endScreen();
    }

    public onEndSceneDone(): void {
        if (this._levelData.NEXT) {
            globals.loadNextLevel(this._levelData.NEXT);
        } else {
            globals.startMenu();
        }
    }


}