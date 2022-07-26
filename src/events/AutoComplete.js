import { rolesMap } from "../utils/RolesMap.js";
import { Logger } from "../utils/Logger.js";

const lg = new Logger("AutoComplete", "info");

export default {
    name: "interactionCreate",
    execute: async function execute(interaction) {
        if (!interaction.isAutocomplete()) return;

        const focusedValue = interaction.options.getFocused();
        switch (interaction.commandName) {

            case "subscribe": {
                await interaction.respond(
                    rolesMap.map((lang) => lang.name).filter(choice => choice.startsWith(focusedValue)).map(choice => ({ name: choice, value: choice }))
                );
                break;
            }
            
            default: {
                lg.info(`Unknown AutoComplete`);
                lg.debug(interaction);
            }
        }
    }
};
