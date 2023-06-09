// El codi adjunt llegeix un fitxer situat en un directori inbox i escriu el seu contingut invertit en un altre fitxer al directori outbox. Reestructura i simplifiqui el codi existent per a evitar el denominat Callback Hell.

const { readdir, readFile, writeFile } = require("fs");
const { join } = require("path");

const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = str =>
    str
        .split("")
        .reverse()
        .join("");

readdir(inbox, (error, files) => {
    if (error) return console.log("Error: Folder inaccessible");
    files.forEach(file => {
        readFile(join(inbox, file), "utf8", (error, data) => {
            if (error) return console.log("Error: File error");
            writeFile(join(outbox, file), reverseText(data), error => {
                if (error) return console.log("Error: File could not be saved!");
                console.log(`${file} was successfully saved in the outbox!`);
            });
        });
    });
});