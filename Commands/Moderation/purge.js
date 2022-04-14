const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Schemas/LogChannel.js');

module.exports = {
    name: 'purge',
    description: 'Deletes a specified amount of messages',
    permission: 'MANAGE_MESSAGES',
    options: [
        {
            name: 'amount',
            description: 'The amount of messages to delete',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'target',
            description: 'Deletes messages from a specific user',
            type: 'USER',
            required: false
        },
        {
            name: 'reason',
            description: 'The reason for the purge',
            type: 'STRING',
            required: false
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
            const { channel, options } = interaction;
            const Amount = options.getNumber('amount');
            const Target = options.getMember('target');
            const Reason = options.getString('reason');
            const Messages = await channel.messages.fetch();
            if (Amount >= 100 || Amount <= 1) {
                const failedEmbed = new MessageEmbed()
                .setTitle('<:blurple_cross:963650863828717618> Error')
                .setDescription('> You can not delete more than 100 messages at a time and can not have less than 1 message purged.')
                .setColor('RED');
                interaction.reply({ embeds: [failedEmbed], ephemeral: true});
            }
            const Response = new MessageEmbed()
            .setColor('WHITE')
            .setTitle('<:blurple_check:963650809965457469> Success!')

            const logChanelEmbed = new MessageEmbed()
            .setTitle(`Moderation Log`)
            .setColor('RED')
            .addField('Action', 'Purge')
            .addField('Channel', `<#${interaction.channel.id}>`)
            if (Target) {
                let i = 0
                const filtered =[];
                (await Messages).filter((m) => {
                    if(m.author.id === Target.id && Amount > i) {
                        filtered.push(m);
                        i++;
                    }
                }) 

                await channel.bulkDelete(filtered, true).then(messages => {
                    Response.addField('User Pured', `${Target}`)
                    Response.addField(`Moderator`, `${interaction.member}`)
                    Response.addField(`Purged Messages`, `> ${messages.size}`);
                    
                    logChanelEmbed.addField('Moderator', `${interaction.member}`)
                    logChanelEmbed.addField('User Pured', `${Target}`)
                    logChanelEmbed.addField('Purged Messages', `> ${messages.size}`)
                })
            } else {
                await channel.bulkDelete(Amount, true).then(messages => {
                    Response.addField(`Moderator`, `${interaction.member}`)
                    Response.addField(`Purged Messages`, `> ${messages.size}`);
                    logChanelEmbed.addField('Moderator', `${interaction.member}`)
                    logChanelEmbed.addField('Purged Messages', `> ${messages.size}`)
                    
                })
            }

            if(Reason){
                Response.addField('Reason', Reason);
                logChanelEmbed.addField('Reason', Reason);
                interaction.reply({ embeds: [Response] });
            } else {
                Response.addField('Reason', 'No reason provided');
                logChanelEmbed.addField('Reason', 'No reason provided');
                interaction.reply({ embeds: [Response] });
            }
            const LogsChannel = await DB.findOne({ Guild: interaction.guild.id });
            if(LogsChannel) {
            await interaction.guild.channels.cache.get(LogsChannel.Channel).send({ embeds: [logChanelEmbed] })
            } else {
            return
            }
        } catch (error) {
            return;
        }
    }
}