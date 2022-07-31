import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { rolesMap } from "../utils/RolesMap.js";

function generateMessage() {
    const mdRolesList = rolesMap.map(r => {
        return ` - ${r.name}`;
    }).join("\n");

    return "These are topic/language roles you can subscribe to using `/subscribe`:\n"
        + "```markdown\n"
        + mdRolesList + "\n"
        + "```";
}

export default {
    data: new SlashCommandBuilder()
        .setName("roleslist")
        .setDescription("List all available topic/language roles you can subscribe to"),
    execute: async function execute(interaction) {
        let rolesListEmbed = new MessageEmbed()
            .setDescription(generateMessage())
            .setColor("AQUA")
            .setTitle("Roles List");
        await interaction.reply({ embeds: [rolesListEmbed], ephemeral: true });
    },
    register: true
};
