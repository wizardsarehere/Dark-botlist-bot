const { Client, Collection } = require("discord.js");
const bot = (global.client = new Client({
  fetchAllMembers: true,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
}));
const { token, developersID } = require("./Source/Configs/botConfig");

bot.default_Cmd = new Collection();
bot.aliases = new Collection();
require("./Source/Handlers/command-Handler");
require("./Source/Handlers/event-Handler");
require("./Source/Handlers/mongo-Handler");
require("./Source/Handlers/function-Handler");

bot
  .login(token)
  .then((x) => console.log(`[BOT] Successfully ${bot.user.tag} activated.`))
  .catch((err) => console.log("[BOT] Failed to login:\n" + err));

bot.on("messageCreate", async (message) => {
  if (!developersID.includes(message.author.id)) return;
 
    let args = message.content.split(" ").slice(1); 
    if (message.content.split(" ")[0] === "!fake") {

        if(args[0] === "katıl" || args[0] === "join") {
            message.react("✅") 
            bot.emit("guildMemberAdd", (await message.guild.members.cache.get(message.author.id)));
          
        }

        if (args[0] === "ayrıl" || args[0] === "leave") {

            message.react("✅") 
            bot.emit("guildMemberRemove", message.member || (await message.guild.members.cache.get(message.author.id)));

        }  
    }
});
