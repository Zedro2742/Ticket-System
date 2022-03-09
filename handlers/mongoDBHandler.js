const config = require('../botconfig/config.json');
const mongoose = require('mongoose');
const fs = require('fs');
const alldbevents = [];

module.exports = async (client) => {
  try {
    let amount = 0;
    const mongoEventFiles = fs.readdirSync(`./events/mongoDB`).filter((file) => file.endsWith(".js"));
    for (const file of mongoEventFiles) {
      try {
        const event = require(`../events/mongoDB/${file}`)
        let eventName = file.split(".")[0];
        alldbevents.push(eventName);
        mongoose.connection.on(eventName, event.bind(null, client));
        amount++;
      } catch (e) {
        console.log(e)
      }
    }
    client.logger(`${amount} MongoDB Events Loaded`.brightGreen);
    client.logger(`Connecting to MongoDB`.bold.yellow);
    
    try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(config.env.MongoDB_TOKEN || process.env.MongoDB_TOKEN, {
      //useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    } catch (e) {
    console.log(e)
  }
  } catch (e) {
    console.log(e)
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
