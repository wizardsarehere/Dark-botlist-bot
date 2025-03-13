const { playing } = require("../Configs/botConfig");
const bot = global.client;

module.exports = async () => {
  
  bot.user.setPresence({
    activities: [{ name: `${playing}` }],
    status: "dnd",
  });

};

module.exports.conf = {
  name: "ready",
};
