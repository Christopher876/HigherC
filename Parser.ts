import { Token } from "./Token";
import "./CSymbol";
import { CSymbol } from "./CSymbol";

export interface IHash {
    [details: string] : [string,string];
}


export class Parser{
    globalVariables : IHash = {};
    localVariables : string[] = [];
    symbols : CSymbol = new CSymbol();
    input : string[];
    tokens : Token[];
    currentToken : Token = new Token();
    pos : number;

    constructor(input : string[]){
        this.input = input;
        this.tokens = [];
        this.pos = 0;
    }

    error(){
        throw new Error("Parser has encountered a problem");
    }

    eat(token_type : string){
        if (token_type === this.currentToken.type){
            this.currentToken = this.tokens[++this.pos];
        }
    }

    factor() : number{
        const token = this.currentToken;
        this.eat("INTEGER");
        return +token.value;
    }

    term(){
        let result : number = this.factor();
        while((this.pos <= this.input.length-1) && (this.currentToken.type === this.symbols.MULTIPLY || this.currentToken.type === this.symbols.DIVIDE)){
            let token = this.currentToken;
            if(this.currentToken.type === this.symbols.MULTIPLY){
                this.eat(this.symbols.MULTIPLY);
                result = result * this.factor();
            }

            else if (this.currentToken.type === this.symbols.DIVIDE){
                this.eat(this.symbols.DIVIDE);
                result = result / this.factor();
            }
        }
        return result;
    }

    Parse(){
        this.input.forEach(currentValue => {
            // Are we a digit
            if(/^\d+$/.test(currentValue)){
                this.tokens.push(new Token(this.symbols.INTEGER,currentValue));
                return;
            }

            else if(currentValue === "+"){
                this.tokens.push(new Token("PLUS",currentValue));
                return;
            }

            else if(currentValue === "-"){
                this.tokens.push(new Token("MINUS",currentValue));
                return;
            }

            else if(currentValue === "*"){
                this.tokens.push(new Token("MULTIPLY",currentValue));
                return;
            }

            else if(currentValue === "/"){
                this.tokens.push(new Token("DIVIDE",currentValue));
                return;
            }

            else{
                this.error();
            }
        });

        // Calculate
        this.currentToken = this.tokens[0];
        let result : number = this.term();

        while((this.pos <= this.input.length-1) && (this.currentToken.type === this.symbols.PLUS || this.currentToken.type === this.symbols.MINUS)){
            let token = this.currentToken;
            if(this.currentToken.type === this.symbols.PLUS){
                this.eat(this.symbols.PLUS);
                result = result + this.term();
            }

            else if (this.currentToken.type === this.symbols.MINUS){
                this.eat(this.symbols.MINUS);
                result = result - this.term();
            }
        }

        return result;
    }

        // for (let i = 0; i < tokens.length;) {
        //     const first = tokens[i].value;
        //     const op = tokens[i+1];
        //     const second = tokens[i+2].value;

        //     if(op.type === this.symbols.PLUS){
        //         result = +result + +first + +second;
        //     }

        //     else if(op.type === this.symbols.MINUS){
        //         result = +result + +first - +second;
        //     }

        //     else if(op.type === this.symbols.MULTIPLY){
        //         result = +first * +second;
        //     }

        //     else if(op.type === this.symbols.DIVIDE){
        //         result = +first / +second;
        //     }

        //     console.log(result);
        //     if((i+2) < tokens.length-1)
        //         i = i+3;
        //     else
        //         break;
        // }
}
