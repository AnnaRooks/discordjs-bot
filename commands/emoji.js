const emoji = require("../data/emoji.json");

exports.exe = function(bot, msg) {
    let matched = msg.content.match(new RegExp(emoji.prefix + '\\w+', 'g'));
    if (matched) {
        let toReplace = matched
            .map(i => i.substring(emoji.prefix.length))
            .filter(i => !!emoji.matches[i]);
        console.log(`[emoji] replacing ${toReplace}!`);
        let mod = msg.content;
        for (let i of toReplace) {
            mod = mod.replace(emoji.prefix + i, emoji.matches[i]);
        }
        msg.edit(mod + "\u202e");
    }
}

exports.info = {
    name: "emoji",
    alias: "",
    mode: "selfbot",
    role: "",
    description: "Replaces emoji with special prefix"
};
