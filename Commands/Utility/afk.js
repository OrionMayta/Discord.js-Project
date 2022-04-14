const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require('../../Schemas/AFKSystem.js')
module.exports = {
    name: "afk",
    description: "Sets an AFK status",
    options: [
        {
            name: "set",
            type: "SUB_COMMAND",
            description: "Sets an AFK status",
            options: [
                {
                    name: "status",
                    description: "Sets your AFK status",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "return",
            type: "SUB_COMMAND",
            description: "Returns from AFK status",
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp } = interaction;

        const Embed = new MessageEmbed()
        //.setAuthor(user.tag, user.displayAvatarURL({dynamic: true}));

        const afkStatus = options.getString("status");

        try {
            switch(options.getSubcommand()){
                case "set": {
                    await DB.findOneAndUpdate({GuildID: guild.id, UserID: user.id},
                        {Status: afkStatus, Time: parseInt(createdTimestamp / 1000)},
                        {new: true, upsert: true}
                        );
                    Embed.setColor('GREEN')
                    Embed.setTitle('Youre now afk!')
                    Embed.setDescription(`<:blurple_check:963650809965457469> Your AFK status has been updated to \`${afkStatus}\``);

                    return interaction.reply({embeds: [Embed], ephemeral: false});
                }
                case "return": {
                    await DB.deleteOne({GuildID: guild.id, UserID: user.id});
                    Embed.setColor('RED')
                    Embed.setTitle('Welcome back!')
                    Embed.setDescription(`<:blurple_check:963650809965457469> Your AFK status has been removed.`);
                    return interaction.reply({embeds: [Embed], ephemeral: true});
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
}