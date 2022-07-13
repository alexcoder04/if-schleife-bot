package schleife.utils.slashcommands

import org.slf4j.Logger
import org.slf4j.LoggerFactory

/**
 * @author Clicks
 */
object SlashCommandManager {

    private val commands = HashMap<String, SlashCommand>()
    private val lg: Logger = LoggerFactory.getLogger(SlashCommandManager::class.java)

    fun registerCommand(command: SlashCommand) {
        lg.info("Registering command: ${command.name}")
        commands[command.name] = command
    }

    fun getCommand(name: String): SlashCommand? {
        return commands[name]
    }

    fun getCommands(): List<SlashCommand> {
        return commands.values.toList()
    }

    fun getCommandNames(): List<String> {
        return commands.keys.toList()
    }
}