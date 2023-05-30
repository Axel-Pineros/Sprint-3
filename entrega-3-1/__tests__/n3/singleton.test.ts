import { Player } from "../../singleton";

describe("Singleton", () => {

    describe("Classe Player", () => {

        test('Given a name, when I create a player with this name, then it is created a player with name and 0 points', () => {

            const expectedPlayer = { name : 'Alice', points: 0}

            const player = new Player(expectedPlayer.name);
            const result = player.toPrimitive()

            expect(result).toEqual(expectedPlayer);

        });

    });

    // describe("Classe Game", () => {
    //     const Game = jest.fn().mockImplementation((name) => {
    //         return { name: name, points: 0 };
    //     });
    // });










    // game.test.ts

    // describe("Game class", () => {
    //     let game: Game;
    //     let player1: Player;
    //     let player2: Player;

    //     beforeEach(() => {
    //         game = new Game();
    //         player1 = new Player("Alice");
    //         player2 = new Player("Bob");
    //         game.addPlayer(player1);
    //         game.addPlayer(player2);
    //     });

    //     test("should add players to the game and the marcador", () => {
    //         expect(game.players).toEqual([player1, player2]);
    //         expect(game.marcador.players).toEqual([player1, player2]);
    //     });

    //     test("should add points to a player and update the marcador", () => {
    //         game.addPoints(player1, 10);
    //         expect(player1.points).toBe(10);
    //         // Verifica que el marcador se actualiza según la lógica del juego
    //     });

    //     test("should remove points from a player and update the marcador", () => {
    //         game.removePoints(player2, 5);
    //         expect(player2.points).toBe(-5);
    //         // Verifica que el marcador se actualiza según la lógica del juego
    //     });
    // });

});