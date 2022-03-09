const config = require('../../botconfig/config.json');
const {
  MessageEmbed
} = require('discord.js');
const glob = require('glob');

module.exports = {
  name: 'reload-commands',
  aliases: ['r-cmd'],
  usage: '',
  description: 'Reloads a command',
  cooldown: 0,
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,

  run: async (client, message, args, ee) => {
    try {
      client.commands.sweep(() => true);
      glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
        if (err) return console.log(err);
        filePaths.forEach((file) => {
          delete require.cache[require.resolve(file)];

          const command = require(file);

          if (command.name) {
            client.commands.set(command.name, command);
          }

          if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach((alias) => {
              client.aliases.set(alias, command.name)
            });
          }
        });
      });
      message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`${client.allEmojis.y} Successfully Reloaded Commands`)]});
    } catch (e) {
      console.log(e)
    }
  },
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