const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

        message.delete()

    const oembed = new Discord.MessageEmbed()
    .setTitle("➪ Command List")
    .setAuthor(`Optimal Tickets by </ro3sk1>#2404`, `https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg`)
    .setColor([252,190,3])
    .setDescription("**!help** \n ⚙️ ⮞ Show all commands \n\n  **!ticket-setup [#channel]** \n ✉️ ⮞ Setups the TICKET SYSTEM. \n\n **!panel-setup [Panel Message]** \n 🖋✉️ ⮞ Setups a costum TICKET message. \n\n **!panel-send [#channel]** \n 🖋✉️ ⮞ Sends the Panel Message.  \n\n **!support-role [@role]** \n 🛠📌 ⮞ Pings the ROLE when a TICKET is created. \n\n **!claim** \n 🛄 ⮞ Claims a TICKET. \n\n **!transfer [@member]** \n 🔀 ⮞ Transfers a TICKET to other person. \n\n **!close** \n ✉️🚫 ⮞ Closes a TICKET. \n\n  **!delete** \n ✉️⭕️ ⮞ Deletes the TICKET. \n\n **!dm [@member / ID] [Text]** \n ✉️ ⮞ Sends a DM to a member. \n\n  **!uptime** \n 🕒 ⮞ Shows how long have I been online  \n\n  **!report-bug [bug]** \n 📝 ⮞ You can report a bug. Keep in mind if you **abuse** this feature, you will be blacklisted from ever doing it again!  \n\n  **!support** \n <:FeelsSupportMan:745699560722137098> ⮞ Sends a invite to the BOT's support server. \n\n  **!serverinfo** \n 🌐📃 ⮞ Shows information about the server \n\n  **!userinfo [@user]** \n 🙎‍♂️📃 ⮞ Shows information about an user \n\n  **!botinfo** \n 🤖📃 ⮞ Shows information about me \n\n  **!avatar [@user]** \n 🙎‍♂️ ⮞ Shows a user's avatar")
    .setFooter(`${message.author.tag} | !help`, "https://cdn.discordapp.com/attachments/747103967359664248/747120512370606100/OptmalTickets.jpg")
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    message.channel.send(oembed);
}