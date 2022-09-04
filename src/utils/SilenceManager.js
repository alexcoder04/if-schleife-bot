import { readJsonFile, writeJsonFile } from "./FileUtils.js";

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

    clear(channel) {
        channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(message => {
                message.delete();
            });
        });
    }
}

export default new SilenceManager();
