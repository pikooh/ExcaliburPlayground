import * as ex from "excalibur";
import {Config} from "./config/Config";

export class Storage {
    static set(key:string, value:any):void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    static get(key:string, defaultValue?: any):any {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else if (typeof defaultValue !== "undefined") {
            return defaultValue;
        } else {
            console.warn(`Key "${key}" not found in LocalStorage.`);
            return false;
        }
    }

    static getLevelData(levelID: string): SavedLevelData {
        let levelData = Storage.get(levelID, levelID);

        return SavedLevelData.make(levelData);
    }

    /**
     * Gets the scores for a specific level, adds a new score and saves it again.
     * 
     * @param levelID string
     * @param score number
     */
    static saveScore(levelID: string, score: number): SavedLevelData {
        let storedData = Storage.getLevelData(levelID);

        storedData.addScore(score);

        Storage.set(levelID, storedData);

        return storedData;
    }

    /**
     * Mainly used for debugging - clears all saved data.
     */
    static clearAll(): void {
        localStorage.clear();
    }
}

export class SavedLevelData {
    public levelID: string;
    public scores: Array<number>;

    constructor(id: string, scores?: Array<number>) {
        this.levelID = id;
        this.scores = scores || [];
    }

    getSortedScores(): Array<number> {
        return this.scores.sort((a, b) => a - b).reverse();
    }

    /**
     * Adds a new score to the scores and removes the worst if there are more
     * scores than allowed.
     * Only new scores are saved, it won't be saved if it's the same score!
     * 
     * @param newScore 
     */
    addScore(newScore: number): void {
        if (this.scores.indexOf(newScore) < 0) {
            this.scores.push(newScore);
        }

        if (this.scores.length > Config.GAME.STORAGE.NROFSCORESSAVED) {
            let nrOfScoresToRemove = this.scores.length - Config.GAME.STORAGE.NROFSCORESSAVED;
            this.scores = this.getSortedScores().splice( -nrOfScoresToRemove, nrOfScoresToRemove);
        }
    }

    static make(setup: any): SavedLevelData {
        if (setup.levelID && setup.scores && Array.isArray(setup.scores)) {
          return new SavedLevelData(setup.levelID, setup.scores);
        } else if (setup.levelID) {
          return new SavedLevelData(setup.levelID);
        } else if (typeof setup === "string") {
          return new SavedLevelData(setup);          
        } else {
          console.warn("Can't make new SavedLevelData without proper data!");
        }
    }
}