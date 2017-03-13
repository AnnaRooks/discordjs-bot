"use strict";
var argv = require('minimist')(process.argv.slice(2));

const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require( argv.config ? argv.config : "./config.json");
bot.login(config.token);

bot.on('ready', () => {
    bot.user.setGame(argv.game);
    console.log(`Ready to activate in ${bot.channels.size} channels on ${bot.guilds.size} servers, against a total of ${bot.users.size} users.`);
});

bot.on("message", (msg) => {
    if (argv.selfbot) {
        // Must be message from self (for using with selfbot)
        if (msg.author.id !== bot.user.id) return;
        // Emoji replacer
        require("./commands/emoji").run(bot, msg);
        // Real command work is here
        if (!msg.content.startsWith(config.prefix)) return;
        let args = msg.content.split(" ");
        let command = args.shift().slice(config.prefix.length);
        try {
            let cmd = require("./commands/selfbot/" + command);
            cmd.run(bot, msg, args);
        } catch (e) {console.log(`Error executing \n${e}`);}

    } else {
        // Must be prepended with the prefix and not a bot (for using with bot account)
        if (msg.author.bot) return;
        if (!msg.content.startsWith(config.prefix)) return;
        // Redundant code to reduce processor load
        let args = msg.content.split(" ");
        let command = args.shift().slice(config.prefix.length);
        try {
            let cmd = require("./commands/serverbot/" + command);
            cmd.run(bot, msg, args);
        } catch (e) {require("./commands/respondsTo").run(msg, command, args, e);}
    }
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.on('disconnect', (e) => console.warn(e));
