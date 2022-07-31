import { channelMention, SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, Colors } from "discord.js";
import { Logger } from "../utils/Logger.js";
import silenceManager from "../utils/SilenceManager.js";
import checkPermission from "../utils/Permission.js";
import contains from "../utils/Utils.js";

const lg = new Logger("Silence");

export default {
    data: new SlashCommandBuilder()
        .setName("silence")
        .setDescription("Silences a channel and deletes all new incoming messages.")
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("The channel to be silenced. (By default the channel you are sending this from)")
                .setRequired(false)
        ),

    execute: async function execute(interaction) {
        if (!(await checkPermission(interaction, "Admin"))){
            return;
        }

        var channel = interaction.options.getChannel("channel");
        if (channel == null || channel == undefined) {
            channel = interaction.channel;
        }
        
        await interaction.deferReply({ ephemeral: true });

        await interaction.editReply({ embeds: [new EmbedBuilder()
            .setDescription("Checking the database for the channel")
            .setColor(Colors.Yellow)]});

        if (silenceManager.contains(interaction.channelId)) {
            silenceManager.remove(interaction.channelId);
            lg.info(`Unsilenced ${channelMention(interaction.channelId)}`);
            await interaction.editReply({ embeds: [new EmbedBuilder()
                .setDescription(`Removed ${channelMention(interaction.channelId)} from the list of channels`)
                .setColor(Colors.Red)]});
            
        } else {
            silenceManager.add(interaction.channelId);
            lg.info(`Silenced ${interaction.channelId}`);
            await interaction.editReply({ embeds: [new EmbedBuilder()
                .setDescription(`Added ${channelMention(interaction.channelId)} to the list of channels`)
                .setColor(Colors.Green)]});
        }
    },
    register: true
};
