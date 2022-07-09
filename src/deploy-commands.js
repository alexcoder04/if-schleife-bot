import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as fs from "fs";
import { config } from "dotenv";
import { Logger } from "winston";

const lg = new Logger("DeployCommands");

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

const commands = [];
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

lg.info(process.cwd());

for (const file of commandFiles) {
    const command = (await import(`../src/commands/${file}`)).default;
    lg.info(command);
    if (command.register) commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken("");

(async () => {
    try {
        lg.info("Started refreshing application (/) commands.");
        lg.info(commands);
        if (commands.length == 0) {
            lg.info("No commands found.");
            return;
        }
        await rest.put(
            Routes.applicationCommands("995105397146927155"),
            { body: commands },
        );

        lg.info("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();