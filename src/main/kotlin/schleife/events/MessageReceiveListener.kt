package schleife.events

import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import org.slf4j.Logger
import org.slf4j.LoggerFactory

/**
 * @author Clicks
 */
object MessageReceiveListener : ListenerAdapter() {

    val lg: Logger = LoggerFactory.getLogger("CHAT")

    override fun onMessageReceived(event: MessageReceivedEvent) {
        if (event.author.isBot) return

        val message = event.message

        lg.info("[${message.guild.name} - ${message.channel.name}] ${message.author.name}: ${message.contentRaw}")
    }
}