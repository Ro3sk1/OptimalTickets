const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let nopermembed = new Discord.MessageEmbed()
    .setTitle(`**No permissions!**`)
    .setColor("de0505")
    .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions for that!`);
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(nopermembed);
    if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
    const newassist = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setColor("465aff")
    .setDescription(`**You have been transferred!** You're now beeing assisted by ${newassist}`)
    .setTitle("**Ticket Transfered!**")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setTimestamp()
    message.channel.send({embed})

    message.channel.updateOverwrite(user, { VIEW_CHANNEL: true });
}