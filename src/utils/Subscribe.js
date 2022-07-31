import { channelMention } from "@discordjs/builders";
import { EmbedBuilder, Colors } from "discord.js";
import { rolesMap } from "./RolesMap.js";
import { Logger } from "./Logger.js";
import checkPermission from "./Permission.js";

const lg = new Logger("Subscribe");

async function subscribe(selectedLang, interaction) {
    if (!(await checkPermission(interaction, "Member"))) {
        return;
    }

    //Defer the reply so we can take as much time as we need
    await interaction.deferReply({ ephemeral: true });

    //Find the language in the list of languages
    const validLang = rolesMap.find(l => l.regex.test(selectedLang));
    if (validLang == null || validLang == undefined) {
        const languageNotFoundEmbed = new EmbedBuilder()
            .setDescription(`${selectedLang} is not in the list of supported languages.`)
            .setColor(Colors.Red);
        
        await interaction.editReply({ embeds: [languageNotFoundEmbed] });
        return;
    }
    
    //Get the role for the found language
    const role = await interaction.guild.roles.cache.find(r => validLang.regex.test(r.name));
    if (role == undefined) {
        const roleNotFoundEmbed = new EmbedBuilder()
            .setDescription(`No role was found for ${validLang.name}.`)
            .setColor(Colors.Red);
        
        await interaction.editReply({ embeds: [roleNotFoundEmbed] });
        return;
    }

    //Check if the user already has the role and if so unsubscribe them
    const hasRole = interaction.member.roles.cache.find(r => role.id == r.id) != undefined;
    if (hasRole) {
        interaction.member.roles.remove(role);
        const unsubscribeEmbed = new EmbedBuilder()
            .setDescription(`Unsubscribed you from ${role.name}`)
            .setColor(Colors.White);
        
        await interaction.editReply({ embeds: [unsubscribeEmbed] });
        lg.info(`Removed ${interaction.member.displayName} from ${role.name}`);
        return;
    }
    
    //Otherwise subscribe them to it
    interaction.member.roles.add(role);
    const subscribeEmbed = new EmbedBuilder()
        .setDescription(`Subscribed you to ${role.name}`)
        .setColor(Colors.White);
    
    await interaction.editReply({ embeds: [subscribeEmbed] });
    lg.info(`Added ${interaction.member.displayName} to ${role.name}`);
    return;
}

export { subscribe };
