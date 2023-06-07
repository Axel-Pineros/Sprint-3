// Crea un Decorator en un arxiu que retorni una funció. Aquesta funció efectuarà una conversió de moneda a euros multiplicant pel coeficient de conversió del fitxer adjunt currency_conversions.json en funció de la divisa original.

import { readFileSync } from 'fs';

// @ts-ignore
function currencyConversion(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const currencyConversions = JSON.parse(readFileSync('currency_conversions.json', 'utf-8'));

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const amount:number = args[0];
        const currency:string = args[1];

        if (!currencyConversions.hasOwnProperty(currency)) {
            throw new Error(`La divisa ${currency} no és compatible.`);
        }

        const conversionRate:number = currencyConversions[currency];
        const euros:number = amount * conversionRate;

        return originalMethod.apply(this, [euros]);
    };
}

export class CurrencyConverter {
    @currencyConversion
    // @ts-ignore
    convertToEuros(amount: number, currency: string): number {
        return amount;
    }
}

// Crea una petita aplicació que calculi el cost d'uns quants Articles en euros a partir de les seves divises inicials, aplicant diferents conversions que usin el Decorator del punt anterior.

const converter = new CurrencyConverter();

const articles = [
    { amount: 50, currency: 'USD_EUR' },
    { amount: 80, currency: 'GBP_EUR' },
    { amount: 120, currency: 'CHF_EUR' },
    { amount: 1000, currency: 'JPY_EUR' },
];

articles.forEach((article) => {
    const costInEuros:number = converter.convertToEuros(article.amount, article.currency);
    console.log(`Cost de l'article: ${costInEuros} EUR`);
});