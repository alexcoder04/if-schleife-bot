import { EmbedBuilder } from "discord.js";
import { runCode } from "../utils/CodeExecutor.js";
import silenceManager from "../utils/SilenceManager.js";

export default {
    name: "messageCreate",
    execute: async function execute(message) {

        // return if the message is not interesting
        if (message.author.bot) return;
        if (message.system) return;

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