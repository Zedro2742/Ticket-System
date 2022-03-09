const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'close',
    aliases: [],
    usage: '',
    description: 'Close the Ticket',
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

                    if (data.closed == true) return message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`This Ticket is Already Closed.`)
                            .setColor(ee.wrongcolor)
                        ]
                    })
                    await Data.updateOne({
                        channelID: message.channel.id
                    }, {
                        closed: true
                    });

                    const CloseEmbed = new MessageEmbed()
                        .setDescription(`🔐 | Ticket Closed by ${message.member}`)
                        .setColor(ee.wrongcolor)

                    const CloseEmbed2 = new MessageEmbed()
                        .setDescription(`\`\`\`Support team ticket controls\`\`\``)
                        .setColor(ee.mediancolor)

                    const CloseButtons = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('ticket-transcript')
                            .setLabel('Transcript')
                            .setEmoji("📝")
                            .setStyle('SUCCESS'),
                            new MessageButton()
                            .setCustomId('ticket-reopen')
                            .setLabel('Re-Open')
                            .setEmoji("🔓")
                            .setStyle('SECONDARY'),
                            new MessageButton()
                            .setCustomId('ticket-delete')
                            .setEmoji("🗑️")
                            .setLabel('Delete')
                            .setStyle('DANGER'),
                        )

                    const Closeuser = message.guild.members.cache.get(data.userID)
                    message.channel.permissionOverwrites.edit(Closeuser, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false,
                    });
                    message.reply({
                        embeds: [CloseEmbed, CloseEmbed2],
                        components: [CloseButtons]
                    })

                })

            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}close\` command!**`)
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
