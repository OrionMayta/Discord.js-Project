const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Schemas/verifyChannel.js");

module.exports = {
  name: "setverify",
  cooldown: 10000,
  usage: "/setverify [options]",
  description: "Setup or reset the verification channel",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "setup",
      description: "Setup the server's verification channel",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Select the channel to make users verify in",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
            name: "role",
            description: "Select the role to give users when they verify",
            type: "ROLE",
            required: true,
        }
      ],
    },
    {
      name: "reset",
      description: "Reset the logs channel",
      type: "SUB_COMMAND",
    },
  ],
  /**
   *
   * @param {GuildMember} member
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      const options = interaction.options;
      const role = options.getRole('role');
      
      const { guild } = interaction;

      switch (options.getSubcommand()) {
        case "setup":
          {
            const verificationChannel = options.getChannel("channel");

            await DB.findOneAndUpdate(
              { GuildID: guild.id },
              {
                LogsChannel: verificationChannel.id,
                RoleID: role.id,
              },
              {
                new: true,
                upsert: true,
              }
            ).catch((err) => console.log(err));

            const LogsSetup = new MessageEmbed()
              .setDescription(
                "<:blurple_check:963650809965457469> | Successfully setup the verfication channel.\n Make sure to tell uses to write `/verify` in the verification channel to verify"
              )
              .setColor("#43b581");

            await guild.channels.cache
              .get(verificationChannel.id)
              .send({ embeds: [LogsSetup] })
              .then((m) => {
                setTimeout(() => {
                  m.delete().catch(() => {});
                }, 1 * 7500);
              });

            await interaction.reply({
              content: "<:blurple_check:963650809965457469> Successfully setup the verification channel",
              ephemeral: true,
            });
          }
          break;
        case "reset":
          {
            const LogsReset = new MessageEmbed()
              .setDescription(
                "<:blurple_check:963650809965457469> | Successfully reset the verification channel"
              )
              .setColor("#43b581");
            DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
              if (err) throw err;
              if (!data)
                return interaction.reply({
                  content: "There is no data to delete",
                });
              interaction.reply({ embeds: [LogsReset] });
            });
          }
          return;
      }
    } catch (e) {
       return; 
    }
  },
};
