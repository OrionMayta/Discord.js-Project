const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Schemas/LogChannel.js')   

module.exports = { 
    name: 'unmute',
    description: 'Unmute a user',
    permission: 'MANAGE_MESSAGES',
    options: [
        {
            name: 'target',
            description: 'The user to mute',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the mute',
            type: 'STRING',
            required: true
        }
    ],
    async execute(interaction, client) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');
        const embed = new MessageEmbed()
        .setTitle('<:blurple_check:963650809965457469> Success!')
        .setColor('WHITE')
        .addField('Action', 'unmute')
        .addField('Moderator', `<@${interaction.member.id}>`)
        .addField('User', `<@${target.id}>`)
        .addField('Reason', reason)
        .setTimestamp()

        const logChannelEmbed = new MessageEmbed()
        .setTitle(`Moderation Log`)
        .setColor('RED')
        .addField('Action', 'unmute')
        .addField(`Moderator`, `<@${interaction.member.id}>`)
        .addField('User', `<@${target.id}>`)
        .addField('Reason', reason)
        .setTimestamp()
        try {
            target.timeout(null);
        } catch(err) {
            interaction.reply('That user is not muted');
        }
        interaction.reply({ embeds: [embed], ephemeral: false });

        const LogsChannel = await DB.findOne({ Guild: interaction.guild.id });
        if(LogsChannel) {
        await interaction.guild.channels.cache.get(LogsChannel.Channel).send({ embeds: [logChannelEmbed] })
        } else {
            return
         }
    }
}