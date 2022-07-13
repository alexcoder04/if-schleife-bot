package schleife.events

import net.dv8tion.jda.api.events.interaction.SlashCommandEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import schleife.utils.slashcommands.SlashCommandManager

/**
 * @author Clicks
 */
object SlashCommandListener : ListenerAdapter() {

    override fun onSlashCommand(event: SlashCommandEvent) {
        SlashCommandManager.getCommand(event.name)?.execute(event)
    }

}