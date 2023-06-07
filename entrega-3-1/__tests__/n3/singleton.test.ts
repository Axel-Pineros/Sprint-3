import { Player, Game, Marcador } from "../../singleton";

describe("Singleton", () => {

    describe('Classe Player', () => {
        let player: Player;

        beforeEach(() => {
            player = new Player('John');
        });

        test('getName() retorna el nom del jugador', () => {
            expect(player.getName()).toBe('John');
        });

        test('getPoints() retorna els punts inicials del jugador (0)', () => {
            expect(player.getPoints()).toBe(0);
        });

        test('addPoints() aumentarà els punts del jugador', () => {
            player.addPoints(10);
            expect(player.getPoints()).toBe(10);
        });

        test('removePoints() disminuirà els punts del jugador', () => {
            player.addPoints(20);
            player.removePoints(5);
            expect(player.getPoints()).toBe(15);
        });
    });

    describe('Classe Game', () => {
        let game: Game;
        let player1: Player;
        let player2: Player;

        beforeEach(() => {
            game = new Game();
            player1 = new Player('John');
            player2 = new Player('Jane');
            game.addPlayer(player1);
            game.addPlayer(player2);
        });

        test('Game.addPoints() sumarà punts als jugadors', () => {
            game.addPoints(player1, 10);
            expect(player1.getPoints()).toBe(10);
            expect(player2.getPoints()).toBe(0);
        });

        test('Game.removePoints() restarà punts als jugadors', () => {
            game.addPoints(player1, 20);
            game.addPoints(player2, 30);
            game.removePoints(player1, 5);
            expect(player1.getPoints()).toBe(15);
            expect(player2.getPoints()).toBe(30);
        });
    });

    describe('Classe Marcador', () => {
        let marcador: Marcador;
        let player1: Player;
        let player2: Player;
        let player3: Player;

        beforeEach(() => {
            marcador = Marcador.getInstance();
            player1 = new Player('John');
            player2 = new Player('Jane');
            player3 = new Player('Alice');
            marcador.addPlayer(player1);
            marcador.addPlayer(player2);
            marcador.addPlayer(player3);
        });

        test('update() mostrarà la el text corresponent a la consola', () => {
            player1.addPoints(10);
            player2.addPoints(5);
            player3.addPoints(8);

            console.log = jest.fn();
            marcador.update();
            expect(console.log).toHaveBeenCalledWith('Puntuació');
            expect(console.log).toHaveBeenCalledWith('John: 10');
            expect(console.log).toHaveBeenCalledWith('Jane: 5');
            expect(console.log).toHaveBeenCalledWith('Alice: 8');
        });
    });
});