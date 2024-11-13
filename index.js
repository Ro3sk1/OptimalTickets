const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const enmap = require('enmap');
const config = require("./config.json");
const db = require('quick.db');
const talkedRecently = new Set();
const DBL = require("dblapi.js");
const dbl = new DBL('REDACTED', client);
const {token, prefix} = require('./config.json');

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});

dbl.on('posted', () => {
    console.log('Server count posted!');
  })
  
  dbl.on('error', e => {
   console.log(`Oops! ${e}`);
  });

client.on('ready', () => {
    let guildsCounter = client.guilds.cache.size;
    console.log(`BOT foi iniciado, com ${client.users.cache.size} usuários, em ${guildsCounter} servidores.`);
    setInterval(() => {
        const memberC = client.users.cache.size;
        const activities_list = [
            `🎫 Optimal Tickets! Watching over ${memberC} users!`,
            `🎫 Open TICKET for support!`,
            `🎫 Optimal Tickets! Watching over ${memberC} users!`,
            `🔨 I'm still being developed!`,
            `❤️ ${memberC} users`,
            `💸 Don't spend money on PREMIUM features of other Ticket BOTS!`,
            `💯 I'm helping ${guildsCounter} servers!`,
            `❗️ !help to check all commands!`, 
            ]; // creates an arraylist containing phrases you want your bot to switch through.
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

client.on('ready', () => {
    setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);
});

client.on('guildCreate', guild => {
    let channel = client.channels.cache.get("747972070612271115")
  const embed = new Discord.MessageEmbed()
  .setColor("#cde246")
  .setAuthor(`Joined ${guild.name}`)
  .setThumbnail(guild.iconURL)
  .addField("Owner", `${guild.owner} , ${guild.owner.user.tag}`)
  .addField("ID", guild.id, true)
  .addField("Users", guild.memberCount, true)
  .addField("Channels", guild.channels.cache.size, true)
  .addField("BOT's Total Servers", client.guilds.cache.size, true)
  .addField("BOT's Total Users", client.users.cache.size, true)
  .setTimestamp()
   channel.send(embed);
});

client.on('guildDelete', guild => {
    let channel = client.channels.cache.get("747972070612271115")
  const embed = new Discord.MessageEmbed()
  .setColor("#FE1414")
  .setAuthor(`Removed from ${guild.name}`)
  .setThumbnail(guild.iconURL)
  .addField("Owner", `${guild.owner} / ${guild.owner.user.tag}`)
  .addField("ID", guild.id, true)
  .addField("Users", guild.memberCount, true)
  .addField("Channels", guild.channels.cache.size, true)
  .addField("BOT's Total Servers", client.guilds.cache.size, true)
  .addField("BOT's Total Users", client.users.cache.size, true)
  .setTimestamp()
   channel.send(embed);
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "ticket-setup") {
        // ticket-setup #channel
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**No permissions!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions for that!`)
        );
        let channel = message.mentions.channels.first();
        if(!message.member.guild.me.hasPermission("SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**Oops! There was a problem!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, I don't have enough permissions! Make sure I have permissions to *send messages, send embeds and to view the channel*.`)
        );
        let catTicket = args.slice(1).join(" ");
        if(!catTicket) catTicket = "TICKETS"
        let usageemb = new Discord.MessageEmbed()
        .setTitle(`**Wrong Format!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, the right format is:\n\n\`!ticket-setup [#channel] [Name Of Category where all tickets will be]\``);
        if(!channel) return message.channel.send(usageemb);

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket System - Create a TICKET")
            .setDescription(`React with 🎫 to open a ticket!\n**Our Support Team will answer as soon as possible.**`)
            .setThumbnail(message.guild.iconURL())
            .setFooter("Ticket System by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")
            .setColor("00ff00")
        );

        sent.react('🎫');
        settings.set(`${message.guild.id}${sent.id}-ticket`, sent.id);
        if(!message.guild.channels.cache.find(c => c.name.includes(`${catTicket}`) && c.type == "category")) {

        message.guild.channels.create(`${catTicket}`, {
            
            type: 'category',
	permissionOverwrites: [
		{
			id: message.guild.id,
			deny: ['VIEW_CHANNEL'],
		},
    ],
    
    })}

    settings.set(`${message.guild.id}${sent.id}-category`, catTicket);

const setup = new Discord.MessageEmbed()
          .setTitle(`<a:yes_tick:728382793758801961> **Setup Successful!**`)
          .setColor("#1386EF")
          .setDescription(`**Setup was successfully finished**. The TICKET message was sent to **${channel}** and all TICKETS will be in \`${catTicket}\`!`)
          .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")

        message.channel.send(setup)
    }

    if (command == "panel-setup") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**No permissions!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions for that!`)
        );
        let panelmessage = args.join(" ");
        let usageemb = new Discord.MessageEmbed()
        .setTitle(`**Wrong Format!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, Please write something in the TICKET message.`);
        if (!panelmessage) return message.channel.send(usageemb);
        const panelsetup = new Discord.MessageEmbed()
          .setTitle(`<a:yes_tick:728382793758801961> **Panel Setup Successful!**`)
          .setColor("#1386EF")
          .setDescription(`**Panel Setup was successfully configured.**. To send the TICKET message, do \`!panel-send [#channel] [Name Of Category where all tickets will be]\``)
          .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")

        message.channel.send(panelsetup)
        settings.set(`${message.guild.id}-panel`, panelmessage);

    }

    if(command == "panel-send") {
        // ticket-setup #channel
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**No permissions!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions for that!`)
        );
        let channel = message.mentions.channels.first();
        if(!member.guild.me.permissionIn(channel).hasPermission("SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**Oops! There was a problem!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, I don't have permissions in ${channel}! Make sure I have permissions to *send messages, send embeds and to view the channel*.`)
        );
        
        let catTicket = args.slice(1).join(" ");
        if(!catTicket) catTicket = "TICKETS"
        let panelmsg = await settings.get(`${message.guild.id}-panel`);
        let usageemb = new Discord.MessageEmbed()
        .setTitle(`**Wrong Format!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, the right format is:\n\n\`!panel-send [#channel] [Name Of Category where all tickets will be]\``);
        if(!channel) return message.channel.send(usageemb);

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket System - Create a TICKET")
            .setDescription(`${panelmsg}`)
            .setThumbnail(message.guild.iconURL())
            .setFooter("Ticket System by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")
            .setColor("00ff00")
        );

        sent.react('🎫');
        settings.set(`${message.guild.id}${sent.id}-ticket`, sent.id);
        if(!message.guild.channels.cache.find(c => c.name.includes(`${catTicket}`) && c.type == "category")) {

        message.guild.channels.create(`${catTicket}`, {
            
            type: 'category',
	permissionOverwrites: [
		{
			id: message.guild.id,
			deny: ['VIEW_CHANNEL'],
		},
    ],
    
    })}

    settings.set(`${message.guild.id}${sent.id}-category`, catTicket);

