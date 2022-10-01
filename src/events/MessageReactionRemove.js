import { rulesAcceptMessageText, rulesAcceptChannelName, removeMember } from "../utils/MembershipManager.js";

export default {
    name: "messageReactionRemove",
    execute: async function execute(reaction, reactionUser) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (!rulesAcceptChannelName.test(reaction.message.channel.name)) return;
        if (reaction.message.content != rulesAcceptMessageText) return;
        if (reaction.emoji.name != "👍") return;

        await removeMember(reaction.message.channel, reactionUser.id);
    }
};