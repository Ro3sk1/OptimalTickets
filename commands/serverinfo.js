const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  
  const verlvl = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "(ノಠ益ಠ)ノ彡┻━┻"
  }

  const region = {
    europe: ':flag_eu: Europe'  
  }

  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

  let guild = await message.guild.members.fetch();

    let inline = true
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setThumbnail(sicon)
    .setAuthor(message.guild.name)
    .addField("Name", message.guild.name, inline)
    .addField("ID", message.guild.id, inline)
    .addField("Owner", message.guild.owner, inline)
    .addField("Region", region[message.guild.region], inline)
    .addField("Verification Level", verlvl[message.guild.verificationLevel],inline)
    .addField("Members", `:man_pouting: ${message.guild.memberCount}`, inline)
    .addField("Roles", message.guild.roles.cache.size, inline)
    .addField("Channels", message.guild.channels.cache.size, inline)
    .addField("Server Created At", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
    .addField("You Joined", message.member.joinedAt)
    .setFooter(`Created ${message.guild.createdAt}`);

    message.channel.send(serverembed);

    message.delete();
}