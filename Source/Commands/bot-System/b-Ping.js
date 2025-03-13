const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {

    let mesajgecikme = new Date().getTime() - message.createdTimestamp

    const uptime = moment
        .duration(bot.uptime)
        .format("M [Ay] W [Hafta] D [Gün] H [Saat] m [Dakika]");
    const leax = (A, B) => {
        return Math.floor((A * 100) / B);
    };

    mongoose.connection.db.admin().ping(function (err, result) {
        var mongooseSeconds = ((result.ok % 60000) / 1000);

        let embed = new MessageEmbed()
            .setAuthor({ name: `${bot.user.username} Verileri`, iconURL: message.guild.iconURL() })
            .addFields([
                { name: "⏱️ Ping ↷", value: `\`\`\` ${bot.ws.ping}ms \`\`\``, inline: false },
                { name: "⌛ Mesaj gecikmesi ↷", value: `\`\`\` ${mesajgecikme}ms \`\`\``, inline: false },
                { name: "🧭 Uptime ↷", value: `\`\`\` ${uptime} \`\`\``, inline: true },
                { name: "📡 Database ↷", value: `\`\`\` ${result.ok}ms \`\`\``, inline: true },
            ])
            .setColor("RANDOM")


        message
            .channel
            .send({ embeds: [embed] });
    })
};
module.exports.conf = {
    name: "ping",
    aliases: ["ping", "veri", "gecikmeler"],
};