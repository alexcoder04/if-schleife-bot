import { Client, Intents, Collection } from "discord.js";
import * as fs from "fs";
import { getEnv } from "./utils/EnvUtils.js";

//getenv currently not working...
const TOKEN = getEnv("TOKEN");

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],});
client.commands = new Collection();
const commandsFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

/**
 * Registering all the commands in the ./src/commands
 * directory to be executed when an interaction is created.
 */
for (const file of commandsFiles) {
    const command = (await import(`./commands/${file}`)).default;
    if (command.register) {
        client.commands.set(command.data.name, command);
        console.log(`Registering the command: ${command.data.name}`);
    }
}

/**
 * Registering all the events in the ./src/events
 * directory to be called by the client.on or client.once 
 * function when an event is received.
 */
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = (await import(`./events/${file}`)).default;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.once("ready", () => {
    console.log("Started the bot!");
});

client.login("");