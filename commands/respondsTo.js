const responds = require("./respondsTo.json");
// Simple responses based on JSON configuration
exports.run = function(msg, command, args, err) {
    if (responds[command] && (args.length == 0) ) {
        msg.channel.sendMessage(responds[command]);
    } else {
        console.log(`Error executing \n${err}`);
    }
}
