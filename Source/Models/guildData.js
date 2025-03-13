const { Schema, model } = require("mongoose");

const data = Schema({
  guildID: String,
});

module.exports = model("data", data);
