import { Functions } from "./Functions";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


export interface IHash {
    [details: string] : string;
}

export class Interpreter {
    EOF : boolean = false;
    source : string;
    position : number;
    #types : string[];

    globalVariables : IHash = {};
    localVariables : string[];

    set Position(newPosition : number){
        if(newPosition <= this.source.length){
            this.position = newPosition;
        }
        else{
            this.EOF = true;
        }
    }

    constructor(source : string, position : number = 0) {
        this.source = source;
        this.position = position;
        this.localVariables = [];
        //this.#stack = [];
        this.#types = [];
    }

    RegisterTypes(){
        //Defualt types
        this.#types.push("int","float","string");
    }

    Step() : string {
        const next = this.source[this.position];
        this.Position = this.position + 1;
        return next;
    }

    Execute(){
        let next = this.Step();
        let word : string[] = [];
        const line : string[] = [];

        while(!this.EOF && next !== "\n"){
            // Skip whitespace
            while(/^\s+$/.test(next)){
                next = this.Step();
            }

            // While we are not whitespace
            while(!/^\s+$/.test(next) && next !== "\n" && !this.EOF){
                if(word){
                    word.push(next);
                    next = this.Step();
                }
                else{
                    break;
                }
            }

            if(word.length > 0){
                line.push(word.toString());
                word = [];
            }
        }
    }
}
