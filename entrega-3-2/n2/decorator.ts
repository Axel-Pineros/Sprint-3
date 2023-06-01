// Crea un Decorator en un arxiu que retorni una funció. Aquesta funció efectuarà una conversió de moneda a euros multiplicant pel coeficient de conversió del fitxer adjunt currency_conversions.json en funció de la divisa original.

import { readFileSync } from 'fs';

// Decorador per a la conversió de moneda
 // @ts-ignore
function currencyConversion(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const currencyConversions = JSON.parse(readFileSync('currency_conversions.json', 'utf-8'));

    // Guarda la funció original
    const originalMethod = descriptor.value;

    // Reescriu la funció per realitzar la conversió de moneda
    descriptor.value = function (...args: any[]) {
        const amount = args[0];
        const currency = args[1];

        if (!currencyConversions.hasOwnProperty(currency)) {
            throw new Error(`La divisa ${currency} no és compatible.`);
        }

        const conversionRate = currencyConversions[currency];
        const euros = amount * conversionRate;

        console.log(`${amount} ${currency} = ${euros} EUR`);

        // Crida la funció original amb el valor convertit a euros
        return originalMethod.apply(this, [euros]);
    };
}

// Exemple de classe amb el mètode decorat
class CurrencyConverter {
    @currencyConversion
     // @ts-ignore
    convertToEuros(amount: number, currency: string) {
        // Aquest mètode serà decorat per realitzar la conversió de moneda
        console.log('Convertint a euros...');
        return amount;
    }
}

// Exemple d'ús
const converter = new CurrencyConverter();
converter.convertToEuros(100, 'USD_EUR'); // Aquesta crida imprimirà la conversió a la consola





































// import { readFileSync } from 'fs';

// // Decorador per a la conversió de moneda
// function currencyConversion(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const currencyConversions = JSON.parse(readFileSync('currency_conversions.json', 'utf-8'));

//     // Guarda la funció original
//     const originalMethod = descriptor.value;

//     // Reescriu la funció per realitzar la conversió de moneda
//     descriptor.value = function (amount: number, currency: string) {
//         if (!currencyConversions.hasOwnProperty(currency)) {
//             throw new Error(`La divisa ${currency} no és compatible.`);
//         }

//         const conversionRate = currencyConversions[currency];
//         const euros = amount * conversionRate;

//         console.log(`${amount} ${currency} = ${euros} EUR`);

//         // Crida la funció original amb el valor convertit a euros
//         return originalMethod.call(this, euros);
//     };
// }

// // Exemple de classe amb el mètode decorat
// class CurrencyConverter {
//     @currencyConversion
//     convertToEuros(amount: number, currency: string) {
//         // Aquest mètode serà decorat per realitzar la conversió de moneda
//         console.log('Convertint a euros...');
//         return amount;
//     }
// }

// // Exemple d'ús
// const converter = new CurrencyConverter();
// converter.convertToEuros(100, 'USD'); // Aquesta crida imprimirà la conversió a la consola





























// import conversions from './currency_conversions.json';

// interface CurrencyConversion {
//     [key: string]: number;
// }

// function currencyConverter(targetCurrency: string): MethodDecorator {
//     return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             const currency: string = (this as any).currency;
//             const conversionKey = `${currency}_${targetCurrency}`;

//             if (conversions.hasOwnProperty(conversionKey)) {
//                 const conversionRate: number = conversions[conversionKey];
//                 const convertedResult: number = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// // Ejemplo de uso
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);


// import conversions from './currency_conversions.json';

// interface CurrencyConversion {
//     [key: string]: number;
// }

// function currencyConverter(targetCurrency: string): MethodDecorator {
//     return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             const currency: string = this.currency;
//             const conversionKey = `${currency}_${targetCurrency}`;

//             if (conversions.hasOwnProperty(conversionKey)) {
//                 const conversionRate: number = conversions[conversionKey];
//                 const convertedResult: number = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// // Ejemplo de uso
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);









// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string): MethodDecorator {
//   return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//       const result = originalMethod.apply(this, args);

