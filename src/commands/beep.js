import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("beep")
        .setDescription("Boop"),
    execute: async function execute(interaction) {
        await interaction.reply({ embeds: [new MessageEmbed().setDescription("Boop!")]});
    },
    register: true
};