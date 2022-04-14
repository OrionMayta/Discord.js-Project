const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Schemas/verifyChannel.js");

module.exports = {
  name: "verify",
  cooldown: 10000,
  usage: "/verify",
  description: "Verify yourself in the server.",
  options: [],
  /**
   *
   * @param {GuildMember} member
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
        DB.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (!data)
              return interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setDescription("<:Cross:960249619093258291> | This server has not setup verification yet.")
                    .setColor("BLUE"),
                ],
                ephemeral: true,
              });
            if (interaction.channel.id !== data.LogsChannel) { 
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription("<:blurple_cross:963650863828717618> | You can only use this command in the verification channel.")
                        .setColor("RED"),
                    ],
                    ephemeral: true,
                })
            }
            if (!interaction.member.roles.cache.has(data.RoleID)) {
                interaction.member.roles.add(data.RoleID)
                interaction.reply({ embeds: [ new MessageEmbed().setDescription("<:blurple_check:963650809965457469> | You have been verified!").setColor("BLUE")], ephemeral: true });
            } else return interaction.reply({ embeds: [new MessageEmbed().setDescription("<:blurple_cross:963650863828717618> | You are already verified!").setColor("RED")], ephemeral: true })
        })
    } catch(err) {
        return;
    }
  }
};