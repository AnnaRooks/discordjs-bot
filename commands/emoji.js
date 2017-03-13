const emoji = require("./emoji.json");

exports.run = function(bot, msg) {
    let matched = msg.content.match(/&\w+/g);
    if (matched) {
        let toReplace = matched
            .map(i => {return i.substring(emoji.prefix.length)})
            .filter(i => {return !!emoji.matches[i]});
        console.log(`[emoji] replacing ${toReplace}!`);
        let modifiedMsg = msg.content;
        for (var i = 0; i < toReplace.length; i++) {
            let r = toReplace[i];
            modifiedMsg = modifiedMg.replace(emoji.prefix + r, emoji.matches[r]);
        }
        msg.edit(modifiedMessage + "\u202e");
    }
