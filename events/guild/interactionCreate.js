const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const {
	MessageEmbed,
	Collection
} = require("discord.js");
const Discord = require("discord.js");
const {
	onCoolDown,
} = require(`../../handlers/functions`);

module.exports = async (client, interaction) => {
	try {

		let prefix = config.env.PREFIX || process.env.PREFIX;

    if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
    if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) 
    return interaction.reply({content: `❌ I am missing the Permission to \`USE_EXTERNAL_EMOJIS\`` })
    if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) 
    return interaction.reply({content: `${client.allEmojis.x} I am missing the Permission to \`EMBED_LINKS\`` })
    if(!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS)) 
    return interaction.reply({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setTitle(`${client.allEmojis.x} I am missing the Permission to \`ADD_REACTIONS\``)]})

		if (interaction.isCommand()) {
			const command = client.slashCommands.get(interaction.commandName);

      if (command) {
        // interaction.reply({
				// content: "An error has occured"
        // });

			const args = [];

			for (let option of interaction.options.data) {
				if (option.type === "SUB_COMMAND") {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					})
				} else if (option.value) args.push(option.value);
			}

				if (command.toggleOff) {
					return await interaction.reply({
						embeds: [new MessageEmbed()
							.setTitle(`${client.allEmojis.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
							.setColor(ee.wrongcolor)
						]
					}).catch((e) => {
						console.log(e)
					});
				}
				if (!interaction.member.permissions.has(command.userPermissions || [])) return await interaction.reply({
					embeds: [new MessageEmbed()
						.setDescription(`${client.allEmojis.x} **You do not have \`${command.userPermissions.join(", ")}\` permission to use \`${command.name}\` command!**`)
						.setColor(ee.wrongcolor)
					],
					ephemeral: true
				}).catch((e) => {
					console.log(e)
				});
				if (!interaction.guild.me.permissions.has(command.botPermissions || [])) return await interaction.reply({
					embeds: [new MessageEmbed()
						.setDescription(`${client.allEmojis.x} **I do not have \`${command.botPermissions.join(", ")}\` permission to use \`${command.name}\` command!**`)
						.setColor(ee.wrongcolor)
					],
					ephemeral: true
				}).catch((e) => {
					console.log(e)
				});
				if (onCoolDown(interaction, command)) {
					return await interaction.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setDescription(`${client.allEmojis.x} **Please wait \`${onCoolDown(interaction, command).toFixed(1)} seconds\` Before using the \`${command.name}\` command again!.**`)
						],
            ephemeral: true
					});
				}
				command.run(client, interaction, args, ee, prefix);
			} else {
				return;
			}	
		}

		if (interaction.isContextMenu()) {
			const command = client.Commands.get(interaction.commandName);
			if (command) command.run(client, interaction);
		}

	} catch (err) {
		console.log(err)
	}
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Work for Milanio Development | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */
