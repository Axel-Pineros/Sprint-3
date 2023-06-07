const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require("path");
const reverseText = require("../../../entrega-3-1/n1/callback-hell-refactor.ts");

describe("callbackHell", () => {

    const fitxersInbox: string[] = readdirSync(join(__dirname, "inbox"));
    const fitxersOutbox: string[] = readdirSync(join(__dirname, "outbox"));

    describe("reverseText", () => {

        test("Inverteix correctament el text", () => {
            const texto: string = "hola mundo";
            const textoInvertido: string = "odnum aloh";
            expect(reverseText(texto)).toEqual(textoInvertido);
        });
    });

    describe("Comprovació d'arxius inicials", () => {

        test("La carpeta inbox existeix", () => {
            expect(readdirSync(__dirname)).toContain("inbox");
        });

        test("Hi ha contingut dins la carpeta inbox", () => {
            expect(fitxersInbox.length >= 1).toBe(true);
        });

        test("La carpeta outbox existeix", () => {
            expect(readdirSync(__dirname)).toContain("outbox");
        });
    });

    describe("Execució de la funció principal", () => {

        function mainFunction() {
            fitxersInbox.forEach((file: string) => {
                const data: string = readFileSync(join(__dirname, "inbox", file), "utf-8");
                writeFileSync(join(__dirname, "outbox", file), reverseText(data));
            });
        }

        mainFunction();

        test("Hi ha contingut dins la carpeta outbox", () => {
            expect(fitxersOutbox.length >= 1).toBe(true);
        });

        test("El contingut del primer fitxer de la carpeta inbox és la versió invertida del primer arxiu de la carpeta outbox", () => {
            expect(readFileSync(join(__dirname, "inbox", fitxersInbox[0]), "utf-8")).toEqual(reverseText(readFileSync(join(__dirname, "outbox", fitxersOutbox[0]), "utf-8")));
        });
    });
});