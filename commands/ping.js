const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let botMsg = await message.channel.send("〽️ Pinging")

  botMsg.edit({ embed: {
    title: "<a:ping:736033388242141246> Ping",
    description: [
      "**Server**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
      `**API**: ${Math.round(client.ws.ping)}ms`
    ].join("\n"),
    color: 16744207,
    footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL },
    timestamp: new Date()
  }}).catch(() => botMsg.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
}