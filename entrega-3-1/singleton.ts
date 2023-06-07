// Construeix una aplicació que creï diversos Jugadors/es. Els jugadors/es podran ser afegits a un Joc, que mostrarà un marcador amb les puntuacions i el guanyador/a. L'aplicació ha de poder afegir o treure punts a cada jugador/a perquè el marcador canviï. La classe Marcador ha d'implementar un patró Singleton com a requisit indispensable.

export class Player {
    private name: string;
    private points: number;

    constructor(name: string) {
        this.name = name;
        this.points = 0;
    }

    toPrimitive() {
        return {
            name: this.name,
            points: this.points
        }
    }

    addPoints(points: number) {
        this.points += points
    }

    removePoints(points: number) {
        this.points -= points
    }
    getName(): string {
        return this.name;
    }

    getPoints(): number {
        return this.points;
    }
}

export class Game {
    players: Player[];
    marcador: Marcador;

    constructor() {
        this.players = [];
        this.marcador = Marcador.getInstance();
    }

    addPlayer(player: Player) {
        this.players.push(player);
        this.marcador.addPlayer(player);
    }

    addPoints(player: Player, newPoints: number) {
        player.addPoints(newPoints)
        this.marcador.update();
    }

    removePoints(player: Player, points: number) {
        player.removePoints(points);
        this.marcador.update();
    }
}

export class Marcador {
    private static instance: Marcador;
    players: Player[];

    constructor() {
        this.players = [];
    }

    static getInstance(): Marcador {
        if (!Marcador.instance) {
            Marcador.instance = new Marcador();
        }
        return Marcador.instance;
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    update() {
        console.log("Puntuació");
        for (const player of this.players) {
            console.log(`${player.getName()}: ${player.getPoints()}`);
        }
        const maxPoints: number = Math.max(...this.players.map(player => player.getPoints()));
        const winners = this.players.filter(player => player.getPoints() === maxPoints);
        if (winners.length > 1) {
            console.log(`Empat entre: ${winners.map(winner => winner.getName()).join(', ')}`);
        } else {
            console.log(`Guanyador: ${winners[0].getName()}`);
        }
    }
}

const game = new Game();
const player1 = new Player("Alice");
const player2 = new Player("Bob");
game.addPlayer(player1);
game.addPlayer(player2);
game.addPoints(player1, 5);
game.addPoints(player1, 5);
game.addPoints(player2, 5);