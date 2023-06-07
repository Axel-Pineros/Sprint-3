// import {sumar,restar,multiplicar} from "../../n1/n1-e1"


//const data: Operations = JSON.parse(readFileSync('data.json', 'utf-8'));

describe("Middleware", () => {

    const { sumar, restar, multiplicar } = require("../../n1/n1-e1");
    // import * as fs from 'fs';

    const data: Operations = require('./data.json')

    interface Operations {
        a: number;
        b: number;
    }
    describe("Funcions sumar, restar i multiplicar", () => {


        describe("Funció sumar", () => {

            test('Retorna la suma de 2 números', () => {
                expect(sumar(data.a, data.b)).toBe(8);
            });
        });

        describe("Funció restar", () => {

            test('Retorna la resta de 2 números', () => {
                expect(restar(data.a, data.b)).toBe(2);
            });
        });

        describe("Funció multiplicar", () => {

            test('Retorna la multiplicació de 2 números', () => {
                expect(multiplicar(data.a, data.b)).toBe(15);
            });
        });
    });
});