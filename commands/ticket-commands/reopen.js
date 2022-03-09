const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'reopen',
    aliases: ["re-open"],
    usage: '',
    description: 'Re-Open the Ticket',
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

                    if (data.closed == false) return message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`This Ticket is Not Closed.`)
                            .setColor(ee.wrongcolor)
                        ]
                    })
                    await Data.updateOne({
                        channelID: message.channel.id
                    }, {
                        closed: false
                    });

                    const Reopenuser = message.guild.members.cache.get(data.userID)
                    message.channel.permissionOverwrites.edit(Reopenuser, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                    });

                    const reopenEmbed = new MessageEmbed()
                        .setDescription(`Ticket Re-opened by ${message.member}`)
                        .setColor(ee.wrongcolor)

                    message.channel.send({
                        embeds: [reopenEmbed]
                    })

                })

            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}reopen\` command!**`)
                        .setColor(ee.wrongcolor)
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}