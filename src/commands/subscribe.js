import { SlashCommandBuilder } from "@discordjs/builders";
import { subscribe } from "../utils/Subscribe.js";

export default {
    data: new SlashCommandBuilder()
        .setName("subscribe")
        .setDescription("Subscribe to a language")
        .addStringOption(option => option.setName("language")
            .setDescription("The language you want to be (un)subscribed to/from.")
            .setRequired(true)
            .setAutocomplete(true)
        ),
    execute: async function execute(interaction) {
        const selectedLang = interaction.options.getString("language");
        subscribe(selectedLang, interaction);
    },
    register: true
};
