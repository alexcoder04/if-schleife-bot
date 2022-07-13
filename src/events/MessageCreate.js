import { Logger } from "../utils/Logger.js";
import silenceManager from "../utils/SilenceManager.js";

const lg = new Logger("CHAT");

export default {
    name: "messageCreate",
    execute: async function execute(message) {

        if (message.author.bot) return;
        if (message.system) return;
        if (message.attachments.size > 0) {
            message.attachments.forEach(element => {
                lg.info(`${message.author.username} has sent an attachment: ${element.url}`);
            });
        }
        if (message.content != "") {
            lg.info(`[${message.guild.name} - ${message.channel.name}] ${message.author.username}: ${message.content}`);
        }

        if (silenceManager.contains(message.channelId)) {
            await message.delete();
            lg.info(`[${message.guild.name} - Removed message by ${message.author.username} in ${message.channel.name}]`);
        }
    }
};