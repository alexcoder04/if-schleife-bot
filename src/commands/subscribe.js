import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { rolesMap } from "../utils/RolesMap.js";
import { Logger } from "../utils/Logger.js";

const lg = new Logger("Subscribe");

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
        //Get the language from the interaction options
        const selectedLang = interaction.options.getString("language");

        //Defer the reply so we can take as much time as we need
        await interaction.deferReply({ ephemeral: true });
        
        //Find the language in the list of languages
        const validLang = rolesMap.find(l => l.regex.test(selectedLang));
        if (validLang == null || validLang == undefined) {
            const languageNotFoundEmbed = new MessageEmbed()
                .setDescription(`${selectedLang} is not in the list of supported languages.`)
                .setColor("RED");
            
            await interaction.editReply({ embeds: [languageNotFoundEmbed] });
            return;
        }
        
        //Get the role for the found language
        const role = await interaction.guild.roles.cache.find(r => validLang.regex.test(r.name));
        if (role == undefined) {
            const roleNotFoundEmbed = new MessageEmbed()
                .setDescription(`No role was found for ${validLang.name}.`)
                .setColor("RED");
            
            await interaction.editReply({ embeds: [roleNotFoundEmbed] });
            return;
        }

        //Check if the user already has the role and if so unsubscribe them
        const hasRole = interaction.member.roles.cache.find(r => role.id == r.id) != undefined;
        if (hasRole) {
            interaction.member.roles.remove(role);
            const unsubscribeEmbed = new MessageEmbed()
                .setDescription(`Unsubscribed you from ${role.name}`)
                .setColor("GREY");
            
            await interaction.editReply({ embeds: [unsubscribeEmbed] });
            lg.info(`removed ${interaction.member.id} from ${role.name}`);
            return;
        }
        
        //Otherwise subscribe them to it
        interaction.member.roles.add(role);
        const subscribeEmbed = new MessageEmbed()
            .setDescription(`Subscribed you to ${role.name}`)
            .setColor("GREY");
        
        await interaction.editReply({ embeds: [subscribeEmbed] });
        lg.info(`added ${interaction.member.id} to ${role.name}`);
        return;
    },
    register: true
};

