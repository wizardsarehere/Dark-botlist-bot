const { prefixs } = require("../Configs/botConfig");
const bot = global.client;

module.exports = async (message) => {
  if (message.author.bot || !message.guild || !message.content) return;

  let prefix = prefixs;
  let komut = prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (!komut) return;
  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0].slice(komut.length).toLowerCase()
  let cmd = bot.default_Cmd.get(command) ||  bot.default_Cmd.get(bot.aliases.get(command));
  if (cmd) {
    cmd.run(bot, message, args);
  }
};

module.exports.conf = {
  name: "messageCreate",
};
