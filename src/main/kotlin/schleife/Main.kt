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

    val bot: JDA = JDABuilder.createDefault("OTk1MTA1Mzk3MTQ2OTI3MTU1.GmIQE6.1Pl1hrZvnejmoOTPJ-AAr4umREHMFXSM5mew2w").build()

    bot.addEventListener(MessageReceiveListener)
    bot.addEventListener(SlashCommandListener)

    SlashCommandManager.registerCommand(BeepCommand)
}