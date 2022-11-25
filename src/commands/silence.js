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
        .setDescription("[admin only] Silences a channel and deletes all new incoming messages.")
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("The channel to be silenced. (By default the channel you are sending this from)")
                .setRequired(false)
        )
        .addBooleanOption(option => 
            option.setName("clear")
                .setDescription("Clear past message history")
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
            .setDescription("Checking the database for the channel...")
            .setColor(Colors.Yellow)]});

        if (silenceManager.contains(channel.id)) {
            silenceManager.remove(channel.id);
            lg.info(`Unsilenced ${channelMention(channel.id)}`);
            await interaction.editReply({ embeds: [new EmbedBuilder()
                .setDescription(`Removed ${channelMention(channel.id)} from the list of channels`)
                .setColor(Colors.Red)]});
            
        } else {
            if (interaction.options.getBoolean("clear")) {
                await interaction.editReply({ embeds: [new EmbedBuilder()
                    .setDescription("Clearing message history...")
                    .setColor(Colors.Yellow)]});
                silenceManager.clear(channel);
            }

            silenceManager.add(channel.id);
            lg.info(`Silenced ${channel.id}`);
            await interaction.editReply({ embeds: [new EmbedBuilder()
                .setDescription(`Added ${channelMention(channel.id)} to the list of channels`)
                .setColor(Colors.Green)]});
        }
    },
    register: true
};
