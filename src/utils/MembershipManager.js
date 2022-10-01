import { Logger } from "../utils/Logger.js";

const lg = new Logger("Membership");

export const rulesAcceptChannelName = /^.+rules$/;
export const rulesAcceptMessageText = "Please react to this message with 👍 if you accept the rules.";
export const memberRoleName = "Member";

export async function removeMember(channel, userId) {
    const memberRole = await channel.guild.roles.cache.find(r => r.name == memberRoleName);
    if (memberRole == undefined) {
        await channel.send("Member role was not found. Please contact the admins");
        return;
    }

    const user = await channel.guild.members.fetch({ user: userId, force: true });
    const hasMemberRole = await user.roles.cache.find(r => memberRole.id == r.id) != undefined;
    if (hasMemberRole) {
        user.roles.remove(memberRole);
        lg.info(`Removed ${user.displayName} from members`);
        return;
    }

    lg.info(`${user.displayName} isn't member anyway`);
}

export async function addMember(channel, userId) {
    const memberRole = await channel.guild.roles.cache.find(r => r.name == memberRoleName);
    if (memberRole == undefined) {
        await channel.send("Member role was not found. Please contact the admins");
        return;
    }

    const user = await channel.guild.members.fetch({ user: userId, force: true });
    const hasMemberRole = await user.roles.cache.find(r => memberRole.id == r.id) != undefined;
    if (hasMemberRole) {
        lg.info(`${user.displayName} is already member`);
        return;
    }

    user.roles.add(memberRole);
    lg.info(`Added ${user.displayName} to members`);
}
