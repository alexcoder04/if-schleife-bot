package schleife.commands

import net.dv8tion.jda.api.EmbedBuilder
import net.dv8tion.jda.api.events.interaction.SlashCommandEvent
import schleife.utils.slashcommands.SlashCommand

/**
 * @author Clicks
 */
object BeepCommand : SlashCommand("beep") {

    override fun execute(event: SlashCommandEvent) {

        event.replyEmbeds(EmbedBuilder().setDescription("Boop!").build()).queue()
    }


}