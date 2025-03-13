const { MessageEmbed, MessageButton, MessageActionRow, Modal, TextInputComponent, Permissions } = require("discord.js");
const botListModel = require("../Models/botListData.js");
const serverConfig = require("../Configs/serverConfig");
const emojiConfig = require("../Configs/emojiConfig");
const { topgg } = require("../Configs/botConfig");
const axios = require("axios");
const bot = global.client;

module.exports = async (member) => {
  if (member.user.bot) {
    let botListFind = await botListModel.findOne({ guildID: member.guild.id })
        
    let applicationMap = botListFind ? botListFind.applications?.map((x) => x) || [] : []
    let applicationData = applicationMap.find((x) => x.id == member.user.id)
        
    if (applicationData) {
      let clientId = member.user.id
      let client = await axios({ method: "GET", url: `https://discord.com/api/users/${clientId}`, headers: { Authorization: `Bot ${bot.token}`, }, })
        .then((x) => x.data)
        .catch(() => {})
		
	  let user = member.guild.members.cache
          .get(applicationData.ownerId)

      await botListModel
        .updateOne({ guildID: member.guild.id }, { $pull: { applications: { id: clientId } } }, { upsert: true })

      let warn = new MessageEmbed()
        .setTitle(`${emojiConfig.uyarı} Uyarı!`)
        .setDescription(`> Bir bot sunucudan ayrıldı ve sistemden silindi. Geliştirici rolü sahibinden kaldırıldı.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${member.user.username} | ${member.user.id} \`\`\``, inline: false }, 
          { name: "Bot Sahibi ↷", value: `\`\`\` ${member.user.username} | ${member.user.id} \`\`\``, inline: false }, 
        ])
        .setColor("RED")

        bot.channels.cache
          .get(serverConfig.rejectLogID)
          .send({ embeds: [warn] })
          .catch(() => {})

        user
          ?.roles
          ?.remove(serverConfig.developerRolesID)
          .catch(() => {})
    }
  } else {
    let botListFind = await botListModel.findOne({ guildID: member.guild.id })
    
    let queueMap = botListFind ? botListFind.queue?.map((x) => x) || [] : []
    let queueData = queueMap.find((x) => x?.ownerId == member.user.id)
    
    let applicationMap = botListFind ? botListFind.applications?.map((x) => x) || [] : []
    let applicationData = applicationMap.find((x) => x?.ownerId == member.user.id)
    
    if (queueData) {    
      let clientId = queueData.id
      let client = await axios({ method: "GET", url: `https://discord.com/api/users/${clientId}`, headers: { Authorization: `Bot ${bot.token}`, }, })
        .then((x) => x.data)
        .catch(() => {})

      await botListModel
        .updateOne({ guildID: member.guild.id }, { $pull: { queue: { id: clientId } } }, { upsert: true })

      let warn = new MessageEmbed()
        .setTitle(`${emojiConfig.uyarı} Uyarı!`)
        .setDescription(`> Bir bot sahibi botu onaylanmadan sunucudan çıktığı için botu sıradan çıkarıldı.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
          { name: "Bot Sahibi ↷", value: `\`\`\` ${member.user.username} | ${member.user.id} \`\`\``, inline: false }, 
        ])
        .setColor("RED")

        bot.channels.cache
          .get(serverConfig.rejectLogID)
          .send({ embeds: [warn] })
          .catch(() => {})

        member.guild.channels.cache
          .get(serverConfig.staffLogID)
          .messages
          .fetch(queueData.messageId)
          .then((message) => {
            message
              .delete()
              .catch(() => {})
          })
          .catch(() => {})
    }
    
    if (applicationData) {
      let clientId = applicationData.id
      let client = await axios({ method: "GET", url: `https://discord.com/api/users/${clientId}`, headers: { Authorization: `Bot ${bot.token}`, }, })
        .then((x) => x.data)
        .catch(() => {})

      await botListModel
        .updateOne({ guildID: member.guild.id }, { $pull: { queue: { id: clientId } } }, { upsert: true })

      let warn = new MessageEmbed()
        .setTitle(`${emojiConfig.uyarı} Uyarı!`)
        .setDescription(`> Bir bot sahibi sunucudan çıktığı için botu sunucudan atıldı.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
          { name: "Bot Sahibi ↷", value: `\`\`\` ${member.user.username} | ${member.user.id} \`\`\``, inline: false }, 
        ])
        .setColor("RED")

        bot.channels.cache
          .get(serverConfig.rejectLogID)
          .send({ embeds: [warn] })
          .catch(() => {})

        member.guild.members.cache
          .get(clientId)
          ?.kick()
          .catch(() => {})

    }
  }
};
module.exports.conf = {
  name: "guildMemberRemove",
};