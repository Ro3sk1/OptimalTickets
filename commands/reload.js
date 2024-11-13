const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(message.author.id != "261115245530054657") return message.channel.send(new Discord.MessageEmbed()
    .setTitle(`**No permissions!**`)
    .setColor("de0505")
    .setDescription(`❌ *<@${message.author.id}>*, you're not the BOT Owner!`)
    );

    if(!args[0]) return message.reply("please provide a command to reload!")

    message.delete()

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        client.commands.set(commandName, pull)
    } catch(e) {
        return message.reply(`The command \`${args[0].toUpperCase()}\` has been reloaded`).then(msg => msg.delete(3000));
    }

    message.reply(`The command \`${args[0].toUpperCase()}\` has been reloaded`).then(msg => msg.delete(3000));
}