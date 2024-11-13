const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports = {
    name: "dm",
    description: "DM a user in the guild",
    category: "fun",
    run: async (bot, message, args) => {

      
      let dmemb = new Discord.MessageEmbed()
    .setTitle(`**New Message!**`)
    .setColor("#FFDF30")
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`**This is a message sent by \`${message.author.tag}\`, on \`${message.guild.name}\`:** \n *${args.slice(1).join(" ")}*`);

    let cooldownmsg = new Discord.MessageEmbed()
    .setTitle(`**Cooldown!**`)
    .setColor("de0505")
    .setThumbnail("https://media.discordapp.net/attachments/745703691277041756/767062704431038494/unknown.png?width=773&height=773")
    .setTimestamp()
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`❌ *<@${message.author.id}>*, you need to wait \`30 seconds\` before sending another DM!`);

        message.delete();
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**No permissions!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions for that!`)
        );
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `You did not mention a user, or you gave an invalid id`
        );

        if (talkedRecently.has(message.author.id)) {
          message.channel.send(cooldownmsg);
      } else {
        if (!args.slice(1).join(" "))
        return message.channel.send("You did not specify your message");
      user.user
        .send(dmemb)
        .catch(() => message.channel.send("That user could not be DMed!"))
        .then(() => message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**DM sent!**`)
        .setColor("#3C6515")
        .setDescription(`<a:yes_tick:728382793758801961> A DM was sent to **${user.user}** containing the message:\n *${args.slice(1).join(" ")}*`)
        )
        ).then(msg => {
            msg.delete({ timeout: 30000 })
          });
         // the user can type the command ... your command code goes here :)
      
      // Adds the user to the set so that they can't talk for a minute
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 30000);
      }
    },
  };