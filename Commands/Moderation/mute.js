const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Schemas/LogChannel.js')   
const ms = require('ms');

module.exports = { 
    name: 'mute',
    description: 'Mute a user',
    permission: 'MANAGE_MESSAGES',
    options: [
        {
            name: 'target',
            description: 'The user to mute',
            type: 'USER',
            required: true
        },
        {
            name: 'time',
            description: 'The time to mute the user for',
            type: 'STRING',
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
        const time = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');
        const timeInMs= ms(time);

        const embed = new MessageEmbed()
        .setTitle('<:Check:960249619093258291> Success!')
        .setColor('WHITE')
        .addField('Action', 'mute')
        .addField('Moderator', `<@${interaction.member.id}>`)
        .addField('User', `<@${target.id}>`)
        .addField('Time', time)
        .addField('Reason', reason)
        .setTimestamp()

        const logChannelEmbed = new MessageEmbed()
        .setTitle(`Moderation Log`)
        .setColor('RED')
        .addField('Action', 'mute')
        .addField(`Moderator`, `<@${interaction.member.id}>`)
        .addField('User', `<@${target.id}>`)
        .addField('Time', time)
        .addField('Reason', reason)
        .setTimestamp()

        
        if(!timeInMs) return interaction.reply('<:blurple_cross:963650863828717618> Invalid time format');
        target.timeout(timeInMs, reason);
        interaction.reply({ embeds: [embed], ephemeral: false });

        const LogsChannel = await DB.findOne({ Guild: interaction.guild.id });
        if(LogsChannel) {
        await interaction.guild.channels.cache.get(LogsChannel.Channel).send({ embeds: [logChannelEmbed] })
        } else {
            return
         }
    }
}