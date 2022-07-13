package schleife

import net.dv8tion.jda.api.JDA
import net.dv8tion.jda.api.JDABuilder
import schleife.commands.BeepCommand
import schleife.events.MessageReceiveListener
import schleife.events.SlashCommandListener
import schleife.utils.slashcommands.SlashCommandManager

/**
 * @author Clicks
 */

fun main() {

    val bot: JDA = JDABuilder.createDefault("").build()

    bot.addEventListener(MessageReceiveListener)
    bot.addEventListener(SlashCommandListener)

    SlashCommandManager.registerCommand(BeepCommand)
}