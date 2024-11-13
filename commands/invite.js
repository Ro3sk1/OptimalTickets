const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.delete();
const reply = new Discord.MessageEmbed()
          .setTitle(`**Invite Links**`)
          .setColor("#EC13EF")
          .setDescription(`Consider clicking the following links: \n\n 🧡 **[Invite me to your server](https://discord.com/api/oauth2/authorize?client_id=621346592309379082&permissions=8&scope=bot)**\n ❓ **[Join the Support Server](https://discord.com/invite/Sw4HzKX)**`)
          .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
message.reply(reply)
}