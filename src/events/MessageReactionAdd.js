import { rulesAcceptMessageText, rulesAcceptChannelName, addMember } from "../utils/MembershipManager.js";

export default {
    name: "messageReactionAdd",
    execute: async function execute(reaction, reactionUser) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (!rulesAcceptChannelName.test(reaction.message.channel.name)) return;
        if (reaction.message.content != rulesAcceptMessageText) return;
        if (reaction.emoji.name != "👍") {
            reaction.remove();
            return;
        }

        await addMember(reaction.message.channel, reactionUser.id);
    }
};