//       const conversionKey = `${this.currency}_${targetCurrency}`;

//       if (conversions[conversionKey]) {
//         const conversionRate = conversions[conversionKey];
//         const convertedResult = result * conversionRate;

//         console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//         return convertedResult;
//       } else {
//         throw new Error('Invalid currency conversion');
//       }
//     };

//     return descriptor;
//   };
// }

// class Article {
//   currency: string;

//   constructor(currency: string) {
//     this.currency = currency;
//   }

//   @currencyConverter('EUR')
//   calculateCost(price: number): number {
//     return price;
//   }
// }

// // Ejemplo de uso
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);
















// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string): MethodDecorator {
//     return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             const conversionKey = `${target.currency}_${targetCurrency}`;

//             if (conversions[conversionKey]) {
//                 const conversionRate = conversions[conversionKey];
//                 const convertedResult = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// // Ejemplo de uso
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);
































// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string): MethodDecorator {
//     return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             const conversionKey = `${this.currency}_${targetCurrency}`;

//             if (conversions[conversionKey]) {
//                 const conversionRate = conversions[conversionKey];
//                 const convertedResult = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// // Exemple d'ús
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);









































// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string): MethodDecorator {
//   return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//       const result = originalMethod.apply(this, args);

//       const conversionKey = `${this.currency}_${targetCurrency}`;

//       if (conversions[conversionKey]) {
//         const conversionRate = conversions[conversionKey];
//         const convertedResult = result * conversionRate;

//         console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//         return convertedResult;
//       } else {
//         throw new Error('Invalid currency conversion');
//       }
//     };

//     return descriptor;
//   };
// }

// class Article {
//   currency: string;

//   constructor(currency: string) {
//     this.currency = currency;
//   }

//   @currencyConverter('EUR')
//   calculateCost(price: number): number {
//     return price;
//   }
// }

// // Exemple d'ús
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);










// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string): MethodDecorator {
//     return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             const conversionKey = `${this.currency}_${targetCurrency}`;

//             if (conversions[conversionKey]) {
//                 const conversionRate = conversions[conversionKey];
//                 const convertedResult = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// Exemple d'ús
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);




















// import * as fs from 'fs';

// function currencyConverterDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (amount: number, currency: string) {
//         // Carrega els coeficients de conversió del fitxer JSON
//         const conversions = JSON.parse(fs.readFileSync('currency_conversions.json', 'utf8'));

//         // Verifica si la divisa de conversió és vàlida
//         if (!(currency in conversions)) {
//             throw new Error(`No s'ha trobat una conversió per a la divisa ${currency}`);
//         }

//         // Realitza la conversió de moneda a euros
//         const conversionRate = conversions[currency];
//         const convertedAmount = amount * conversionRate;

//         // Crida la funció original amb l'import convertit a euros
//         return originalMethod.call(this, convertedAmount);
//     }

//     return descriptor;
// }

// class CurrencyConverter {
//     @currencyConverterDecorator
//     static convertToEur(amount: number) {
//         console.log(`Import convertit a euros: ${amount.toFixed(2)}`);
//     }
// }

// // Exemple d'ús
// CurrencyConverter.convertToEur(100, 'USD');

























// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             if (conversions[this.currency] && conversions[targetCurrency]) {
//                 const conversionRate = conversions[targetCurrency] / conversions[this.currency];
//                 const convertedResult = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// // Exemple d'ús
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);


















// import conversions from './currency_conversions.json';

// function currencyConverter(targetCurrency: string) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);

//             const conversionKey = `${this.currency}_${targetCurrency}`;

//             if (conversions[conversionKey]) {
//                 const conversionRate = conversions[conversionKey];
//                 const convertedResult = result * conversionRate;

//                 console.log(`Converted cost in ${targetCurrency}: ${convertedResult}`);
//                 return convertedResult;
//             } else {
//                 throw new Error('Invalid currency conversion');
//             }
//         };

//         return descriptor;
//     };
// }

// class Article {
//     currency: string;

