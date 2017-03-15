"use strict";
const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();

bot.argv = require("minimist")(process.argv.slice(2));
bot.config = require( bot.argv.config ? bot.argv.config : "./config.json");
bot.command = {};

let cmdFiles = fs.readdirSync("./commands");
bot.mode = bot.argv.selfbot ? "selfbot" : "serverbot";
for (let cmd of cmdFiles) {
    try {
        let command = require(`./commands/${cmd}`);
        if ((command.info.mode == bot.mode || command.info.mode == "all") &&
            !bot.config.dontLoad.includes(command.info.name))
            bot.command[command.info.name] = command;
    } catch(e) {console.error(e)};
}

bot.login(bot.config.token);

bot.on("ready", () => {
    bot.user.setGame(bot.argv.game);
    console.log(`Ready to activate in ${bot.channels.size} channels on ${bot.guilds.size} servers, against a total of ${bot.users.size} users.`);
});

bot.on("message", (msg) => {
    if (bot.argv.selfbot) {
        if (msg.author.id !== bot.user.id) return;
        bot.command.emoji.exe(bot, msg);
        if (!msg.content.startsWith(bot.config.prefix)) return;
        let args = msg.content.split(" ");
        let cmd = args.shift().slice(bot.config.prefix.length);
        try {
            bot.command[cmd].run(bot, msg, args);
        } catch (e) {console.log(`Error executing [${cmd}]:\n${e}`);}

    } else {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(bot.config.prefix)) return;
        // Redundant code to reduce processor load
        let args = msg.content.split(" ");
        let cmd = args.shift().slice(bot.config.prefix.length);
        try {
            if (bot.command[cmd].info.role && !msg.member.roles.has(msg.guild.roles.find("name", bot.command[cmd].info.role).id))
                msg.reply(`You need the ${bot.command[cmd].info.role} role to do that!`);
            else bot.command[cmd].run(bot, msg, args);
        } catch (e) {bot.command.respondsTo.exe(bot, msg, cmd, args, e);}
    }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("disconnect", (e) => console.warn(e));
