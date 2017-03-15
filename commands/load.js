exports.run = function(bot, msg, args) {
    for (cmd of args) {
        try {
            delete require.cache[require.resolve(`./${cmd}`)];
            bot.command[cmd] = require("./" + cmd);
            console.log(`Loaded [${cmd}]!`);
        } catch(e) {console.log(`Failed to load ${cmd}`);}
    }
}

exports.info = {
    name: "load",
    alias: "",
    mode: "all",
    role: "Bot God",
    description: "Loads specified commands"
};
