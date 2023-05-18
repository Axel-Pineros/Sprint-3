import { readdirSync, readFileSync, writeFileSync } from "fs";
const readdir: typeof readdirSync = readdirSync;
const readfile: typeof readFileSync = readFileSync;
const writefile: typeof writeFileSync = writeFileSync;

import { join } from "path";
const joinPath: typeof join = join;

const inbox: string = joinPath("inbox");
const outbox: string = joinPath("outbox");

const reverseText = (str: string) => str.split("").reverse().join("");

try {
    const files: string[] = readdir(inbox);
    files.forEach((file) => {
        const data = readfile(joinPath(inbox, file), "utf-8");
        writefile(joinPath(outbox, file), reverseText(data));
        console.log(`${file} s'ha guardat a la carpeta outbox!`);
    });
}

catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    } else {
        console.log(`Error: ${error}`);
    }
}