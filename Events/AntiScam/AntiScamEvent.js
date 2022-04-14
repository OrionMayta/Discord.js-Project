const { Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const DB = require("../../Schemas/AntiScamDB");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    try {
      DB.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        if(err) return;
        const array = require(`../../Validation/ScamLink.json`);
        if (array.some((word) => message.content.toLowerCase().includes(word))) {
          message.delete();
          const Ex = new MessageEmbed()
            .setTitle("Scam detected")
            .setColor('RED')
            .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Please don't send any scam messages. Thank you.`)
            .addField(
              "User:",
              `\`\`\`${message.author.tag} (${message.author.id})\`\`\``
            )
            .addField("Message Content:", `\`\`\`${message.content}\`\`\``)
            .setTimestamp();
          
          await message.guild.channels.cache.get(data.Channel).send({embeds: [Ex]});
        }
      })
  } catch (err) {
    return;
  }
  },
};
