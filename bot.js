const Discord = require("discord.js");
const replace = require("./replace.json");
const config = require("./config.json");
const cmds = require("./commands.json");

const client = new Discord.Client();

client.login(config.token);

client.on('ready', () => {
    client.user.setGame("with fire");
    console.log(`Ready to activate in ${client.channels.size} channels on ${client.guilds.size} servers, against a total of ${client.users.size} users.`);
});

client.on("message", (message) => {
    // Must be message from self (for using with selfbot)
    // if (message.author.id !== client.user.id) return;
    // Must be prepended with the prefix and not a bot (for using with bot account)
    if (message.author.id !== config.ownerID) return;
    if (message.author.bot) return;

    if (message.content.match(/&\w+/g)) {
        let toReplace = message.content.match(/&\w+/g)
            .map(i => {return i.substring(replace.prefix.length)})
            .filter(i => {return !!replace.matches[i]});
        console.log(`[emoji] replacing ${toReplace}!`);
        let modifiedMessage = message.content;
        for (var i = 0; i < toReplace.length; i++) {
            let r = toReplace[i];
            modifiedMessage = modifiedMessage.replace(replace.prefix + r, replace.matches[r]);
        }
        message.reply(modifiedMessage);
    }

    if (!message.content.startsWith(config.prefix)) return;
    let cmd = message.content.substring(1).trim();

    if (cmds[cmd]) {
        message.channel.sendMessage(cmds[cmd]);
    }
});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
