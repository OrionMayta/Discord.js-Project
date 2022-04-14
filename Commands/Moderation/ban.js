const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Schemas/LogChannel');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the guild',
    permission: 'BAN_MEMBERS',
    options: [
        {
            name: 'target',
            description: 'Deletes messages from a specific user',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     * @param {Message} message
     */
    async execute(interaction, client) {
        try {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason');
            const failedEmbed = new MessageEmbed()
            
            .setTitle('<:blurple_cross:963650863828717618> Error')
            .setDescription('> You can not ban this user.')
            .setColor('RED');

            const logChannelEmbed = new MessageEmbed()
            .setTitle(`Moderation Log`)
            .setColor('RED')
            .addField('Action', 'Ban')
            .addField(`Moderator`, `<@${interaction.member.id}>`)
            .addField('User', `<@${target.id}>`)
            .addField('Reason', reason)

            if(!target.bannable || target.id === client.user.id || target.id === interaction.member.id) {
                interaction.reply({ embeds: [failedEmbed], ephemeral: true});
            }

            if(interaction.member.roles.highest.position <= target.roles.highest.position) 
            return interaction.reply({ embeds: [failedEmbed], ephemeral: true});
            
            const banEmbed = new MessageEmbed()
            .setTitle('<:blurple_check:963650809965457469> Success!')
            .setColor('WHITE')
            .addField('Action', 'Ban')
            .addField('User', `<@${target.id}>`)
            .addField('Moderator', `<@${interaction.member.id}>`)
            .addField('Reason', reason)
            .setTimestamp()

            await target.send(`You have been banned from ${interaction.guild.name} for the following reason: \n${reason}`).catch(err => {});
            await target.ban({ reason });

            interaction.reply({ embeds: [banEmbed], ephemeral: true});

            const LogsChannel = await DB.findOne({ Guild: interaction.guild.id });
            if(LogsChannel) {
            await interaction.guild.channels.cache.get(LogsChannel.Channel).send({ embeds: [logChannelEmbed] })
            } else {
            return
            }
        } catch(err) {
            return;
        }
    }
}