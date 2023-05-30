// Escriu una aplicació que creï diferents objectes Usuari/ària. L'aplicació podrà crear diferents Temes i subscriure els usuaris/es a ells. Quan un Usuari/ària afegeixi un missatge a un Tema s'enviarà una alerta per la consola des del Tema. També ho mostraran per consola cadascun dels Usuaris/es que estiguin subscrits al Tema (rebran el missatge). Crea un Tema amb un Usuari/ària i un altre amb dos i mostra la recepció dels missatges pels usuaris/es. Utilitza el mòdul events.

import { EventEmitter } from 'events';
const myEmitter: EventEmitter = new EventEmitter();

class Usuari {
    constructor(public nom: string) {}
}

class Tema {
    private events = myEmitter;
    constructor(public nom: string) {}

    public afegirMissatge(missatge: string): void {
        console.log(`[${this.nom}] ${missatge}`);
        this.events.emit('missatge', missatge);
    }

    public subscriureUsuari(usuari: Usuari): void {
        console.log(`[${this.nom}] ${usuari.nom} s'ha subscrit al tema.`);
        this.events.on('missatge', (missatge: string) => {
            console.log(`[${this.nom}] ${usuari.nom} ha rebut el missatge: ${missatge}`);
        });
    }
}

const usuari1 = new Usuari('Usuari 1');
const usuari2 = new Usuari('Usuari 2');

const tema1 = new Tema('Tema 1');
const tema2 = new Tema('Tema 2');

tema1.subscriureUsuari(usuari1);
tema1.subscriureUsuari(usuari2);

tema2.subscriureUsuari(usuari2);

tema1.afegirMissatge('Hola món!');
tema2.afegirMissatge('Hola de nou!');