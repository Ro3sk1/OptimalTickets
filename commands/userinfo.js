const Discord = require("discord.js");

module.exports.run =async (client, message, args) => {
    let inline = true
    let resence = true
    const status = {
        online: "<a:online:733711146082762834> Online",
        idle: "<a:idle:733711146166648902> Idle",
        dnd: "<a:occupied:734562522547486792> Do Not Disturb",
        offline: "<:offline:736173224102199356> Offline/Invisible"
      }
        
const member = 
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
let target = message.mentions.users.first()

if(!member) member = message.author;
if(!target) target = message.author;


if (member.user.bot === true) {
    bot = "<:bot:722516925334421585> Yes";
  } else {
    bot = "⚙️ No";
  }

  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

            let embed = new Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00ff00")
                .addField("Full Username", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Nickname", `${member.nickname !== null ? `<a:avaible:696418325907111936> Nickname: ${member.nickname}` : "<:unavaible:696418324933771415> None"}`, true)
                .addField("Bot", `${bot}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "<:unavaible:696418324933771415> Not playing"}`,inline, true)
                .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "<:unavaible:696418324933771415> No Roles"}`, true)
                .addField("Joined Discord At", `${member.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(member.user.createdAt)})`)
                .setFooter(`Information about ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }