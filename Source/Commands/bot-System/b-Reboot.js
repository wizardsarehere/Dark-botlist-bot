const { MessageButton, MessageActionRow } = require("discord.js");
const { developersID } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");

module.exports.run = async (bot, message, args) => {
    if (!developersID.includes(message.author.id)) {
        return;
      }

    let evet = new MessageButton({ style: "SUCCESS", label: "EVET", customId: "YES", disabled: false });
    let hayır = new MessageButton({ style: "DANGER", label: "HAYIR", customId: "NO", disabled: false });

    let rmesaj = "**Seçim!** Botu yeniden başlatmak istediğine eminmisin sahibim?";

    let components = [new MessageActionRow({ components: [evet, hayır] })];
    message.channel.send({ content: rmesaj, components: components, ephemeral: true });

    bot.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId == "YES") {

            let content = "**İşlem Başarılı!** Yeniden başlatma kabul edildi, yeniden başlıyorum birazdan aranıza döneceğim.";
            let components = [];

            interaction.reply({ content: content, components: components, ephemeral: true });
            setTimeout(() => {
                console.log(`[BOT MESSAGE] Bot yeniden başlatılıyor...`);
                process.exit(0)
            }, 2000);
        }
    })

    bot.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId == "NO") {

            let content = "**İşlem Başarısız!** Yeniden başlatma işlemi iptal edildi. ";
            let components = [];

            interaction.reply({ content: content, components: components, ephemeral: true });

        }
    })

};
module.exports.conf = {
    name: "reboot",
    aliases: [],
};