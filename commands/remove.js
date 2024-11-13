const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let removeself = new Discord.MessageEmbed()
    .setTitle(`**Error!**`)
    .setColor("de0505")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`❌ *<@${message.author.id}>*, you can't remove yourself!`);

    let nopermembed = new Discord.MessageEmbed()
    .setTitle(`**No permissions!**`)
    .setColor("de0505")
    .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions for that!`);
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(nopermembed);
    if(!message.channel.name.includes("ticket-")) return message.channel.send(new Discord.MessageEmbed()
    .setTitle(`**Oops! There was a problem!**`)
    .setColor("de0505")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`❌ *<@${message.author.id}>*, you can't use that command here!`)
    );
    const newassist = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (user.id === message.author.id) return message.channel.send(removeself);
    if (user.id === client.user.id) return message.channel.send(new Discord.MessageEmbed()
    .setTitle(`**Oops! There was a problem!**`)
    .setColor("de0505")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`❌ *<@${message.author.id}>*, you can't remove me! That's rude.`)
    );
    message.delete();
    const embed = new Discord.MessageEmbed()
    .setColor("fe1414")
    .setDescription(`**${newassist} has been removed from \`${message.channel.name}\`!**`)
    .setTitle("**User removed!**")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setTimestamp()
    message.channel.send({embed});

    user.send(new Discord.MessageEmbed()
    .setColor("fe1414")
    .setDescription(`**${newassist}, you have been removed from \`${message.channel.name}\`!**`)
    .setTitle("**You have been removed!**")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setTimestamp()
    );

    message.channel.updateOverwrite(user, { VIEW_CHANNEL: false });
}