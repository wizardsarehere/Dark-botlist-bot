const { MessageEmbed, } = require("discord.js");

module.exports.run = async (bot, message, args) => {


    let embed = new MessageEmbed()

        .setDescription(`
🇹🇷
 ・Aşağıdaki 2 şartı tamamlamadan bot başvurusu yapamazsın.
1) RoderikaOY butonuna tıkla, açılan sayfada Vote butonuna tıkla, birkaç saniye reklamın ardından tekrar Vote butonuna tıkla.
2) RoderikaOY butonuna tıkla, açılan sayfada en alttaki bölümden bir yorum yap ve 5 yıldızı seç, Post Review butonuna tıkla.

🇺🇸
・Before completing the two requirements below, you cannot apply for the bot.
1) Click on the RoderikaVOTE button, click on the Vote button on the opened page, and after a few seconds of advertisement, click on the Vote button again.
2) Click on the RoderikaVOTE button, make a comment from the bottom section of the opened page, select 5 stars, and click the Post Review button.
    `)
        .setColor("#ffffff")

    message
        .channel
        .send({ embeds: [embed] })
};
module.exports.conf = {
    name: "addbot",
    aliases: ["botaddhelp", "botekleyardım", "help"],
};