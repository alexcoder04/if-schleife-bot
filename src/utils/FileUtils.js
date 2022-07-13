
import * as fs from "fs";
import { Logger } from "./Logger.js";

const lg = new Logger("FileUtils");

function writeJsonFile(filepath, data) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            throw err;
        }
        lg.debug(`Wrote ${JSON.stringify(data, 2)} to file ${filepath}`);
    });
}

function readJsonFile(filepath) {
    return JSON.parse(fs.readFileSync(filepath));
}

export { writeJsonFile, readJsonFile };