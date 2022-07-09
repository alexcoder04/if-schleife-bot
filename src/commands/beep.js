import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("beep")
        .setDescription("beep boop check bot status"),
    execute: async function execute(interaction) {
        interaction.reply({
            "content": "boop, I'm alive",
            ephermal: true,
        });
        return;
    },
    register: true
};

