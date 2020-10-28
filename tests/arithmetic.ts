import "mocha";
import { expect } from "chai";
import { Interpreter } from "../Interpreter";

describe('Interpreter Arithmetic', function() {
    const interpreter = new Interpreter();
    let problem = "";

    it('add', function() {
        problem = "9+1";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(10);
    });
    it('subtract', function(){
        problem = "9-1";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(8);
    });
    it('multiplication', function(){
        problem = "9*2";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(18);
    });
    it('division', function(){
        problem = "9/3";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(3);
    });
    it('Complicated Addition and Multiplication', function(){
        problem = "7+9*2";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(25);
    });
});