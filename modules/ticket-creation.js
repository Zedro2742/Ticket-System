const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const Discord = require("discord.js");
const Data = require(`${process.cwd()}/models/ticket-user`);
const Data2 = require(`${process.cwd()}/models/ticket-guild`);

module.exports = async (client) => {
    const description = {
        name: "Ticket System",
    }
    client.logger(`〢 Module: Loaded ${description.name}`.bold.green);

    client.on("interactionCreate", async (interaction) => {
        try {

            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) return;
            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) return;

            if (!interaction.isButton()) return;
            if (!["general-help", "bug-report", "order-bot", "staff-apply", "partner-apply", "source-code"].includes(interaction.customId)) return;

            const data2 = await Data2.findOne({
                guildID: interaction.guildId
            })
            if (!data2) {
                new Data2({
                    guildID: interaction.guild.id,
                    index: 0
                }).save()
            }
            let a = data2.index;
            let b = ++a;

            switch (interaction.customId) {
                case "general-help":
                    await interaction.guild.channels.create(`⏰-t-${data2.index + 1}-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: config.ticket_category.generalHelp,
                        permissionOverwrites: [{
                            id: interaction.member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: config.ticket_extra.ticket_supporter_role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: interaction.guild.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }],
                    }).then(async (channel) => {
                        await Data.create({
                            guildID: interaction.guild.id,
                            userID: interaction.user.id,
                            parentID: config.ticket_category.generalHelp,
                            channelID: channel.id,
                            channelIndex: b,
                            closed: false,
                            locked: false,
                            claimed: false
                        })

                        await data2.updateOne({
                            index: b
                        });

                        const GeneralHelpEmbed = new MessageEmbed()
                            .setTitle('__**Ticket Opened!**__')
                            .setDescription(`Hello <@${interaction.user.id}>,\nThe staff will be here as soon as possible mean while tell us about your issue!`)
                            .setColor(ee.color)
                            .setTimestamp()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    dynamic: true
                                })
                            });

                        const closeTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('ticket-claim')
                                .setLabel('Claim')
                                .setEmoji("903988142347014144")
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('ticket-lock')
                                .setLabel('Lock')
                                .setEmoji("🔒")
                                .setStyle('SECONDARY'),
                                new MessageButton()
                                .setCustomId('ticket-close')
                                .setLabel('Close')
                                .setEmoji("🔐")
                                .setStyle('DANGER'),
                            );
                        channel.send({
                            // content: `Welcome <@${interaction.user.id}>, Here is Your Ticket`,
                            embeds: [GeneralHelpEmbed],
                            components: [closeTicket]
                        }).then((msg) => msg.pin())

                        interaction.reply({
                            content: `Ticket has been Created: ${channel}`,
                            ephemeral: true
                        })
                    })
                    break;
                case "bug-report":
                    await interaction.guild.channels.create(`⏰-t-${data2.index + 1}-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: config.ticket_category.bugReport,
                        permissionOverwrites: [{
                            id: interaction.member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: config.ticket_extra.ticket_supporter_role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: interaction.guild.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }],
                    }).then(async (channel) => {
                        await Data.create({
                            guildID: interaction.guild.id,
                            userID: interaction.user.id,
                            parentID: config.ticket_category.bugReport,
                            channelID: channel.id,
                            channelIndex: b,
                            closed: false,
                            locked: false,
                            claimed: false
                        })

                        await data2.updateOne({
                            index: b
                        });

                        const BugReportEmbed = new MessageEmbed()
                            .setTitle('__**Ticket Opened!**__')
                            .setDescription(`Hello <@${interaction.user.id}>,\nThe staff will be here as soon as possible mean while tell us about the bug you faced from the bot!`)
                            .setColor(ee.color)
                            .setTimestamp()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    dynamic: true
                                })
                            });

                        const closeTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('ticket-claim')
                                .setLabel('Claim')
                                .setEmoji("903988142347014144")
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('ticket-lock')
                                .setLabel('Lock')
                                .setEmoji("🔒")
                                .setStyle('SECONDARY'),
                                new MessageButton()
                                .setCustomId('ticket-close')
                                .setLabel('Close')
                                .setEmoji("🔐")
                                .setStyle('DANGER'),
                            );
                        channel.send({
                            // content: `Welcome <@${interaction.user.id}>`,
                            embeds: [BugReportEmbed],
                            components: [closeTicket]
                        }).then((msg) => msg.pin())

                        interaction.reply({
                            content: `Ticket has been Created: ${channel}`,
                            ephemeral: true
                        })
                    })
                    break;
                case "order-bot":
                    await interaction.guild.channels.create(`⏰-t-${data2.index + 1}-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: config.ticket_category.orderBot,
                        permissionOverwrites: [{
                            id: interaction.member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: config.ticket_extra.ticket_supporter_role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: interaction.guild.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }],
                    }).then(async (channel) => {
                        await Data.create({
                            guildID: interaction.guild.id,
                            userID: interaction.user.id,
                            parentID: config.ticket_category.orderBot,
                            channelID: channel.id,
                            channelIndex: b,
                            closed: false,
                            locked: false,
                            claimed: false
                        })

                        await data2.updateOne({
                            index: b
                        });

                        const OrderedEmbed = new MessageEmbed()
                            .setTitle('__**Ticket Opened!**__')
                            .setDescription(`Hello <@${interaction.user.id}>,\nThe staff will be here as soon as possible mean while you can fill the informations listed Below!`)
                            .setColor(ee.color)
                            .setTimestamp()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    dynamic: true
                                })
                            });

                        const OrderedEmbed2 = new MessageEmbed()
                            .setTitle(`✅ __**GIVE INFORMATIONS LISTED BELOW**__ ✅`)
                            .setDescription(`> ➡️ **1.  Which Bot You Want?** *(Required)*
        > 
        > ➡️ **2.  What should be the Bot Name?** *(Required)*
        > 
        > ➡️ **3.  What should be the PREFIX?** *(Required)*
        > 
        > ➡️ **4.  What should be the AVATAR?** *(Required)*
        > 
        > ➡️ **5.  What should be the EMBED COLOR?** *(Required)*
        > 
        > ➡️ **6.  What should be the STATUS?** *(Required)*
        > 
        > ➡️ **7.  What should be the STATUS TYPE?** *(Required)*
        > ( \`PLAYING\` / \`WATCHING\` / \`LISTENING\` / \`STREAMING\` / \`COMPETING\` )
        > 
        > ➡️ **8.  Do you want to add Gif in Help Menu Send Us?** *(Optional)*
        > 
        > ➡️ **9.  If you want to add Support Server link givr ur server link? ** *(Optional)*`)
                            .setColor(ee.color)

                        const closeTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('ticket-claim')
                                .setLabel('Claim')
                                .setEmoji("903988142347014144")
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('ticket-lock')
                                .setLabel('Lock')
                                .setEmoji("🔒")
                                .setStyle('SECONDARY'),
                                new MessageButton()
                                .setCustomId('ticket-close')
                                .setLabel('Close')
                                .setEmoji("🔐")
                                .setStyle('DANGER'),
                            );
                        channel.send({
                            // content: `Welcome <@${interaction.user.id}>`,
                            embeds: [OrderedEmbed, OrderedEmbed2],
                            components: [closeTicket]
                        }).then((msg) => msg.pin())

                        interaction.reply({
                            content: `Ticket has been Created: ${channel}`,
                            ephemeral: true
                        })
                    })
                    break;
                case "staff-apply":
                    await interaction.guild.channels.create(`⏰-t-${data2.index + 1}-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: config.ticket_category.staffApply,
                        permissionOverwrites: [{
                            id: interaction.member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: config.ticket_extra.ticket_supporter_role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: interaction.guild.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }],
                    }).then(async (channel) => {
                        await Data.create({
                            guildID: interaction.guild.id,
                            userID: interaction.user.id,
                            parentID: config.ticket_category.staffApply,
                            channelID: channel.id,
                            channelIndex: b,
                            closed: false,
                            locked: false,
                            claimed: false
                        })

                        await data2.updateOne({
                            index: b
                        });

                        const staffApplyEmbed = new MessageEmbed()
                            .setTitle('__**Ticket Opened!**__')
                            .setDescription(`Hello <@${interaction.user.id}>,\nThe staff will be here as soon as possible mean while tell us about your issue!`)
                            .setColor(ee.color)
                            .setTimestamp()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    dynamic: true
                                })
                            });

                        const staffApplyFormEmbed = new MessageEmbed()
                            .setTitle(`📜 Staff Apply Form 📜`)
                            .setColor(ee.color)
                            .setDescription(`📁 Thanks for opening an Application | Tell us something about you!
Hey ${interaction.user}! Thanks for opening an Application
- Please tell us some Informations!

Please write a TEXT, not just answer the Qeustions!!
                            
Questions you need to answer:
                            
1) How old are you and what is your name?
2) Where are you from / What is > your Timezone?
3) How often are you online + how much time can you spend on this DC?
4) Do you have experience, if so which and how much?
5) How do you expect that the work will be for you?
6) Be creative and show other information ...
                            
                            
NOTE:        
Writing a complete Text, like a  is helpful to get accepted!`)


                        const closeTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('ticket-claim')
                                .setLabel('Claim')
                                .setEmoji("903988142347014144")
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('ticket-lock')
                                .setLabel('Lock')
                                .setEmoji("🔒")
                                .setStyle('SECONDARY'),
                                new MessageButton()
                                .setCustomId('ticket-close')
                                .setLabel('Close')
                                .setEmoji("🔐")
                                .setStyle('DANGER'),
                            );
                        channel.send({
                            // content: `Welcome <@${interaction.user.id}>`,
                            embeds: [staffApplyEmbed, staffApplyFormEmbed],
                            components: [closeTicket]
                        }).then((msg) => msg.pin())

                        interaction.reply({
                            content: `Ticket has been Created: ${channel}`,
                            ephemeral: true
                        })
                    })
                    break;
                case "partner-apply":
                    await interaction.guild.channels.create(`⏰-t-${data2.index + 1}-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: config.ticket_category.partnerApply,
                        permissionOverwrites: [{
                            id: interaction.member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: config.ticket_extra.ticket_supporter_role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: interaction.guild.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }],
                    }).then(async (channel) => {
                        await Data.create({
                            guildID: interaction.guild.id,
                            userID: interaction.user.id,
                            parentID: config.ticket_category.partnerApply,
                            channelID: channel.id,
                            channelIndex: b,
                            closed: false,
                            locked: false,
                            claimed: false
                        })

                        await data2.updateOne({
                            index: b
                        });

                        const embed = new MessageEmbed()
                            .setTitle('__**Ticket Opened!**__')
                            .setDescription(`Hello <@${interaction.user.id}>,\nThe staff will be here as soon as possible mean while tell us about your issue!`)
                            .setColor(ee.color)
                            .setTimestamp()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    dynamic: true
                                })
                            });

                        const parnerApplyEmbed2 = new MessageEmbed()
                            .setTitle(`✅ __**PARTNERSHIP APPLY**__ ✅`)
                            .setDescription(`__**These Are Requirements To Be An Partner Of Us**__
> Need Atleast 100+ Members
> Need An Promotion Channel For Us
> Need An Partner Roles For Us
                            
__**This Is What We Offer**__
> Access To Promotion Channel
> Exclusive Partner Role
> Partners Only Giveaways (Coming Soon)
> Partners Only Chat & Vc (Coming Soon)`)
                            .setColor(ee.color)

                        const closeTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('ticket-claim')
                                .setLabel('Claim')
                                .setEmoji("903988142347014144")
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('ticket-lock')
                                .setLabel('Lock')
                                .setEmoji("🔒")
                                .setStyle('SECONDARY'),
                                new MessageButton()
                                .setCustomId('ticket-close')
                                .setLabel('Close')
                                .setEmoji("🔐")
                                .setStyle('DANGER'),
                            );
                        channel.send({
                            // content: `Welcome <@${interaction.user.id}>`,
                            embeds: [embed, parnerApplyEmbed2],
                            components: [closeTicket]
                        }).then((msg) => msg.pin())

                        interaction.reply({
                            content: `Ticket has been Created: ${channel}`,
                            ephemeral: true
                        })
                    })
                    break;
                case "source-code":
                    await interaction.guild.channels.create(`⏰-t-${data2.index + 1}-${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        parent: config.ticket_category.sourceCode,
                        permissionOverwrites: [{
                            id: interaction.member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: config.ticket_extra.ticket_supporter_role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "READ_MESSAGE_HISTORY"],
                        }, {
                            id: interaction.guild.id,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                        }],
                    }).then(async (channel) => {
                        await Data.create({
                            guildID: interaction.guild.id,
                            userID: interaction.user.id,
                            parentID: config.ticket_category.sourceCode,
                            channelID: channel.id,
                            channelIndex: b,
                            closed: false,
                            locked: false,
                            claimed: false
                        })

                        await data2.updateOne({
                            index: b
                        });

                        const embed = new MessageEmbed()
                            .setTitle('__**Ticket Opened!**__')
                            .setDescription(`Hello <@${interaction.user.id}>,\nThe staff will be here as soon as possible mean while tell us which bot source code you need!`)
                            .setColor(ee.color)
                            .setTimestamp()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    dynamic: true
                                })
                            });

                        const closeTicket = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('ticket-claim')
                                .setLabel('Claim')
                                .setEmoji("903988142347014144")
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('ticket-lock')
                                .setLabel('Lock')
                                .setEmoji("🔒")
                                .setStyle('SECONDARY'),
                                new MessageButton()
                                .setCustomId('ticket-close')
                                .setLabel('Close')
                                .setEmoji("🔐")
                                .setStyle('DANGER'),
                            );
                        channel.send({
                            // content: `Welcome <@${interaction.user.id}>`,
                            embeds: [embed],
                            components: [closeTicket]
                        }).then((msg) => msg.pin())

                        interaction.reply({
                            content: `Ticket has been Created: ${channel}`,
                            ephemeral: true
                        })
                    })
                    break;
            }
        } catch (err) {
            console.log(err)
        }
    })

    require("./ticket-events/ticket-options")(client);

}


/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */