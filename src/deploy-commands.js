import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as fs from "fs";

const clientId = process.env["CLIENT_ID"];
const token = process.env["TOKEN"];

const commands = [];
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

console.log(process.cwd());

for (const file of commandFiles) {
    const command = (await import(`../src/commands/${file}`)).default;
    console.log(command);
    if (command.register) commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken("");

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        console.log(commands);
        if (commands.length == 0) {
            console.log("No commands found.")
            return
        }
        await rest.put(
            Routes.applicationCommands("995105397146927155"),
            { body: commands },
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();