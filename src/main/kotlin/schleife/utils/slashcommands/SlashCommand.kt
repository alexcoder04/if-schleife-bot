package schleife.utils.slashcommands

import net.dv8tion.jda.api.events.interaction.SlashCommandEvent

/**
 * @author Clicks
 */
abstract class SlashCommand(val name: String) {

    abstract fun execute(event: SlashCommandEvent)
}