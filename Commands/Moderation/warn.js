const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Schemas/WarnDB');
const LogDB = require('../../Schemas/LogChannel');
const moment = require('moment');

module.exports = {
    name: 'warn',
    description: 'Warning system',
    permission: 'MANAGE_MESSAGES',
    options: [
        {
            name: 'add',
            description: 'Add a warning',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user to warn',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'The reason for the warning',
                    type: 'STRING',
                    required: true,
                }
            ]
        },
        {
            name: 'remove',
            description: 'Remove a warning',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'warnid',
                    description: 'The warnid of the warning to remove',
                    type: 'STRING',
                    required: true,
                }
            ]
        },
        {
            name: 'check',
            description: 'Check a user\'s warnings',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'The user you want to check for warns',
                    type: 'USER',
                    required: true,
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     * @param {Message} message
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;
        const user = options.getMember('user');
        const reason = options.getString('reason');
        const warnid = options.getString('warnid');

        const warnEmbed = new MessageEmbed()
        .setTitle(`User Warned`)
        .setColor('RED')
        .setDescription(`${user} has been warned for \`${reason}\``)

        const DM = new MessageEmbed()
        .setTitle(`You have been warned`)
        .setColor('RED')
        .addField(`Guild`, `${guild.name}`)
        .addField(`Reason`, `${reason}`)

        const noWarns = new MessageEmbed()
        .setTitle(`<:blurple_cross:963650863828717618> Found No Warnings`)
        .setColor('RED')
        .setDescription(`${user} has no warnings.`)
        const invalidId = new MessageEmbed()
        .setTitle(`<:blurple_cross:963650863828717618> Invalid Warn ID`)
        .setColor('RED')
        .setDescription(`The warnid you provided is invalid.`)

        const removed = new MessageEmbed()
        .setTitle(`<:blurple_check:963650809965457469> Removed Warning`)
        .setColor('AQUA')
        .setDescription(`The warning (\`${warnid}\`) has been removed.`)

        const LogChannelEmbed = new MessageEmbed()
        .setTitle(`Moderation Log`)
        .setColor('RED')
        .addField('Action', 'Warn')
        .addField('Moderator', `${interaction.member}`)
        .addField('User', `${user}`)
        .addField('Reason', `${reason}`)
        
        switch (options.getSubcommand()){
            case 'add': {
                if(user.id === client.user.id || user.id === interaction.member.id) {
                    const failedEmbed = new MessageEmbed()
                    .setTitle('<:blurple_cross:963650863828717618>Error')
                    .setDescription('> You can not warn this user.')
                    .setColor('RED');
                    interaction.reply({ embeds: [failedEmbed], ephemeral: true});
        		} else {
                    new DB({ 
                        userId: user.id,
                        guildId: guild.id,
                        moderatorId: interaction.user.id,
                        reason,
                        timestamp: Date.now()
                    }).save();
                    user.send({ embeds: [DM] }).catch(console.log);
                    interaction.reply({ embeds: [warnEmbed], ephemeral: false});
                    const LogsChannel = await LogDB.findOne({ Guild: interaction.guild.id });
                    if(LogsChannel) {
                    await interaction.guild.channels.cache.get(LogsChannel.Channel).send({ embeds: [LogChannelEmbed] })
                    } else {
                    return;
                    }
                }
            }
            break;
            case 'check': {
                const user = interaction.options.getMember('user');
                const userWarnings = await DB.find({ userId: user.id, guildId: guild.id });
                if (!userWarnings?.length) {
                    return interaction.reply({ embeds: [noWarns], ephemeral: false});
                }
                const embedDescription = userWarnings.map((warn) => {
                    const moderator = guild.members.cache.get(warn.moderatorId);
                    return [
                        `warnID: ${warn._id}`,
                        `Moderator: ${moderator || 'Unknown'}`,
                        `Date: ${moment(warn.timestamp).format('MMMM Do YYYY, h:mm:ss a')}`,
                        `Reason: ${warn.reason}`,
                    ].join('\n')
                }).join('\n\n');
                const embed = new MessageEmbed()
                .setTitle(`${user.user.tag}'s Warnings`)
                .setColor('RANDOM')
                .setDescription(embedDescription)
                interaction.reply({ embeds: [embed], ephemeral: false});
            }
            break;
            case 'remove': {
                const data = await DB.findById(warnid);
                if(!data){
                    interaction.reply({ embeds: [invalidId], ephemeral: true});
                }
                data.delete();
                interaction.reply({ embeds: [removed], ephemeral: false});
                
            }
            
        }
    }
}