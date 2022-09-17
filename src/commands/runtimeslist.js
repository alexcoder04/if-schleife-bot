import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, Colors } from "discord.js";
import { listRuntimes } from "../utils/CodeExecutor.js";

export default {
    data: new SlashCommandBuilder()
        .setName("runtimeslist")
        .setDescription("List runtimes the bot can execute code in"),
    execute: async function execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            embeds: [ new EmbedBuilder()
                .setTitle("Available runtimes")
                .setDescription("Loading runtimes list...")
                .setColor(Colors.Yellow) ]
        });
        let runtimes = "";
        (await listRuntimes()).forEach(r => {
            runtimes += `\n\`${r.language}\` -> \`${r.version}\``;            
        });
        await interaction.editReply({
            embeds: [ new EmbedBuilder()
                .setTitle("Available runtimes")
                .setDescription(runtimes)
                .setColor(Colors.Aqua) ]
        });
    },
    register: true
};
