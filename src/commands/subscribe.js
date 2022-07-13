import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

/**
 * A map of all supported languages with their name and a regex for 
 * different written and spoken versions of their name. 
 */
export const langProjMap = [
    {
        name: "C++",
        regex: /C(\+\+|PP)/i,
    },
    {
        name: "C#",
        regex: /C(#|S)/i,
    },
    {
        name: "Golang",
        regex: /Go(lang)?/i,
    },
    {
        name: "Java+Kotlin",
        regex: /Java|Kotlin/i,
    },
    {
        name: "Python",
        regex: /Py(thon)?/i,
    },
    {
        name: "HTML / CSS / JavaScript",
        regex: /HTML|CSS|JS|Javascript|(Web(dev)?)/i,
    },
    {
        name: "LeoConsole",
        regex: /LeoConsole|LC/i,
    },
    {
        name: "Shell",
        regex: /Shell|Bash|POSIX/i,
    },
    {
        name: "Bot",
        regex: /(Discord)?[\s-]?Bot/i,
    },
    {
        name: "Machine Learning",
        regex: /ML|Machine[\s-]?Learning/i,
    }
];

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
        const validLang = langProjMap.find(l => l.regex.test(selectedLang));
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
                .setDescription("No role was found for your requested language.")
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
            return;
        }
        
        //Otherwise subscribe them to it
        interaction.member.roles.add(role);
        const subscribeEmbed = new MessageEmbed()
            .setDescription(`Subscribed you to ${role.name}`)
            .setColor("GREY");
        
        await interaction.editReply({ embeds: [subscribeEmbed] });
        return;
    },
    register: true
};

