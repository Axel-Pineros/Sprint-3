// import { EventEmitter } from 'events';
import { Tema, Usuari } from "../../observer";

describe('Tema', () => {
    let tema: Tema;
    let usuari1: Usuari;
    let usuari2: Usuari;

    beforeEach(() => {
        tema = new Tema('Tema 1');
        usuari1 = new Usuari('Usuari 1');
        usuari2 = new Usuari('Usuari 2');
    });

    test('afegirMissatge() retornarà el missatge', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const message: string = 'Hola món!';

        tema.afegirMissatge(message);

        expect(consoleSpy).toHaveBeenCalledWith(`[${tema.nom}] ${message}`);
    });

    test(`subscriureUsuari() anunciarà que un usuari s'ha subscrit a un tema`, () => {
        const consoleSpy = jest.spyOn(console, 'log');

        tema.subscriureUsuari(usuari1);

        expect(consoleSpy).toHaveBeenCalledWith(`[${tema.nom}] ${usuari1.nom} s'ha subscrit al tema.`);
    });

    test(`subscriureUsuari() anunciarà que l'usuari subscrit ha rebut el missatge`, () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const message: string = 'Hola món!';
        const expectedLog: string = `[${tema.nom}] ${usuari1.nom} ha rebut el missatge: ${message}`;

        tema.subscriureUsuari(usuari1);
        tema.afegirMissatge(message);

        expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });
});