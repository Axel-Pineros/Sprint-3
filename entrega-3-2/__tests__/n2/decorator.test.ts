import { CurrencyConverter } from '../../n2/decorator';

jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue(JSON.stringify({
        "USD_EUR": 0.819908,
        "GBP_EUR": 1.156661,
        "CHF_EUR": 0.913791,
        "JPY_EUR": 0.007515,
        "CAD_EUR": 0.676626,
        "CNY_EUR": 0.128563
    })),
}));

describe('CurrencyConverter()', () => {
    let converter: CurrencyConverter;

    beforeEach(() => {
        converter = new CurrencyConverter();
    });

    test('Converteix USD a Euros', () => {
        const amount = 50;
        const currency = 'USD_EUR';
        const expectedCostInEuros = 40.9954;

        const costInEuros = converter.convertToEuros(amount, currency);

        expect(costInEuros).toBeCloseTo(expectedCostInEuros);
    });

    test('Converteix GBP a Euros', () => {
        const amount = 80;
        const currency = 'GBP_EUR';
        const expectedCostInEuros = 92.53288;

        const costInEuros = converter.convertToEuros(amount, currency);

        expect(costInEuros).toBeCloseTo(expectedCostInEuros);
    });

    test('Converteix CHF a Euros', () => {
        const amount = 120;
        const currency = 'CHF_EUR';
        const expectedCostInEuros = 109.65492;

        const costInEuros = converter.convertToEuros(amount, currency);

        expect(costInEuros).toBeCloseTo(expectedCostInEuros);
    });

    test('Converteix JPY a Euros', () => {
        const amount = 1000;
        const currency = 'JPY_EUR';
        const expectedCostInEuros = 7.515;

        const costInEuros = converter.convertToEuros(amount, currency);

        expect(costInEuros).toBeCloseTo(expectedCostInEuros);
    });

    test('Converteix CAD a Euros', () => {
        const amount = 200;
        const currency = 'CAD_EUR';
        const expectedCostInEuros = 135.3252;

        const costInEuros = converter.convertToEuros(amount, currency);

        expect(costInEuros).toBeCloseTo(expectedCostInEuros);
    });

    test('Converteix CNY a Euros', () => {
        const amount = 500;
        const currency = 'CNY_EUR';
        const expectedCostInEuros = 64.2815;

        const costInEuros = converter.convertToEuros(amount, currency);

        expect(costInEuros).toBeCloseTo(expectedCostInEuros);
    });
});