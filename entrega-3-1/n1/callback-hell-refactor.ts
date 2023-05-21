// El codi adjunt llegeix un fitxer situat en un directori inbox i escriu el seu contingut invertit en un altre fitxer al directori outbox. Reestructura i simplifiqui el codi existent per a evitar el denominat Callback Hell.

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const reverseText = (str: string) => str.split("").reverse().join("");

try {
    const files: string[] = readdirSync(join(__dirname, "inbox"));
    files.forEach((file: string) => {
        const data: string = readFileSync(join(__dirname, "inbox", file), "utf-8");
        writeFileSync(join(__dirname, "outbox", file), reverseText(data));
        console.log(`${file} s'ha guardat a la carpeta outbox!`);
    });
}

catch (error: unknown) {
    error instanceof Error ? console.log(`Error: ${error.message}`) : console.log(`Error: ${error}`);
}

// module.exports = reverseText;