const {
    Schema,
    model
} = require('mongoose');

const Ticket = new Schema({
    guildID: String,
    userID: String,
    channelID: String,
    parentID: String,
    channelIndex: Number,
    closed: Boolean,
    locked: Boolean,
    claimed: Boolean,
    claimedBy: String
})

module.exports = model("ticket-users", Ticket);

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */