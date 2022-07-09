import * as cp from "child_process";

function getRoleByName(interaction, name) {
    return interaction.guild.roles.cache.find(r => r.name === name);
}

function getRoleById(interaction, id) {
    return interaction.guild.roles.cache.find(r => r.id === id);
}

function getUserById(interaction, id) {
    return interaction.guild.members.cache.find(m => m.id === id);
}

/**
 * Used to wait n amount of miliseconds in an asynchronous context
 * @param {Integer} ms Miliseconds to wait
 * @returns A Promise that resolves after the amount of miliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { getRoleByName, getRoleById, getUserById, sleep};