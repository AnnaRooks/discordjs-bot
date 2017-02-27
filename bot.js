const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.login(config.token);

client.on('ready', () => {
    client.user.setGame("with fire");
    console.log('I am ready!');
});

client.on("message", (message) => {
    // Must be prepended with the prefix and not a bot
    if (message.author.id !== config.ownerID) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;

    if (message.content.startsWith(config.prefix + "ping")) {
        message.channel.sendMessage("pong!");
        console.log("[ping] from " + message.author.username);
    } else if (message.content.startsWith(config.prefix + "foo")) {
        message.channel.sendMessage("bar!");
        console.log("[foo] from " + message.author.username);
    }
});

