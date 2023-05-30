// El codi adjunt llegeix un fitxer situat en un directori inbox i escriu el seu contingut invertit en un altre fitxer al directori outbox. Reestructura i simplifiqui el codi existent per a evitar el denominat Callback Hell.

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const inbox: string = join(__dirname, "inbox");
const outbox: string = join(__dirname, "outbox");

const reverseText = (str: string): string => str.split("").reverse().join("");

const arxius: string[] = [];
const contingutArxius: string[] = [];

(function llegirDirectori() {
    try {
        readdirSync(inbox).forEach(element => {
            arxius.push(element);
        });
    } catch (error: unknown) {
        throw ("Error: la carpeta no existeix");
    }
})();

(function llegirArxius() {
    try {
        if (arxius.length > 0) {
            for (let member of arxius) {
                contingutArxius.push(readFileSync(join(inbox, member), "utf-8"));
            }
        } else throw new Error;
    } catch (error: unknown) {
        throw ("Error: no hi ha arxius");
    }
})();

(function escriureArxius() {
    try {
        for (let i: number = 0; i < arxius.length; i++) {
            writeFileSync(join(outbox, arxius[i]), reverseText(contingutArxius[i]));
            console.log(`${arxius[i]} s'ha guardat a la carpeta outbox!`)
        }
    } catch (error: unknown) {
        throw ("Error: no s'ha pogut guardar els arxius");
    }
})();