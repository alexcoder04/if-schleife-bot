import { channelMention } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { rolesMap } from "../utils/RolesMap.js";
import { Logger } from "../utils/Logger.js";

const lg = new Logger("Subscribe");

async function subscribe(selectedLang, interaction) {
    //Defer the reply so we can take as much time as we need
    await interaction.deferReply({ ephemeral: true });

    if (!interaction.member.roles.cache.some(role => role.name === "Member")){
        const rulesChannel = await interaction.guild.channels.cache.find(c => c.name === "rules");
        const acceptRulesEmbed = new MessageEmbed()
            .setDescription(`You are not a member yet. Please accept the rules in ${channelMention(rulesChannel.id)}`);

        await interaction.editReply({ embeds: [acceptRulesEmbed] });
        return;
    }

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
        lg.info(`Removed ${interaction.member.id} from ${role.name}`);
        return;
    }
    
    //Otherwise subscribe them to it
    interaction.member.roles.add(role);
    const subscribeEmbed = new MessageEmbed()
        .setDescription(`Subscribed you to ${role.name}`)
        .setColor("GREY");
    
    await interaction.editReply({ embeds: [subscribeEmbed] });
    lg.info(`Added ${interaction.member.id} to ${role.name}`);
    return;
}

export default { subscribe };
