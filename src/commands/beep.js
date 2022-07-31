import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, Colors } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("beep")
        .setDescription("Boop"),
    execute: async function execute(interaction) {
        await interaction.reply({
            embeds: [ new EmbedBuilder()
                .setTitle("Boop!")
                .setColor(Colors.White) ],
            ephemeral: true
        });
    },
    register: true
};
