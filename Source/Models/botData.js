const { Schema, model } = require("mongoose");

const mod = Schema({
  number: { type: Number, default: 0 }
});

module.exports = model("botData", mod);
