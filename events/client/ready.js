const config = require(`../../botconfig/config.json`);
const Discord = require("discord.js");

module.exports = async (client) => {
  try {
    try{
      client.logger(`Discord Bot is online!`.bold.brightGreen);
      
      client.logger(
      `Bot User: `.brightBlue + `${client.user.tag}`.blue + `\n` +
      `Guild(s): `.brightBlue + `${client.guilds.cache.size} Servers`.blue + `\n` +
      `Watching: `.brightBlue + `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`.blue + `\n` +
      `Prefix: `.brightBlue + `${process.env.PREFIX || config.env.PREFIX}`.blue + `\n` +
      `Commands: `.brightBlue + `${client.commands.size}`.blue + `\n` +
      `Slash Commands: `.brightBlue + `${client.slashCommands.size}`.blue + `\n` +
      `Discord.js: `.brightBlue + `v${Discord.version}`.blue + `\n` +
      `Node.js: `.brightBlue + `${process.version}`.blue + `\n` +
      `Plattform: `.brightBlue + `${process.platform} ${process.arch}`.blue + `\n` +
      `Memory: `.brightBlue + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`.blue
      );
    }catch{ /* */ }
  } catch (e) {
    console.log(e)
  }
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Work for Milanio Development | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */
