import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, Colors } from "discord.js";
import checkPermission from "../utils/Permission.js";

export default {
    data: new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("[admin only] Upgrade the bot with dioggy"),
    execute: async function execute(interaction) {
        if (!(await checkPermission(interaction, "Admin"))){
            return;
        }

        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({ embeds: [new EmbedBuilder()
            .setDescription("Checking if running through dioggy...")
            .setColor(Colors.Yellow)]});

        const DIOGGY_PID = process.env.DIOGGY_PID;
        if (DIOGGY_PID == null || DIOGGY_PID == "") {
            await interaction.editReply({ embeds: [new EmbedBuilder()
                .setDescription("Bot is not running through dioggy, cannot restart")
                .setColor(Colors.Red)]});
            return;
        }

        await interaction.reply({
            embeds: [ new EmbedBuilder()
                .setTitle("Restarting the bot")
                .setColor(Colors.DarkGrey) ],
            ephemeral: true
        });

        process.kill(parseInt(DIOGGY_PID), "SIGUSR1");
    },
    register: true
};
