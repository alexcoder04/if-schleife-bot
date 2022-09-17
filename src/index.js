import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as fs from "fs";
import "dotenv/config";
import { Logger } from "./utils/Logger.js";

const lg = new Logger("Index");

const TOKEN = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });
client.commands = new Collection();

/**
 * Registering all the commands in the ./src/commands
 * directory to be executed when an interaction is created.
 */
lg.info("[Commands]");
const commandsFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = (await import(`./commands/${file}`)).default;
    if (command.register) {
        client.commands.set(command.data.name, command);
        lg.info(`Registering the command: ${command.data.name}`);
    }
}

/**
 * Registering all the events in the ./src/events
 * directory to be called by the client.on or client.once 
 * function when an event is received.
 */
lg.info("[Events]");
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = (await import(`./events/${file}`)).default;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        lg.info(`Registered Event once${file.replace(".js", "")}`);
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        lg.info(`Registered Event on${file.replace(".js", "")}`);
    }
}

client.once("ready", () => {
    lg.info("Started the bot!");
});

client.login(TOKEN);