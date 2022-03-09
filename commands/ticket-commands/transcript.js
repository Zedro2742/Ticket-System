const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message
} = require("discord.js");
const Data = require("../../models/ticket-user");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: 'transcript',
    aliases: [],
    usage: '',
    description: 'Saves the transcript of the Ticket',
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

                    const TranscriptUser = message.guild.members.cache.get(data.userID)

                    const channel = message.channel;
                    const attachment = await discordTranscripts.createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `ticket-${data.channelIndex}.html`
                    });

                    const TranscriptClimedByUser = message.guild.members.cache.get(data.claimedBy)

                    if (TranscriptClimedByUser) {
                        const transcriptSendEmbed = new MessageEmbed()
                            .setAuthor(TranscriptUser.user.tag, TranscriptUser.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTitle(`📄 Ticket Transcript`)
                            .setColor(ee.color)
                            .setFooter(`${message.guild.name}`, message.guild.iconURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                            .setDescription(`Transcript of **${TranscriptUser.user.tag}** (${TranscriptUser.id})
Claimed By: **${TranscriptClimedByUser.user.tag}** (${TranscriptClimedByUser.id})`)

                        const transcriptChannel = message.guild.channels.cache.get(config.ticket.extra.transcript);
                        transcriptChannel.send({
                            embeds: [transcriptSendEmbed],
                            files: [attachment]
                        });
                    } else {
                        const transcriptSendEmbed = new MessageEmbed()
                            .setAuthor(TranscriptUser.user.tag, TranscriptUser.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTitle(`📄 Ticket Transcript`)
                            .setColor(ee.color)
                            .setFooter(`${message.guild.name}`, message.guild.iconURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                            .setDescription(`Transcript of **${TranscriptUser.user.tag}** (${TranscriptUser.id})`)

                        const transcriptChannel = await message.guild.channels.cache.get(config.ticket.extra.transcript);
                        transcriptChannel.send({
                            embeds: [transcriptSendEmbed],
                            files: [attachment]
                        });
                    }

                    const transcriptDMSendEmbed = new MessageEmbed()
                        // .setAuthor(message.member.tag, message.user.displayAvatarURL({
                        //     dynamic: true
                        // }))
                        .setTitle(`📄 Ticket Transcript from ${message.guild.name}`)
                        .setColor(ee.color)
                        .setDescription(`Transcript of **${TranscriptUser.user.tag}** (${TranscriptUser.id})`)

                    if (TranscriptUser) {
                        TranscriptUser.send({
                            embeds: [transcriptDMSendEmbed],
                            files: [attachment]
                        }).catch(err => console.log("unable to dm transcript"))
                    }

                    const transcriptEmbed = new MessageEmbed()
                        .setTitle(`📄 Ticket Transcript`)
                        .setColor(ee.color)
                        .setDescription(`Transcript has been saved in <#${config.ticket.extra.transcript}>.`)

                    message.channel.send({
                        embeds: [transcriptEmbed]
                    });

                })

            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}transcript\` command!**`)
                        .setColor(ee.wrongcolor)
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}