//     constructor(currency: string) {
//         this.currency = currency;
//     }

//     @currencyConverter('EUR')
//     calculateCost(price: number): number {
//         return price;
//     }
// }

// // Exemple d'ús
// const article1 = new Article('USD');
// article1.calculateCost(100);

// const article2 = new Article('GBP');
// article2.calculateCost(200);

// const article3 = new Article('CAD');
// article3.calculateCost(300);




























// import * as fs from 'fs';

// interface ConversionRates {
//     [key: string]: number;
// }

// function currencyConverter(descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     const conversionRates: ConversionRates = JSON.parse(fs.readFileSync('currency_conversions.json', 'utf8'));

//     descriptor.value = function (currency: string, amount: number) {
//         if (!(currency in conversionRates)) {
//             throw new Error(`Currency ${currency} not found in conversion rates.`);
//         }
//         const rate = conversionRates[currency];
//         const euros = originalMethod.apply(this, [amount, rate]);
//         return euros;
//     }
// }

// class CurrencyConverter {
//     @currencyConverter
//     convertToEuros(amount: number, rate: number) {
//         return amount * rate;
//     }
// }

// new CurrencyConverter().convertToEuros(20, 90);
























// // Import the fs module to read the JSON file
// import fs from 'fs';

// // Define an interface for the data type of the JSON file
// interface CurrencyConversions {
//     USD_EUR: number;
//     GBP_EUR: number;
//     CHF_EUR: number;
//     JPY_EUR: number;
//     CAD_EUR: number;
//     CNY_EUR: number;
// }

// // Read the JSON file and parse it as an object of type CurrencyConversions
// const conversions: CurrencyConversions = JSON.parse(fs.readFileSync('currency_conversions.json', 'utf8'));

// // Define a Decorator that takes as a parameter the name of the original currency
// function convertToEuros(currency: string) {
//     // Return a function that takes as a parameter the target, property key and descriptor of the original function
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         // Get the original function from the descriptor
//         const originalFunction = descriptor.value;

//         // Replace the original function with a new function
//         descriptor.value = function (...args: any[]) {
//             // Invoke the original function with the arguments and save the result
//             const result = originalFunction.apply(this, args);

//             // Check if the currency name is valid and exists in the JSON file
//             if (currency in conversions) {
//                 // Multiply the result by the corresponding conversion coefficient
//                 const convertedResult = result * conversions[currency];

//                 // Return the result converted to euros
//                 return convertedResult;
//             } else {
//                 // If not, throw an error
//                 throw new Error('Invalid currency name');
//             }
//         };
//     };
// }

// // Example of using the Decorator in a class
// class Money {
//     // Define a property to store the value of the original currency
//     private value: number;

//     // Define a constructor that assigns the value of the original currency
//     constructor(value: number) {
//         this.value = value;
//     }

//     // Define a method that returns the value of the original currency
//     @convertToEuros('USD') // Apply the Decorator with the name of the original currency
//     getValue() {
//         return this.value;
//     }
// }

// // Create an instance of the Money class with a value of 100 dollars
// const money = new Money(100);

// // Invoke the getValue method and display the result converted to euros
// console.log(money.getValue()); // 81.9908






















// // Importar el mòdul fs per llegir el fitxer JSON
// import fs from 'fs';

// // Definir una interfície per al tipus de dades del fitxer JSON
// interface CurrencyConversions {
//     USD_EUR: number;
//     GBP_EUR: number;
//     CHF_EUR: number;
//     JPY_EUR: number;
//     CAD_EUR: number;
//     CNY_EUR: number;
// }

// // Llegir el fitxer JSON i parsejar-lo com a objecte de tipus CurrencyConversions
// const conversions: CurrencyConversions = JSON.parse(fs.readFileSync('currency_conversions.json', 'utf8'));

// // Definir un Decorator que pren com a paràmetre el nom de la divisa original
// function convertToEuros(currency: string) {
//     // Retornar una funció que pren com a paràmetre el valor de la divisa original
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         // Obtenir la funció original del descriptor
//         const originalFunction = descriptor.value;

//         // Reemplaçar la funció original amb una nova funció
//         descriptor.value = function (...args: any[]) {
//             // Invocar la funció original amb els arguments i guardar el resultat
//             const result = originalFunction.apply(this, args);

//             // Comprovar si el nom de la divisa és vàlid i existeix al fitxer JSON
//             if (currency in conversions) {
//                 // Multiplicar el resultat per el coeficient de conversió corresponent
//                 const convertedResult = result * conversions[currency];

//                 // Retornar el resultat convertit a euros
//                 return convertedResult;
//             } else {
//                 // Si no, llançar un error
//                 throw new Error('Invalid currency name');
//             }
//         };
//     };
// }

// // Exemple d'ús del Decorator en una classe
// class Money {
//     // Definir una propietat per guardar el valor de la divisa original
//     private value: number;

//     // Definir un constructor que assigna el valor de la divisa original
//     constructor(value: number) {
//         this.value = value;
//     }

//     // Definir un mètode que retorna el valor de la divisa original
//     @convertToEuros('USD') // Aplicar el Decorator amb el nom de la divisa original
//     getValue() {
//         return this.value;
//     }
// }

// // Crear una instància de la classe Money amb un valor de 100 dòlars
// const money = new Money(100);

// // Invocar el mètode getValue i mostrar el resultat convertit a euros
// console.log(money.getValue()); // 81.9908



















// interface CurrencyConversions {
//     [key: string]: number;
//   }

//   function CurrencyConversionDecorator(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//       const currencyConversions: CurrencyConversions = {
//         "USD_EUR": 0.819908,
//         "GBP_EUR": 1.156661,
//         "CHF_EUR": 0.913791,
//         "JPY_EUR": 0.007515,
//         "CAD_EUR": 0.676626,
//         "CNY_EUR": 0.128563
//       };
//       const result = originalMethod.apply(this, args);
//       return result * currencyConversions[args[0]];
//     }
//   }

//   class CurrencyConverter {
//     @CurrencyConversionDecorator
//     convertToEuros(currency: string, amount: number) {
//       return amount;
//     }
//   }


























// import * as fs from 'fs';

// interface CurrencyConversions {
//     [key: string]: number;
// }

// function CurrencyConversionDecorator(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         const currencyConversions: CurrencyConversions = JSON.parse(fs.readFileSync('currency_conversions.json', 'utf8'));
//         const result = originalMethod.apply(this, args);
//         return result * currencyConversions[args[0]];
//     }
// }

// class CurrencyConverter {
//     @CurrencyConversionDecorator
//     convertToEuros(currency: string, amount: number) {
//         return amount;
//     }
// }

















// import { readFileSync } from 'fs';

// const contingutOriginal: string = readFileSync('currency_conversions.json', 'utf-8');
// const contingutParsejat: object = JSON.parse(contingutOriginal);

// console.log(contingutParsejat);
// console.log(typeof contingutParsejat);

// const nomMonedes: string[] = Object.keys(contingutParsejat);
// const valorMonedes: number[] = Object.values(contingutParsejat);

// console.log(nomMonedes);
// console.log(valorMonedes);

// const quantitatOriginal:number = 40;


















// import * as conversions from './currency_conversions.json';

// type Currency = keyof typeof conversions;

// function ConvertToEuros(currency: Currency) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);
//             const conversionRate = conversions[currency];
//             return result * conversionRate;
//         };
//     };
// }

// class Money {
//     amount: number;
//     currency: Currency;

//     constructor(amount: number, currency: Currency) {
//         this.amount = amount;
//         this.currency = currency;
//     }

//     @ConvertToEuros('USD')
//     getAmountInEuros() {
//         return this.amount;
//     }
// }

// const money = new Money(100, 'USD');
// console.log(money.getAmountInEuros()); // 85.5


















// Crea una petita aplicació que calculi el cost d'uns quants Articles en euros a partir de les seves divises inicials, aplicant diferents conversions que usin el Decorator del punt anterior.