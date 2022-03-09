const {
    Schema,
    model
} = require('mongoose');

const Tickets = new Schema({
    guildID: String,
    index: Number
})

module.exports = model("ticket-guilds", Tickets);

/**********************************************************
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 *********************************************************/
