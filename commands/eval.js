const Discord = require("discord.js");

exports.admin = true;

exports.run = function(bot, msg, args) {
    var code = args.join(" ");

    try {
        var evaled = eval(code);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
        msg.channel.sendMessage(
            "```xl\n" +
            clean(bot, evaled) +
            "\n```"
        );
    }
    catch(err) {
        msg.channel.sendMessage(
            "`ERROR` ```xl\n" +
            clean(bot, err) +
            "\n```"
        );
    }
};

function clean(bot, text) {
    if (typeof(text) === "string") {
        return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(new RegExp(bot.config.token, "g"), "[WHOA TOKEN]");
    }
    else {
        return text;
    }
}

exports.info = {
    name: "eval",
    alias: "",
    mode: "all",
    role: "Bot God",
    description: "Runs arbitrary JavaScript code"
};
