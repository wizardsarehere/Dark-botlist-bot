const { MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, Permissions, UserFlags } = require("discord.js");
const { developersID } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");
const axios = require("axios");

module.exports.run = async (bot, message, args) => {
  if (!developersID.includes(message.author.id)) {
    return;
  }

  const client = bot;
 
 const toEval = args.slice(0).join(" ");
   try {
    var evaled = clean(await eval(toEval));
    if (evaled.match(new RegExp(`${client.token}`, "g"))) evaled;

    message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } catch (err) {
    message.channel.send(`\`\`\`js\n${err}\`\`\``);
  }

  function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
};
module.exports.conf = {
  name: "eval",
  aliases: [],
};
