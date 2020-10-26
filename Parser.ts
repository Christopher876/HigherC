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

    error(){
        throw new Error("Parser has encountered a problem");
    }

    Parse(input : string[]){
        // if(input){
        //     // Get the type first
        //     const type = input[0];

        //     // Get the name
        //     let name = "";
        //     try {
        //         name = input[1];
        //     } catch (error) {
        //         console.log("Expected variable name");
        //     }

        //     // Get the value we need
        //     let value = "";
        //     try{
        //         value = input[3];
        //     } catch(error){
        //         console.log(`Expected a ${type}`);
        //     }

        //     this.globalVariables[name] = [type,value];
        // }

        const tokens : Token[] = [];
        input.forEach(currentValue => {
            // Are we a digit
            if(/^\d+$/.test(currentValue)){
                tokens.push(new Token(this.symbols.INTEGER,currentValue));
                return;
            }

            else if(currentValue === "+"){
                tokens.push(new Token("PLUS",currentValue));
                return;
            }

            else if(currentValue === "-"){
                tokens.push(new Token("MINUS",currentValue));
                return;
            }

            else if(currentValue === "*"){
                tokens.push(new Token("MULTIPLY",currentValue));
                return;
            }

            else if(currentValue === "/"){
                tokens.push(new Token("DIVIDE",currentValue));
                return;
            }

            else{
                this.error();
            }
        });

        // Calculate
        let result : number = +tokens[0].value;
        tokens.shift();

        while(tokens.length !== 0){
            let token = tokens.shift(); // Get the operator
            if(token){
                switch(token.type){
                    case this.symbols.PLUS:
                        token = tokens?.shift();
                        if(token){
                            result = result + +token.value;
                        }
                        break;
                    case this.symbols.MINUS:
                        token = tokens?.shift();
                        if(token){
                            result = result - +token.value;
                        }
                        break;
                    case this.symbols.MULTIPLY:
                        token = tokens?.shift();
                        if(token){
                            result = result * +token.value;
                        }
                        break;
                    case this.symbols.DIVIDE:
                        token = tokens?.shift();
                        if(token){
                            if(+token.value != 0)
                                result = result / +token.value;
                            else
                                this.error();
                        }
                        break;
                }
            }

        }
        console.log(result);

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
}