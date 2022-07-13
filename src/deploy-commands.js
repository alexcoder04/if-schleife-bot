import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as fs from "fs";
import "dotenv/config";
import { Logger } from "./utils/Logger.js";

const lg = new Logger("DeployCommands");

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

const commands = [];
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = (await import(`../src/commands/${file}`)).default;
    if (command.register) commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
    try {
        lg.info("Started refreshing application (/) commands.");
        if (commands.length == 0) {
            lg.info("No commands found.");
            return;
        }
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        lg.info("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();