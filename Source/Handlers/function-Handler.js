const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const emojiConfig = require("../Configs/emojiConfig");
const botModel = require("../Models/botData");
const bot = global.client;

bot.button = async function (Style, Label, Emoji, Id) {
  let button = new MessageButton()
    .setStyle(Style)
    .setLabel(Label)
    .setEmoji(Emoji)
    .setCustomId(Id);

  return button;
};

bot.row = async function (Buttons) {
  let row = new MessageActionRow({ components: Buttons });
  
  return row;
};

bot.collection = async function collection(ID, channel) {
  const filter = (x) => x.author.id == ID;
  const collected = await channel.awaitMessages({ filter, max: 1, time: 1000 * 60 * 5 });

  return collected.first();
}  

bot.moons = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık",
}

bot.numberID = async function numberID() {
  let botFind = await botModel.findOne({})
  let botData = botFind ? botFind.number || 0 : 0 

    await botModel.updateOne({}, { $inc: { number: 1 } }, { upsert: true })

  let afterBotFind = await botModel.findOne({})
  let afterBotData = botFind ? botFind.number || 0 : 0 
  
  return afterBotData;
}

