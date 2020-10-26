import { Parser } from "./Parser";
import { CSymbol } from "./CSymbol";

export class Interpreter {
    EOF : boolean = false;
    source : string;
    position : number;
    #types : string[];
    parser : Parser;
    symbols : CSymbol;

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
        this.#types = [];
        this.parser = new Parser();
        this.symbols = new CSymbol();
    }

    Step() : string {
        const next = this.source[this.position];
        this.Position = this.position + 1;
        return next;
    }

    Reset(){
        this.EOF = false;
        this.position = 0;
    }

    Execute() : string{
        let next = this.Step();
        let word : string[] = [];
        const line : string[] = [];

        let isString : boolean = false;

        while(!this.EOF && next !== "\n"){
            // Skip whitespace
            while(/^\s+$/.test(next)){
                next = this.Step();
            }

            // We are a string
            if(next === "\""){
                isString = true;
                next = this.Step();

                // Get the string
                while(next !== "\""){
                    word.push(next);
                    next = this.Step();
                }

                next = this.Step();
                line.push(word.join(""));
                continue;
            }

            // While we are not whitespace
            while((!/^\s+$/.test(next) && next !== "\n" && !this.EOF)){
                if(word){
                    word.push(next);
                    next = this.Step();
                }

                // Are we a number
                if(/^\d+$/.test(word.join(""))){
                    // Get the entire number (multidigit)
                    while(true){
                        if(/^\d+$/.test(next)){
                            word.push(next);
                            next = this.Step();
                        }
                        else
                            break;
                    }

                    line.push(word.join(""));
                    word = [];
                    break;
                }

                else{
                    break;
                }
            }

            if(word.length > 0){
                line.push(word.join(""));
                word = [];
            }
        }

        //Parse the line
        this.parser.Parse(line);
        return line.join();
    }

    Shell(){
        const readline = require('readline-sync');
        let exit : boolean = false;

        const inputs : string[] = ["9+9","9 + 9"]; 

        while(!exit){
            const input = readline.question("> ");
            this.source = input;
            if(input === "exit"){
                exit = true;
                return;
            }

            while(!this.EOF){
                this.Execute();
            }
            this.Reset();
        }

        // inputs.forEach(input => {
        //     this.source = input;
        //     console.log(this.Execute());
        // });
    }
}
