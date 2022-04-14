const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const DB = require("../../Schemas/AntiScamDB.js");

module.exports = {
  name: "anti-scam",
  description: "Setup Anti-Scam",
  usage: "/anti-scam",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "setup",
      description: "Anti-Scam Settings",
      type: "SUB_COMMAND",
      options: [
        {
          name: "logs",
          description: "Logs a scam message",
          type: "CHANNEL",
          channelType: ["GUILD_TEXT"],
          required: true,
        },
      ],
    },
    {
      name: "reset",
      description: "Reset your Anti-Scam system",
      type: "SUB_COMMAND",
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, options } = interaction;
    const SubCommand = options.getSubcommand();

    switch (SubCommand) {
      case "setup":
        const log = options.getChannel("logs");
        DB.findOne({ Guild: guild.id }, async (err, data) => {
          if (data) data.delete();
          new DB({
            Guild: interaction.guild.id,
            Channel: log.id,
          }).save();
          interaction.reply({
            content: "Anti-Scam system has been setup.",
            ephemeral: true
          });
        });
        break;``
      case "reset":
        DB.findOne({ Guild: guild.id }, async (err, data) => {
          if (!data)
            return interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription("Anti-Scam system is not setup.")
                  .setColor("BLUE"),
              ],
              ephemeral: true,
            });

          data.delete();
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("BLUE")
                .setDescription("Your Anti-Scam system has been reset."),
            ],
            ephemeral: true,
          });
        });
        break;
    }
  },
};
