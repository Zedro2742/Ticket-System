const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'claim',
    aliases: [],
    usage: '',
    description: 'Claim the Ticket',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    ownerOnly: false,
    toggleOff: false,

    run: async (client, message, args, ee, prefix) => {
        try {

            if (message.member.roles.cache.has(config.ticket_extra.ticket_supporter_role)) {

                Data.findOne({
                    channelID: message.channel.id
                }, async (err, data) => {
                    if (err) throw err;
                    if (!data) return message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`No Data Found For This Ticket!`)
                            .setColor(ee.wrongcolor)
                        ]
                    })

                    if (data.claimed == true) return message.reply({
                        embeds: [new MessageEmbed()
                            .setDescription(`This Ticket is Claimed by <@${data.claimedBy}>.`)
                            .setColor(ee.wrongcolor)
                        ],
                        ephemeral: true
                    })
                    await Data.updateOne({
                        channelID: message.channel.id
                    }, {
                        claimed: true,
                        claimedBy: message.author.id
                    });

                    message.channel.permissionOverwrites.edit(message.author.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                        MANAGE_CHANNELS: true
                    });

                    const ClaimedEmbed = new MessageEmbed()
                        .setDescription(`Ticket is Now Claimed by ${message.member}`)
                        .setColor(ee.color)

                        message.channel.edit({
                        name: `📂-t-${data.channelIndex}-${message.author.username}`
                    })

                    message.channel.send({
                        embeds: [ClaimedEmbed]
                    })

                })

            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}claim\` command!**`)
                        .setColor(ee.wrongcolor)
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}


/**********************************************************
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 *********************************************************/