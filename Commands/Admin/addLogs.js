const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require('../../Schemas/LogChannel.js');
module.exports = {
    name: "logs",
    description: "Setup Logs",
    usage: "/logs [channel] ",
    permission: "MANAGE_GUILD",
    options: [
      {
        name: "set",
        description: "Set moderation log",
        type: "SUB_COMMAND",
        options: [
          {
            name: "channel",
            description: "Set moderation log channel",
            type: "CHANNEL",
            channelType: ["GUILD_TEXT"],
            required: true,
          },
        ],
      },
      {
        name: "check",
        description: "Check moderation log channel",
        type: "SUB_COMMAND",
      },
      {
        name: "reset",
        description: "Reset your log channel",
        type: "SUB_COMMAND",
      },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
     async execute(interaction) {
        try {
          const options = interaction.options;
          const { guild } = interaction;
    
          switch (options.getSubcommand()) {
            case "set":
              {
                const LogsChannel = options.getChannel("channel");
    
                await DB.findOneAndUpdate(
                  { Guild: guild.id },
                  {
                    Channel: LogsChannel.id,
                  },
                  {
                    new: true,
                    upsert: true,
                  }
                ).catch((err) => console.log(err));
    
                const LogsSetup = new MessageEmbed()
                  .setDescription(
                    `<:blurple_check:963650809965457469> | Successfully setup the server logs to ${LogsChannel.name}`
                  )
                  .setColor("#43b581");
                interaction.reply(LogsSetup);
                await guild.channels.cache
                  .get(LogsChannel.id)
                  .send({ embeds: [LogsSetup] })
              }
              break;
            case "check":
              {
                const LogsChannel = await DB.findOne({ Guild: guild.id });
                if (!LogsChannel) {
                  interaction.reply('No logs channel set');
                } else { 
                  const LogsSetup = new MessageEmbed()
                    .setDescription(
                      `<:blurple_check:963650809965457469> | The server logs are set to ${guild.channels.cache.get(LogsChannel.Channel)}`
                    )
                    .setColor("#43b581");
                  interaction.reply({ embeds: [LogsSetup] });
                }
              }
              break;
            case "reset":
              {
                const LogsReset = new MessageEmbed()
                  .setDescription(
                    "<:blurple_check:963650809965457469> | Successfully reset the logging channel"
                  )
                  .setColor("#43b581");
                DB.deleteMany({ Guild: guild.id }, async (err, data) => {
                  if (err) throw err;
                  if (!data)
                    return interaction.reply({
                      content: "<:blurple_cross:963650863828717618> There is no reset to delete",
                    });
                  interaction.reply({ embeds: [LogsReset] });
                });
              }
              return;
          }
        } catch (e) {
          const errorEmbed = new MessageEmbed()
            .setColor("#f04947")
            .setDescription(`Error: ${e}`);
          return interaction.reply({
            embeds: [errorEmbed],
            ephemeral: false,
          });
        }
      },
    }