import { Logger } from "../utils/Logger.js";

const lg = new Logger("InteractionCreate");

export default {
    name: "interactionCreate",
    execute: async function execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName.toLowerCase());
            if (command != null) {
                try {
                    lg.info(`The command "${command.data.name}" was called by ${interaction.member.displayName}`);
                    command.execute(interaction);
                } catch (error) {
                    lg.error(error);
                }
            }
        }
    }
};