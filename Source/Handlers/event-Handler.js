const fs = require("fs");
const bot = global.client;

const eventFiles = fs
  .readdirSync("./Source/Events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`../Events/${file}`);
  bot.on(event.conf.name, event);
}
