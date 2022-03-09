const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'lock',
    aliases: [],
    usage: '',
    description: 'Lock the Ticket',
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

                    if (data.locked == true) return message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`This Ticket is Already Locked.`)
                            .setColor(ee.wrongcolor)
                        ]
                    })
                    await Data.updateOne({
                        channelID: message.channel.id
                    }, {
                        locked: true
                    });

                    const Lockuser = message.guild.members.cache.get(data.userID)
                    message.channel.permissionOverwrites.edit(Lockuser, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                    });

                    const lockEmbed = new MessageEmbed()
                        .setDescription(`Ticket Locked by ${message.member}`)
                        .setColor(ee.wrongcolor)

                    const lockEmbed2 = new MessageEmbed()
                        .setDescription(`\`\`\`Support team ticket controls\`\`\``)
                        .setColor(ee.mediancolor)

                    const lockButtons = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('ticket-unlock')
                            .setLabel('Unlock')
                            .setEmoji("🔓")
                            .setStyle('SECONDARY'),
                        )

                    message.channel.send({
                        embeds: [lockEmbed],
                    })

                    message.channel.send({
                        embeds: [lockEmbed2],
                        components: [lockButtons]
                    })

                })

            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}lock\` command!**`)
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
