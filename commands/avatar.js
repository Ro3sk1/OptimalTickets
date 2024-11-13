const Discord = require("discord.js");
const client = new Discord.Client;

module.exports.run = async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`${client.users.cache.get(user.id).tag}'s Avatar`)
        .setFooter(`!avatar  |  Avatar asked by ${message.author.username}`, message.author.displayAvatarURL())
        .setImage(client.users.cache.get(user.id).displayAvatarURL());
    message.channel.send(avatarEmbed);
}