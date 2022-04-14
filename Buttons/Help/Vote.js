const { MessageEmbed } = require('discord.js');
module.exports = { 
    
    id: "Vote",
    execute(interaction) {
        const vote = new MessageEmbed() 
        .setTitle('<:blurple_bell:963919363742781481> Vote')
        .addField('Vote for the bot', '[<:blurple_link:963919363847626762> link](https://top.gg/bot/954927451279069224/vote)')
        .setColor('#4e5d94')
        interaction.reply({ embeds: [vote] });
    }
}