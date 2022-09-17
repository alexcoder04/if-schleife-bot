import { EmbedBuilder } from "discord.js";
import { runCode } from "../utils/CodeExecutor.js";
import silenceManager from "../utils/SilenceManager.js";

export default {
    name: "messageCreate",
    execute: async function execute(message) {

        // return if the message is not interesting
        if (message.author.bot) return;
        if (message.system) return;
        if (message.attachments.size > 0) {
            message.attachments.forEach(element => {
                lg.info(`${message.author.username} has sent an attachment: ${element.url}`);
            });
        }

        // remove messages in silenced channels
        if (silenceManager.contains(message.channelId)) {
            await message.delete();
            return;
        }

        // /dev/random
        if (message.channel.name == "random") {
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let str = "";
            for (let i = 0; i < 64; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            message.channel.send(str);
            message.delete();
            return;
        }

        // /dev/zero
        if (message.channel.name == "zero") {
            message.channel.send("0000000000000000000000000000000000000000000000000000000000000000");
            message.delete();
            return;
        }

        // run code posted in the #bot channel
        if (message.channel.name.endsWith("bot")) {
            if (/^```.*\n.*\n```\s*!$/is.test(message.content)) {
                const lines = message.content.split("\n");
                let language = lines[0].replace("```", "");
                const code = lines.slice(1, lines.length - 1).join("\n");
                if (language == "js") {
                    language = "javascript";
                }
                message.reply(`
**Your code's output**:
\`\`\`text
${await runCode(code, language)}
\`\`\``);
            }
        }
    }
};