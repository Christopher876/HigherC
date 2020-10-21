import fs from 'fs';
import { Interpreter } from "./Interpreter";

const source = fs.readFileSync("higherc-scripts/assign-var.hc",'utf8');
const interpreter = new Interpreter(source);

interpreter.Execute();
interpreter.Execute();
interpreter.Execute();
interpreter.Execute();