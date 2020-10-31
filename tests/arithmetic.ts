import "mocha";
import { expect } from "chai";
import { Interpreter } from "../Interpreter";

describe('Interpreter Arithmetic', () => {
    const interpreter = new Interpreter();
    let problem = "";

    it('add', () => {
        problem = "9+1";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(10);
    });
    it('subtract', () => {
        problem = "9-1";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(8);
    });
    it('multiplication', () => {
        problem = "9*2";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(18);
    });
    it('division', () => {
        problem = "9/3";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(3);
    });
    it('Complicated Addition and Multiplication', () => {
        problem = "7+9*2";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(25);
    });
    it("Nested Parenthesis", () => {
        problem = "5+2*(12/(16/(3 + 2)-1))";
        interpreter.source = problem;
        const result = interpreter.Execute();
        interpreter.Reset();
        expect(+result).equal(21);
    })
});