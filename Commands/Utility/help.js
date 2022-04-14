const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "help",
    description: "Sends a list of commands",
    options: [
        {
            name: "command",
            description: "The command you want to get help for",
            type: "STRING",
            required: false,
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction) {
        const { message, client, options } = interaction;
        const command = options.getString("command");
        const helpCommand = new MessageEmbed()
        .setTitle('Help Menu!')
        .setColor('WHITE')
        .setDescription('Hello! I am OmniBot. An easy to use multiFunctional discord bot.\n\nAll my commands are slash commands which can be found using \`/\`.\n If you have any questions, or just want to vote for our bot to help us out, click the links below!')
        .addField(`<:blurple_shield:963657488018845696> Adminstrator`, "```/help admin```")
        .addField(`<:blurple_employee:963919363780513842> Moderation`, "```/help mod```")
        .addField(`<:blurple_members:963919363877003284>  Utility`, "```/help utility```")
        const row = new MessageActionRow();
        row.addComponents(
            new MessageButton()
            .setCustomId('Invite')
            .setLabel('Invite')
            .setStyle('DANGER'),
            new MessageButton()
            .setCustomId('Vote')
            .setLabel('Vote')
            .setStyle('DANGER'),
            new MessageButton()
            .setCustomId('Support')
            .setLabel('Support Server')
            .setStyle('DANGER')
        )
        
        if (!command) {
            interaction.reply({ embeds: [helpCommand], components: [row] });
        }else if (command === "admin" || command === 'administration' || command ==='administrator') {
            const adminHelp = new MessageEmbed()
            .setTitle('Administration Commands')
            .setColor('WHITE')
            .addField('logs', 'Description: sets the server\'s moderation logs\nUsage: `/logs [set {channel}/check/remove]`')
            .addField('anti-alt', 'Description: sets up the server\'s anti-alt system.\nUsage: `/anti-alt [setup {channel}/remove]`')
            .addField(`anti-scam`, 'Description: sets up the server\'s anti-scam system.\nUsage: `/anti-scam [setup {channel}/remove]`')
            interaction.reply({ embeds: [adminHelp], components: [row] });
         }else if (command === 'mod' || command ==='moderation' || command ==='moderator'){
            const modHelp = new MessageEmbed()
            .setTitle('Moderation Commands')
            .setColor('WHITE')
            .addField('ban', 'Description: bans a user from the server\nUsage: `/ban {user} {reason}`')
            .addField('kick', 'Description: kicks a user from the server\nUsage: `/kick {user} {reason}`')
            .addField('purge', 'Description: purges a number of messages from a channel/user \nUsage: `/purge {number} <target> <reason>`')
            .addField('mute', 'Description: mutes a user from the server\nUsage: `/mute {user} {reason}`')
            .addField('unmute', 'Description: unmutes a user from the server\nUsage: `/unmute {user} {reason}`')
            .addField('warn', 'Description: warns a user\nUsage: `/warn [add {user} {reason}/remove {warnID}/check {user}]`')
            .addField(`voicemove`, 'Description: moves all user\'s from one voice channel to another.\nUsage: `/voicemove {move-from} {move-to}`')
            interaction.reply({ embeds: [modHelp], components: [row] });
         } else if (command === 'utility') {
            const utilityHelp = new MessageEmbed()
            .setTitle('Utility Commands')
            .setColor('WHITE')
            .addField('afk', 'Description: sets you afk\nUsage: `/afk {status}`')
            .addField('help', 'Description: sends a list of commands\nUsage: `/help <command>`')
            .addField('ping', 'Description: Get the bot\'s latency\nUsage: `/ping`')
            .addField('userinfo', 'Description: Gets information about a user\nUsage: `/userinfo <user>`')
            .addField('serverinfo', 'Description: Gets information about the server\nUsage: `/serverinfo`')
            interaction.reply({ embeds: [utilityHelp], components: [row] });
         } else {
            interaction.reply({ embeds: [helpCommand], components: [row] });
         }
    }
}