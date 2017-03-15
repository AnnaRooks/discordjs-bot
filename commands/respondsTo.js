const responds = require("../data/respondsTo.json");
// Simple responses based on JSON configuration
exports.exe = function(bot, msg, cmd, args, err) {
    if (args.length !== 0) return;
    if (responds.regular[cmd]) {
        msg.channel.sendMessage(responds.regular[cmd]);
    } else if (responds.prefixed[cmd]){
        msg.channel.sendMessage(bot.config.prefix + responds.prefixed[cmd]);
    } else {
        console.log(`Error executing [${cmd}]: ${err}`);
    }
}

exports.info = {
    name: "respondsTo",
    alias: "",
    mode: "serverbot",
    role: "",
    description: "Simple responses based on JSON configuration"
};
