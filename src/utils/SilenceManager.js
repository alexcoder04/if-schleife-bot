import { readJsonFile, writeJsonFile } from "./FileUtils";

class SilenceManager {

    #data;

    constructor(fileloc = "./silenced.json") {
        this.fileloc = fileloc;
        this.#data = readJsonFile(fileloc);
    }

    add(channelId) {
        this.#data.push(channelId);
        writeJsonFile(this.fileloc, this.#data);
    }

    remove(channelId) {
        this.#data.splice(this.#data.indexOf(channelId));
        writeJsonFile(this.fileloc, this.#data);
    }

    write(data) {
        this.#data = data;
        writeJsonFile(this.fileloc, data);
    }

    contains(channelId) {
        return this.#data.contains(channelId);
    }

    get() {
        return this.#data;
    }
}

export default new SilenceManager();