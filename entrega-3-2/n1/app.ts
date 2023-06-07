// Crea en un fitxer inicial una petita aplicació que sumi, resti i multipliqui rebent els paràmetres en un JSON.

// Crea en un fitxer extern una classe que emmagatzemi middlewares (funcions).

// Insereix a la invocació middlewares que facin el quadrat, el cub i la divisió entre 2 dels operands inicials en cadascuna de les operacions. Invoca les execucions de la suma, la resta i la multiplicació, de manera que es vagin mostrant per la consola les modificacions que es van fent als valors abans del resultat final.


import Middlewares from './middlewares';
import * as fs from 'fs';

interface OperationParams {
    num1: number;
    num2: number;
}

class MathApp {
    private middlewares: Middlewares;

    constructor() {
        this.middlewares = new Middlewares();
    }

    private applyMiddlewares(num: number, middlewares: Function[]): number {
        let result: number = num;
        for (const middleware of middlewares) {
            result = middleware(result);
        }
        return result;
    }

    sum(params: OperationParams): number {
        const { num1, num2 } = params;
        const modifiedNum1: number = this.applyMiddlewares(num1, [this.middlewares.square, this.middlewares.divideByTwo]);
        const modifiedNum2: number = this.applyMiddlewares(num2, [this.middlewares.cube, this.middlewares.divideByTwo]);

        console.log(`Sum operation: ${modifiedNum1} + ${modifiedNum2}`);
        const result = modifiedNum1 + modifiedNum2;
        return result;
    }

    subtract(params: OperationParams): number {
        const { num1, num2 } = params;
        const modifiedNum1: number = this.applyMiddlewares(num1, [this.middlewares.cube, this.middlewares.divideByTwo]);
        const modifiedNum2: number = this.applyMiddlewares(num2, [this.middlewares.square, this.middlewares.divideByTwo]);

        console.log(`Subtraction operation: ${modifiedNum1} - ${modifiedNum2}`);
        const result = modifiedNum1 - modifiedNum2;
        return result;
    }

    multiply(params: OperationParams): number {
        const { num1, num2 } = params;
        const modifiedNum1: number = this.applyMiddlewares(num1, [this.middlewares.square, this.middlewares.divideByTwo]);
        const modifiedNum2: number = this.applyMiddlewares(num2, [this.middlewares.square, this.middlewares.divideByTwo]);

        console.log(`Multiplication operation: ${modifiedNum1} * ${modifiedNum2}`);
        const result = modifiedNum1 * modifiedNum2;
        return result;
    }
}

const mathApp = new MathApp();

const paramsFile: string = fs.readFileSync('data.json', 'utf-8');
const params: OperationParams = JSON.parse(paramsFile);

const sumResult: number = mathApp.sum(params);
console.log(`Sum result: ${sumResult}\n`);

const subtractResult: number = mathApp.subtract(params);
console.log(`Subtraction result: ${subtractResult}\n`);

const multiplyResult: number = mathApp.multiply(params);
console.log(`Multiplication result: ${multiplyResult}\n`);