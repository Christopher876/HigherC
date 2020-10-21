import { Functions } from "./Functions";

export class Interpreter {
    source : string;
    #position : number;

    //Variables
    globalVariables : string[];
    localVariables : string[];

    constructor(source : string, position : number = 0) {
        this.source = source;
        this.#position = position;
        this.globalVariables = [];
        this.localVariables = [];
    }

    Step() : string {
        const next = this.source[this.#position];
        this.#position++;
        return next;
    }

    Execute(){
        let next = this.Step();
        let word : string[] = [];

        // While we are not whitespace
        while(!/^\s+$/.test(next)){
            word.push(next);
            next = this.Step();
        }
    }
}