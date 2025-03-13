const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { developersID } = require("../../Configs/botConfig");

module.exports.run = async (bot, message, args) => {
    if (!developersID.includes(message.author.id)) {
        return;
    }


    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Lütfen destek almak istediğiniz kategori seçiniz.')
                .addOptions([
                    {
                        label: '🤖 | Botlist',
                        description: 'Bot ekleme ile ilgili sorularınız için.',
                        value: 'botlistsdestek',
                    },
                    {
                        label: '🤝 | Partner',
                        description: 'Partnerlik ile ilgili sorularınız için.',
                        value: 'partnerdestek',
                    },
                    {
                        label: '🤷‍♂️ | Surunum başka birşey',
                        description: 'Bilgi ve yardım almak için.',
                        value: 'başkabişedestek',
                    },
                ]),
        );

    const embed = new MessageEmbed()

        .setAuthor({ name: `${message.guild.name} Destek Sistemi`, iconURL: message.guild.iconURL() })
        .setDescription("Aşağıdaki seçim menüsünü kullanarak ilgili sorununuzu seçip bize bildirirseniz, sizin için daha hızlı ve etkili bir çözüm sunabiliriz.\n\nEğer sorununuzun kategorisi seçeneklerimizde yer almıyorsa, merak etmeyin! 🤷‍♂️ Sorunum başka birşey seçeneğiyle destek talebi oluşturabilirsiniz. Her zaman yardımcı olmaktan mutluluk duyarız.")
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: `${message.guild.name} Destek Sistemi`, })
        .setColor("WHITE")

    await message
        .channel
        .send({ embeds: [embed], components: [row] }).catch(() => {})


};
module.exports.conf = {
    name: "ticket",
    aliases: [],
};