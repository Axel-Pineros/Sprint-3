import { MathApp } from '../../n1/app';
import Middlewares from '../../n1/middlewares';

jest.mock('fs', () => ({
    readFileSync: jest.fn(() => '{"num1": 5, "num2": 3}'),
}));

describe('Middlewares i MathApp', () => {

    describe('MathApp', () => {
        let mathApp: MathApp;

        beforeEach(() => {
            mathApp = new MathApp();
        });

        describe('sum()', () => {
            test('Calcula la suma de 2 números amb la intervenció del middleware', () => {
                const result = mathApp.sum({ num1: 5, num2: 3 });
                expect(result).toBe(8177);
            });
        });

        describe('subtract()', () => {
            test('Calcula la resta de 2 números amb la intervenció del middleware', () => {
                const result = mathApp.subtract({ num1: 5, num2: 3 });
                expect(result).toBe(7448);
            });
        });

        describe('multiply()', () => {
            test('Calcula la multiplicació de 2 números amb la intervenció del middleware', () => {
                const result = mathApp.multiply({ num1: 5, num2: 3 });
                expect(result).toBe(2847656.25);
            });
        });
    });

    describe('Middlewares', () => {
        let middlewares: Middlewares;

        beforeEach(() => {
            middlewares = new Middlewares();
        });

        describe('square()', () => {
            test(`Calcula correctament el quadrat d'un número`, () => {
                const result = middlewares.square(4);
                expect(result).toBe(16);
            });
        });

        describe('cube()', () => {
            test(`Calcula correctament el cub d'un número`, () => {
                const result = middlewares.cube(3);
                expect(result).toBe(27);
            });
        });

        describe('divideByTwo()', () => {
            test(`Calcula correctament la divisió entre 2 d'un número`, () => {
                const result = middlewares.divideByTwo(10);
                expect(result).toBe(5);
            });
        });
    });
});