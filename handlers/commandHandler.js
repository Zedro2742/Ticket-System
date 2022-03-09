const {
  readdirSync
} = require("fs");

module.exports = async (client) => {
  try {
    let amount = 0;
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../commands/${dir}/${file}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          amount++;
        } else {
          try {
            client.logger(`Command Not Loaded: ${file}`.brightRed)
          } catch {
            /* */ }
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
    client.logger(`${amount} Commands Loaded`.brightGreen);
  } catch (e) {
    console.log(String(e.stack).bgRed)
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