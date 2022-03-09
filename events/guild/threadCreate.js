module.exports = async (client, thread) => {
  try {
    if (thread.joinable && !thread.joined) {
      await thread.join();
    }
  } catch (e) {
    console.log(String(e).grey)
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