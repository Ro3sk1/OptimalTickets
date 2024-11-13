const Discord = require("discord.js");
const token = "NjIxMzQ2NTkyMzA5Mzc5MDgy.XXkAGw.aaxtbBAOvsqsqqYvU5UwTe9_pZg"
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {

    if(message.author.id != "261115245530054657") return message.channel.send(new Discord.MessageEmbed()
    .setTitle(`**Oops! There was a problem!**`)
    .setColor("de0505")
    .setDescription(`❌ *<@${message.author.id}>*, you're not the BOT owner!`)
    );

    message.delete();

    let embed = new Discord.MessageEmbed()
    .setTitle(`**Bot is rebooting...**`)
    .setColor("33b914")
    .setDescription(`<a:online:733711146082762834> *<@${message.author.id}>*, the BOT is rebooting...`)
    message.channel.send({ embed })
    process.exit();
}