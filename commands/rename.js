const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(nopermembed);
    if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
    const lockedList = ["261115245530054657", "416358583220043796"]; //replace the userID stuff here with the ID's of the users you want to blacklist
    message.reply(`${message.author.id} ${lockedList}`);

}