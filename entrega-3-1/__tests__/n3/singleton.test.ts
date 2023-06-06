import { Player, Game } from "../../singleton";

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
});