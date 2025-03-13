const { MessageButton, MessageEmbed, MessageSelectMenu, MessageActionRow, Permissions } = require("discord.js");
const serverConfig = require("../../Configs/serverConfig");
const emojiConfig = require("../../Configs/emojiConfig");

module.exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    if (!serverConfig.staffRolesID.some((x) => message.member.roles.cache.has(x)))
      return;
  }
  
  let emptyButton1 = new MessageButton({ style: "SECONDARY", label: "ㅤㅤ", customId: "emptyButton1", disabled: true })
  let emptyButton2 = new MessageButton({ style: "SECONDARY", label: "ㅤㅤ", customId: "emptyButton2", disabled: true })
  let urlButton = new MessageButton({ style: "LINK", url: "https://top.gg/tr/bot/1055570192463319211", label: "Roderika OY", emoji: "1080200204931846155", disabled: false })
  let addButton = new MessageButton({ style: "LINK", url: "https://discord.com/oauth2/authorize?client_id=1055570192463319211&permissions=8&scope=applications.commands%20bot", label: "Roderika", emoji: "1080200204931846155", disabled: false }) 
  let botAdd = new MessageButton({ style: "PRIMARY", label: "Bot Ekle", customId: "botAdd", disabled: false })
    
  let embed = new MessageEmbed()
    .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL() })
    .setDescription(`> Bot eklemek için **Bot Ekle** butonuna tıklamanız gerekli. Herhangi bir sorunla karşılaştığınızda yetkili kişilere bildirmeyi unutmayın.\n\n> ${emojiConfig.uyarı} **Dikkat!** Bot eklemek için [**Roderika**](https://top.gg/tr/bot/1055570192463319211) botumuza oy vermeniz gerekiyor.`)
    .setColor("#ffffff") 
  
  message
    .channel
    .send({ embeds: [embed], components: [new MessageActionRow({ components: [emptyButton1, addButton,  botAdd, urlButton, emptyButton2] })] })
};
module.exports.conf = {
  name: "wizard",
  aliases: [],
};