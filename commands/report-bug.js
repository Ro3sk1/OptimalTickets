const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports.run = async (client, message, args) => {

    let lockedList = ["ID1", "416358583220043796"]; //replace the userID stuff here with the ID's of the users you want to blacklist
    const userID = message.author.id;

    if ( lockedList.includes(userID) )
    return message.channel.send(new Discord.MessageEmbed()
    .setTitle(`**Oops! There was a problem!**`)
    .setColor("de0505")
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`❌  *<@${message.author.id}>*, you have abused this feature before and as such have been put on a ***BLACKLIST*** from reporting BUGs!`)
    );

    message.delete();

    const person = message.author.tag;
    const servername = message.guild.name;

    let cooldownmsg = new Discord.MessageEmbed()
    .setTitle(`**Cooldown!**`)
    .setColor("de0505")
    .setThumbnail("https://media.discordapp.net/attachments/745703691277041756/767062704431038494/unknown.png?width=773&height=773")
    .setTimestamp()
    .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setDescription(`❌ *<@${message.author.id}>*, you need to wait \`60 seconds\` before sending another BUG Report!`);

    if (talkedRecently.has(message.author.id)) {
        message.channel.send(cooldownmsg);
    } else {
        let canal = client.channels.cache.get("767406731558649869");
        let bug = args.slice(0).join(' ');

        const bugmsg = new Discord.MessageEmbed()
          .setTitle(`**New BUG**`)
          .setColor("#EC13EF")
          .setDescription(`**${person}** (*${userID}*) reported a bug in **${servername}**:  \n\`${bug}\``)
          .setTimestamp()
          .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
        canal.send(bugmsg).then(message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**Bug Report Submited!**`)
        .setColor("#60FF95")
        .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
        .setDescription(`<:OptimalTicketsLogo:766805384102150205> *<@${message.author.id}>*, thank you for submiting this bug! We will investigate it! ***IF you abuse this system, you WILL BE BLACKLISTED!***`)
        ));


      
       // the user can type the command ... your command code goes here :)
    
    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 60000);
    };
}