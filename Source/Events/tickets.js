const { MessageEmbed, MessageActionRow, Permissions, MessageButton } = require("discord.js");
const bot = global.client;

module.exports = async (interaction) => {

    if (!interaction.isSelectMenu()) return;

    let kategori = ""
    let roleStaff = interaction.guild.roles.cache.get('')
    let ZatenVar = interaction.guild.channels.cache.find(channel => channel.topic == interaction.user.id)
    let Closed = new MessageButton({ style: "DANGER", label: "Kapat", customId: "kanalkapat", emoji: "🔒", disabled: false })

    bot.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId == "kanalkapat") {
            const channel = interaction.channel
            channel.delete();
        }
    })


    if (interaction.customId == "select") {
        if (ZatenVar)
            return interaction
                .reply({ content: '**Başarısız!** Zaten açık bir destek talebin var!', ephemeral: true }).catch(() => { })
        if (interaction.values[0] == "botlistsdestek") {
            interaction.guild.channels.create(`Destek ${interaction.user.username}`, {
                type: 'GUILD_TEXT',
                topic: `${interaction.user.id}`,
                parent: `${kategori}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                        ]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.EMBED_LINKS,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.ATTACH_FILES,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        ]
                    },
                    {
                        id: roleStaff,
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.ATTACH_FILES,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                            Permissions.FLAGS.EMBED_LINKS,
                            Permissions.FLAGS.MANAGE_CHANNELS,
                            Permissions.FLAGS.MANAGE_MESSAGES,
                            Permissions.FLAGS.USE_APPLICATION_COMMANDS,
                        ]
                    }
                ]
            }).then((channel) => {
                const botdestek = new MessageEmbed()

                    .setTitle("Dark Botlist Destek")
                    .setDescription('Lütfen bot ekleme talebinizi ayrıntılı bir şekilde açıklayın. Bu sayede bir sunucu yöneticisi sizinle iletişime geçebilir ve işlemleri başlatabilir.')
                    .setThumbnail(interaction.guild.iconURL())
                    .setFooter({ text: `${interaction.guild.name} Destek Sistemi`, })
                    .setColor("WHITE")

                channel
                    .send({ embeds: [botdestek], content: `${roleStaff} & ${interaction.user}`, components: [new MessageActionRow({ components: [Closed] })] }).catch(() => { })
                interaction
                    .reply({ content: `**Başarılı!** destek kanalınız oluşturuldu! <#${channel.id}>`, ephemeral: true }).catch(() => { })
            })





        } else if (interaction.values[0] == "partnerdestek") {
            interaction.guild.channels.create(`Destek ${interaction.user.username}`, {
                type: 'GUILD_TEXT',
                topic: `${interaction.user.id}`,
                parent: `${kategori}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                        ]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.EMBED_LINKS,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.ATTACH_FILES,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        ]
                    },
                    {
                        id: roleStaff,
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.ATTACH_FILES,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                            Permissions.FLAGS.EMBED_LINKS,
                            Permissions.FLAGS.MANAGE_CHANNELS,
                            Permissions.FLAGS.MANAGE_MESSAGES,
                            Permissions.FLAGS.USE_APPLICATION_COMMANDS,
                        ]
                    }
                ]
            }).then((channel) => {
                const partneryardım = new MessageEmbed()

                    .setTitle("Dark Botlist Destek")
                    .setDescription('Lütfen partner talebinizi ayrıntılı bir şekilde açıklayın. Bu sayede bir sunucu yöneticisi sizinle iletişime geçebilir ve işlemleri başlatabilir.')
                    .setThumbnail(interaction.guild.iconURL())
                    .setFooter({ text: `${interaction.guild.name} Destek Sistemi`, })
                    .setColor("WHITE")

                channel
                    .send({ embeds: [partneryardım], content: `${roleStaff} | ${interaction.user}`, components: [new MessageActionRow({ components: [Closed] })] }).catch(() => { })
                interaction
                    .reply({ content: `**Başarılı!** destek kanalınız oluşturuldu! <#${channel.id}>`, ephemeral: true }).catch(() => { })
            })



        } else if (interaction.values[0] == "başkabişedestek") {
            interaction.guild.channels.create(`Destek ${interaction.user.username}`, {
                type: 'GUILD_TEXT',
                topic: `${interaction.user.id}`,
                parent: `${kategori}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                        ]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.EMBED_LINKS,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.ATTACH_FILES,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                        ]
                    },
                    {
                        id: roleStaff,
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL,
                            Permissions.FLAGS.SEND_MESSAGES,
                            Permissions.FLAGS.ATTACH_FILES,
                            Permissions.FLAGS.ADD_REACTIONS,
                            Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                            Permissions.FLAGS.READ_MESSAGE_HISTORY,
                            Permissions.FLAGS.EMBED_LINKS,
                            Permissions.FLAGS.MANAGE_CHANNELS,
                            Permissions.FLAGS.MANAGE_MESSAGES,
                            Permissions.FLAGS.USE_APPLICATION_COMMANDS,
                        ]
                    }
                ]
            }).then((channel) => {
                const başka = new MessageEmbed()

                    .setTitle("Dark Botlist Destek")
                    .setDescription('Lütfen talebinizi ayrıntılı bir şekilde açıklayın. Bu sayede bir sunucu yöneticisi sizinle iletişime geçebilir ve işlemleri başlatabilir.')
                    .setThumbnail(interaction.guild.iconURL())
                    .setFooter({ text: `${interaction.guild.name} Destek Sistemi`, })
                    .setColor("WHITE")

                channel
                    .send({ embeds: [başka], content: `${roleStaff} | ${interaction.user}`, components: [new MessageActionRow({ components: [Closed] })] }).catch(() => { })
                interaction
                    .reply({ content: `**Başarılı!** destek kanalınız oluşturuldu! <#${channel.id}>`, ephemeral: true }).catch(() => { })
            })




        }
    }

};
module.exports.conf = {
    name: "interactionCreate",
};