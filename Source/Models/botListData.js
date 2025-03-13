const { Schema, model } = require("mongoose");

const botList = Schema({
  guildID: { type: String, default: "" },
  applications: { type: Array, default: "" },
  queue: { type: Array, default: "" },
  number: { type: Number, default: 0 },
});

module.exports = model("botListData", botList);
