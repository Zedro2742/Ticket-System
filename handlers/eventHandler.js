const fs = require("fs");
const allevents = [];

module.exports = async (client) => {
  try {
    let amount = 0;
    const load_dir = (dir) => {
      const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
      for (const file of event_files) {
        try {
          const event = require(`../events/${dir}/${file}`)
          let eventName = file.split(".")[0];
          allevents.push(eventName);
          client.on(eventName, event.bind(null, client));
          amount++;
        } catch (e) {
          console.log(e)
        }
      }
    }
    await ["client", "guild"].forEach(e => load_dir(e));
    client.logger(`${amount} Events Loaded`.brightGreen);
    client.logger(`Logging into the BOT...`.bold.yellow)
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Work for Milanio Development | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */