const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');

module.exports = {
    name: "ticket-setup",
    aliases: [],
    description: "",
    cooldown: 0,
    userPermissions: ["ADMINISTARTOR"],
    botPermissions: [],

    run: async (client, message, args, ee) => {
        try {
            const generalHelp = new MessageButton().setCustomId('general-help').setEmoji("❓").setLabel('General Help!').setStyle('SECONDARY');
            const bugReport = new MessageButton().setCustomId('bug-report').setEmoji("💢").setLabel('Bug Report!').setStyle('SECONDARY');
            const orderBot = new MessageButton().setCustomId('order-bot').setEmoji("🤖").setLabel('Order Bot!').setStyle('SECONDARY');
            const staffApply = new MessageButton().setCustomId('staff-apply').setEmoji("📝").setLabel('Staff Apply!').setStyle('SECONDARY');
            const partnerApply = new MessageButton().setCustomId('partner-apply').setEmoji("🤝").setLabel('Partner Apply!').setStyle('SECONDARY');
            const sourceCode = new MessageButton().setCustomId('source-code').setEmoji("📑").setLabel('Source Code!').setStyle('SECONDARY');


            const embed = new MessageEmbed()
                .setTitle(`Create a Ticket / Application / Partnership`)
                .setDescription("If you need help, want to apply or if you are having Questions, then please Open a Ticket!")
                .setFooter(message.guild.name + " Best Free And Paid Bots!", message.guild.iconURL({
                    dynamic: true
                }))
                .setColor(ee.color)

            const Buttons = new MessageActionRow()
                .addComponents([generalHelp, bugReport, orderBot])

            const Buttons2 = new MessageActionRow()
                .addComponents([staffApply, partnerApply, sourceCode])

            const buttonsRow = [Buttons, Buttons2]

            message.channel.send({
                embeds: [embed],
                components: buttonsRow
            });
        } catch (e) {
            console.log(e)
        }
    }
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */