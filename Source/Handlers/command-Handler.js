const fs = require("fs");
const bot = global.client;

fs.readdirSync("./Source/Commands/").forEach((folder) => {
  const commandFiles = fs
    .readdirSync(`./Source/Commands/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const command = require(`../Commands/${folder}/${file}`);
    bot.default_Cmd.set(command.conf.name, command);

    if (command.conf.aliases) {
      command.conf.aliases.forEach((aliase) => {
        bot.aliases.set(aliase, command.conf.name);
      });
    }
  });
});
