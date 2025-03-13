const { MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, Permissions } = require("discord.js");
const serverConfig = require("../../Configs/serverConfig");
const emojiConfig = require("../../Configs/emojiConfig");

module.exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    if (!serverConfig.staffRolesID.some((x) => message.member.roles.cache.has(x)))
      return;
  }
  
  let bots = 1
  let error = []

  message.guild.members.cache
    .filter((x) => x.user.bot)
    .map((x) => {
      if (x.user.bot) {
        x
         .kick()
         .then(() => bots++)
         .catch(() => message.channel.send({ content: `> ${emojiConfig.uyarı} **Uyarı!** ${x.user} Bu amın düdüğünü atamadım bilgine.` }))
      }
    })
};
module.exports.conf = {
  name: "kickbots",
  aliases: [],
};