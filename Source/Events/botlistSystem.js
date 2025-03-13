const { MessageEmbed, MessageButton, MessageActionRow, Modal, TextInputComponent, Permissions } = require("discord.js");
const botListModel = require("../Models/botListData.js");
const serverConfig = require("../Configs/serverConfig");
const emojiConfig = require("../Configs/emojiConfig");
const { topgg } = require("../Configs/botConfig");
const axios = require("axios");
const bot = global.client;

module.exports = async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "botAdd") {
      const dblAPI = require("dblapi.js");
      const botVote = new dblAPI(topgg, bot);
      const hasVoted = await botVote.hasVoted(interaction.user.id);

      if (!hasVoted) {
        return interaction
          .reply({ embeds: [new MessageEmbed({ title: `${emojiConfig.uyarı} Uyarı!`, description: `> Bot eklemek için [**Roderika**](https://top.gg/tr/bot/1055570192463319211) botumuza oy vermeniz gerekiyor.`, color: "RED" })], ephemeral: true })
          .catch(() => {})
      }

      const modal = new Modal()
        .setCustomId("add_bot")
        .setTitle("Bot Ekleme Formu!");

      const textInput1 = new TextInputComponent()
        .setCustomId("bot_id")
        .setLabel("BOT ID?")
        .setPlaceholder("Örnek: 1055570192463319211.")
        .setStyle("SHORT")
        .setMinLength(18)
        .setMaxLength(19)
        .setRequired(true);

      const textInput2 = new TextInputComponent()
        .setCustomId("bot_prefix")
        .setLabel("BOT PREFIX?")
        .setPlaceholder("Örnek: r! (SLASH Komut ise / olarak belirtmeniz yeterli).")
        .setStyle("SHORT")
        .setMinLength(1)
        .setMaxLength(10)
        .setRequired(true);

      const textInput3 = new TextInputComponent()
        .setCustomId("bot_topgg")
        .setLabel("BOT top.gg Onaylı mı?")
        .setPlaceholder("Cevap: evet/hayır.")
        .setStyle("SHORT")
        .setMinLength(4)
        .setMaxLength(5)
        .setRequired(true);

      modal.addComponents(new MessageActionRow({ components: [textInput1] }), new MessageActionRow({ components: [textInput2] }), new MessageActionRow({ components: [textInput3] }));
      await interaction.showModal(modal);
    }

    if (interaction.customId.split("_")[0] === "approveBot") {
      let clientId = interaction.customId.split("_")[1]
      let client = await axios({ method: "GET", url: `https://discord.com/api/users/${clientId}`, headers: { Authorization: `Bot ${bot.token}`, }, })
        .then((x) => x.data)
        .catch(() => {})
            
      await interaction.deferReply({ ephemeral: true });
      let botListFind = await botListModel.findOne({ guildID: interaction.guild.id })
      let botlistMap = botListFind ? botListFind.queue?.map((x) => x) || [] : []
      let botlistData = botlistMap.find(({ id }) => id == clientId)

      if (!interaction.guild.members.cache.get(client.id))
        return interaction
          .followUp({ content: `> ${emojiConfig.başarısız} **Başarısız!** Onaylamak istediğiniz bot sunucuya eklenmemiş?`, ephemeral: true })
          .catch(() => {})
      
      interaction.message
        .delete()
        .catch(() => {})
      
      await botListModel
        .updateOne({ guildID: interaction.guild.id }, { $pull: { queue: { id: clientId } } }, { upsert: true })
      await botListModel
        .updateOne({ guildID: interaction.guild.id }, { $push: { applications: botlistData } }, { upsert: true })
      
      let user = interaction.guild.members.cache
          .get(botlistData.ownerId)
          ?.user
      
      let warn = new MessageEmbed()
        .setTitle(`${emojiConfig.tada} Tebrikler!`)
        .setDescription(`> Sisteme eklediğiniz **${client.username}** isimli bot onaylandı ve sunucuya eklendi.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
        ])
        .setColor("#673AB7")
      
      let embed = new MessageEmbed()
        .setTitle(`${emojiConfig.başarılı} Onaylandı!`)
        .setDescription(`> Sisteme ${user} tarafından eklenen **${client.username}** isimli bot onaylandı.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
          { name: "Bot Sahibi ↷", value: `\`\`\` ${user.username} | ${user.id} \`\`\``, inline: false },
        ])
        .setColor("GREEN")
          
        interaction.guild.members.cache
          .get(botlistData.ownerId)
          ?.roles
          ?.add(serverConfig.developerRolesID)
          .catch(() => {})
      
        interaction.guild.members.cache
          .get(clientId)
          ?.roles
          ?.add(serverConfig.botRolesID)
          .catch(() => {})
      
        bot.channels.cache
          .get(serverConfig.approveLogID)
          .send({ content: `${user},`, embeds: [embed] })
          .catch(() => {})
      
        user
          ?.send({ embeds: [warn] })
          .catch(() => {})
              
        return interaction
          .followUp({ content: `> ${emojiConfig.başarılı} **Başarılı!** Bot onaylandı ve bilgilendirme mesajı gönderildi.`, ephemeral: true })
          .catch(() => {})
    }
    
    if (interaction.customId.split("_")[0] === "rejectBot") {
      const modal = new Modal()
        .setCustomId("reject_" + interaction.customId.split("_")[1])
        .setTitle("Bot Reddetme Formu!");

      const textInput1 = new TextInputComponent()
        .setCustomId("bot_reason")
        .setLabel("Botu reddetme sebebiniz nedir?")
        .setPlaceholder("Örnek: TOS kurallarına aykırı komut bulunuyor.")
        .setStyle("SHORT")
        .setMinLength(1)
        .setMaxLength(100)
        .setRequired(true);

      modal.addComponents(new MessageActionRow({ components: [textInput1] }));
      await interaction.showModal(modal);
    }
  }
  
  if (interaction.isModalSubmit()) {
    if (interaction.customId.split("_")[0] === "reject") {
      let reason = interaction.fields.getTextInputValue("bot_reason");
      let clientId = interaction.customId.split("_")[1]
      let client = await axios({ method: "GET", url: `https://discord.com/api/users/${clientId}`, headers: { Authorization: `Bot ${bot.token}`, }, })
        .then((x) => x.data)
        .catch(() => {})
            
      await interaction.deferReply({ ephemeral: true });
      let botListFind = await botListModel.findOne({ guildID: interaction.guild.id })
      let botlistMap = botListFind ? botListFind.queue?.map((x) => x) || [] : []
      let botlistData = botlistMap.find(({ id }) => id == clientId)

      interaction.message
        .delete()
        .catch(() => {})
      
      await botListModel
        .updateOne({ guildID: interaction.guild.id }, { $pull: { queue: { id: clientId } } }, { upsert: true })
      
      let user = interaction.guild.members.cache
          .get(botlistData.ownerId)
          ?.user
      
      let warn = new MessageEmbed()
        .setTitle(`${emojiConfig.uyarı} Uyarı!`)
        .setDescription(`> Sisteme eklediğiniz **${client.username}** isimli bot belirtilen sebep yüzünden reddedildi.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
          { name: "Reddedilme Sebebi ↷", value: `\`\`\` ${reason} \`\`\``, inline: false },
        ])
        .setColor("RED")
      
      let embed = new MessageEmbed()
        .setTitle(`${emojiConfig.başarısız} Reddedildi!`)
        .setDescription(`> Sisteme ${user} tarafından eklenen **${client.username}** isimli bot reddedildi.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
          { name: "Bot Sahibi ↷", value: `\`\`\` ${user.username} | ${user.id} \`\`\``, inline: false },
          { name: "Reddedilme Sebebi ↷", value: `\`\`\` ${reason} \`\`\``, inline: false },
        ])
        .setColor("RED")
          
        bot.channels.cache
          .get(serverConfig.rejectLogID)
          .send({ content: `${user},`, embeds: [embed] })
          .catch(() => {})
      
        user
          ?.send({ embeds: [warn] })
          .catch(() => {})
              
        return interaction
          .followUp({ content: `> ${emojiConfig.başarılı} **Başarılı!** Bot belirttiğiniz sebep ile reddedildi.`, ephemeral: true })
          .catch(() => {})
    }
    
    if (interaction.customId === "add_bot") {
      let id = interaction.fields.getTextInputValue("bot_id");
      let prefix = interaction.fields.getTextInputValue("bot_prefix");
      let topgg = interaction.fields.getTextInputValue("bot_topgg");
      
      await interaction.deferReply({ ephemeral: true });
      let client = await axios
        .get(`https://discord.com/api/v9/oauth2/authorize?client_id=${id}&scope=bot%20applications.commands`, { headers: { Authorization: "", } })
        .then((x) => x.data.bot)
        .catch(() => {})
      
      if (!client.bot)
        return interaction
          .followUp({ content: `> ${emojiConfig.başarısız} **Başarısız!** Belirtilen ID bir bota ait değil!`, ephemeral: true })
          .catch(() => {})
      
      if (!["evet", "hayır", "hayir"].includes(topgg.toLowerCase()))
        return interaction
          .followUp({ content: `> ${emojiConfig.başarısız} **Başarısız!** Lütfen top.gg sorusuna sadece **evet** veya **hayır** cevabını verin!`, ephemeral: true })
          .catch(() => {})
      
      let emptyButton1 = new MessageButton({ style: "SECONDARY", label: "ㅤㅤ", customId: "emptyButton1", disabled: true })
      let emptyButton2 = new MessageButton({ style: "SECONDARY", label: "ㅤㅤ", customId: "emptyButton2", disabled: true })
      let addButton = new MessageButton({ style: "LINK", url: `https://discord.com/oauth2/authorize?client_id=${client.id}&permissions=0&scope=applications.commands%20bot`, label: "Botu Ekle", emoji: "", disabled: false }) 
      let approveBot = new MessageButton({ style: "SUCCESS", label: "Onayla", customId: "approveBot_" + client.id, disabled: false })
      let rejectBot = new MessageButton({ style: "DANGER", label: "Reddet", customId: "rejectBot_" + client.id, disabled: false })
      
      let embed = new MessageEmbed()
        .setTitle(`${emojiConfig.tosun} Yeni Bot!`)
        .setDescription(`> Sisteme ${interaction.user} tarafından **${client.username}** isimli yeni bir bot eklendi.`)
        .addFields([ 
          { name: "Bot ↷", value: `\`\`\` ${client.username} | ${client.id} \`\`\``, inline: false }, 
          { name: "Bot Sahibi ↷", value: `\`\`\` ${interaction.user.username} | ${interaction.user.id} \`\`\``, inline: false },
          { name: "Sunucu Sayısı ↷", value: `\`\`\` ${client.approximate_guild_count} \`\`\``, inline: true },
          { name: "Prefix ↷", value: `\`\`\` ${prefix} \`\`\``, inline: true },
          { name: "DBL (top.gg) Onayı ↷", value: `\`\`\` ${topgg} \`\`\``, inline: true },
        ])
        .setColor("#673AB7")
          
        bot.channels.cache
          .get(serverConfig.botLogID)
          .send({ content: `${interaction.user},`, embeds: [embed] })
          .catch(() => {})
      
        bot.channels.cache
          .get(serverConfig.staffLogID)
          .send({ content: `${serverConfig.staffRolesID.map((x) => `<@&${x}>`).join(", ")},`, embeds: [embed.setTitle(`${emojiConfig.uyarı} Yeni Bot!`).setFooter({ text: "Bot hakkında işlem yapmak için buttonları kullanın.", iconURL: interaction.guild.iconURL({ dynamic: true }) }).setColor("RED")], components: [new MessageActionRow({ components: [emptyButton1, approveBot, addButton, rejectBot, emptyButton2] })] })
          .then(async (x) => await botListModel.updateOne({ guildID: interaction.guild.id }, { $push: { queue: { id: client.id, ownerId: interaction.user.id, prefix: prefix, topgg: topgg, time: Date.now(), messageId: x.id } } }, { upsert: true }))
          .catch(() => {})
              
        return interaction
          .followUp({ content: `> :white_check_mark: | **Başarılı!** Botunuz sıraya eklendi. Yetkililerin sunucuya eklemesini bekleyin.`, ephemeral: true })
          .catch(() => {})
    }
  }
};
module.exports.conf = {
  name: "interactionCreate",
};