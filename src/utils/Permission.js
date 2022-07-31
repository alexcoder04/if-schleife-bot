import { EmbedBuilder, Colors } from "discord.js";
import { Logger } from "./Logger.js";

const lg = new Logger("Permissions");

async function checkPermission(interaction, role) {
    let hasRole= interaction.member.roles.cache.some(r => r.name === role);
    if (!(hasRole)) {
        const permissionEmbed = new EmbedBuilder()
            .setTitle("Permission Error")
            .setColor(Colors.Red)
            .setDescription(`You don't have the **${role}** role which is required to use this command`);
        await interaction.reply({ ephemeral: true, embeds: [ permissionEmbed ] });
        lg.error(`The user ${interaction.member.displayName} tried to use a command without the sufficient permission`);
        return false;
    }
    return true;
}

export default checkPermission;