const setup = new Discord.MessageEmbed()
          .setTitle(`<a:yes_tick:728382793758801961> **Setup Successful!**`)
          .setColor("#1386EF")
          .setDescription(`**Setup was successfully finished**. The TICKET message was sent to **${channel}** and all TICKETS will be in \`${catTicket}\`!`)
          .setFooter("Optimal Tickets | Made by </ro3sk1>#2404", "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")

        message.channel.send(setup)
    };

    if(command == "delete") {
        let staff = message.guild.roles.cache.get(await db.get(`${message.guild.id}-staff`));
        let member = message.author;
        let roleStaff = message.member.roles.cache.has(staff.id) || message.member.hasPermission("MANAGE_MESSAGES");
        if(!roleStaff) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**No permissions!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions to delete this TICKET. Please wait until a **STAFF Member** deletes this TICKET.`)
        );
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        let tenemb = new Discord.MessageEmbed()
        .setTitle(`**Warning!**`)
        .setColor("#FF4C30")
        .setThumbnail("https://media.discordapp.net/attachments/745703691277041756/767062704431038494/unknown.png?width=773&height=773")
        .setFooter(`Ticket deleted by ${message.author.tag}`)
        .setDescription(`**This Ticket will be deleted in 10 seconds!**`);
        message.channel.send(tenemb);
        setTimeout(() => {  message.channel.delete(); }, 10000);
        let closeemb = new Discord.MessageEmbed()
        .setTitle(`**Ticket Deleted!**`)
        .setColor("de0505")
        .setThumbnail("https://media.discordapp.net/attachments/745703691277041756/767062704431038494/unknown.png?width=773&height=773")
        .setDescription(`*<@${message.author.id}>*, the ticket \`${message.channel.name}\` has been deleted!`);
        setTimeout(() => {  message.author.send(closeemb); }, 10000);
    };

    if(command == "close") {
        let staff = message.guild.roles.cache.get(await db.get(`${message.guild.id}-staff`));
        let member = message.author;
        let roleStaff = message.member.roles.cache.has(staff.id) || message.member.hasPermission("MANAGE_MESSAGES");
        if(!roleStaff) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**No permissions!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you don't have permissions to close this TICKET. Please wait until a **STAFF Member** closes this TICKET.`)
        );
        if(!message.channel.name.includes("ticket-")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**Wrong Channel!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, you can only close TICKET CHANNELS!`)
        );
        
        function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
        
        const chan = message.channel;
        var channame = chan.name; //Channel ID
        var arr = [];
        message.channel.messages.fetch({limit:100}).then(messages => {

            const usermsgs = messages;

            let mensagens = usermsgs.size;

            if(mensagens == "100") mensagens = "Over 99";

        chan.send(new Discord.MessageEmbed()
        .setTitle(`**Ticket Closed!**`)
        .setColor("#FF4C30")
        .setDescription(`**\`${message.channel.name}\` has been closed by ${message.author}!**`)
        .addField(`Ticket Name`, message.channel.name)
        .addField(`Ticket ID`, message.channel.id, true)
        .addField(`Messages Sent`, `${mensagens}`, true)
        .addField(`Ticket Created At`, `${message.channel.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.createdAt)})`)
        .setFooter(`Optimal Tickets | Made by </ro3sk1>#2404`, "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")
);
message.channel.overwritePermissions([
	{
		id: message.guild.id,
		deny: ['VIEW_CHANNEL'],
    },
    {
        id: message.guild.me,
        allow: ['VIEW_CHANNEL'],
    },
    {
        id: message.guild.roles.cache.get(db.get(`${message.guild.id}-staff`)),
        allow: ['VIEW_CHANNEL'],
    },
	{
		id: message.author.id,
		allow: ['VIEW_CHANNEL'],
	},
]);
}).catch(console.error);
    }


    if(command == "support-role") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("better check your permissons!")
        message.delete();
        let staff = message.mentions.roles.first();
        let staffusageemb = new Discord.MessageEmbed()
        .setTitle(`**Wrong Format!**`)
        .setColor("de0505")
        .setDescription(`❌ *<@${message.author.id}>*, the right format is:\n\n\`!support-role [@role]\``);
        if(!staff) return message.channel.send(staffusageemb);
        db.set(`${message.guild.id}-staff`, staff.id);
        let roleemb = new Discord.MessageEmbed()
        .setTitle(`**Support Role Selected!**`)
        .setColor("#46EF13")
        .setDescription(`<a:online:733711146082762834> Support Role has been selected!`);
        message.channel.send(roleemb)
    };
    

    if (message.content.startsWith('!uptime')) {
        message.delete();
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
      
        let uptime = `🗓️ ${days.toFixed()} days\n🗓️ ${hours.toFixed()} hours\n🗓️ ${minutes.toFixed()} minutes\n🗓️ ${seconds.toFixed()} seconds`;
      
        const embed = new Discord.MessageEmbed()
          .setTitle(`**Uptime 🕰️**`)
          .setThumbnail("https://imgur.com/WZMylbw.gif")
          .setColor("#FF0000")
          .setDescription(`**I've been online for:**\n${uptime}`)
          .setFooter("Optimal Tickets | !uptime", "https://cdn.discordapp.com/attachments/747103967359664248/748241414780878888/OptmalTickets.jpg")
          .setTimestamp()
      
        message.channel.send({embed});
    };
});

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    if(user.bot) return;

    let ticketid = await settings.get(`${reaction.message.guild.id}${reaction.message.id}-ticket`);
    let categoryTicket = await settings.get(`${reaction.message.guild.id}${reaction.message.id}-category`);
    let staffrole = reaction.message.guild.roles.cache.get(await db.get(`${reaction.message.guild.id}-staff`));

    if(!staffrole) staffrole = " "

    if(!ticketid) return;

    if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);

        let categoryT = reaction.message.guild.channels.cache.find(c => c.name.includes(`${categoryTicket}`) && c.type == "category");

        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            type: 'text',
        }).then(channel => {
            channel.setParent(categoryT.id);
            channel.overwritePermissions([
                {
                    id: user.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: reaction.message.guild.roles.cache.get(db.get(`${reaction.message.guild.id}-staff`)),
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                },
            ]);
            const embed = new Discord.MessageEmbed()
  
            .setTitle("Welcome to your TICKET!")
            .setColor("00ff00")
            .setDescription(`Hello, <@${user.id}>! Our __**Support Team**__ will be here to help you as soon as possible!\n In the mean time, please __describe the reason for this TICKET__!`)
            .setFooter(`Optimal Tickets made by </ro3sk1>#2404`)
            .setThumbnail(reaction.message.guild.iconURL())
            .setTimestamp()
            channel.send(embed);
            channel.send(`<@${user.id}> ${staffrole}`).then(msg => msg.delete({ timeout: 100 }))
        })
    }
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
  
   const args = message.content
       .trim().slice(config.prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();
  
   try {
       const commandFile = require(`./commands/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
  }
  });

client.login(token);