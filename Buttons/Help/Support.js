const { MessageEmbed } = require('discord.js');
module.exports = { 
    
    id: "Support",
    execute(interaction) {
        const support = new MessageEmbed() 
        .setTitle('<:blurple_verified:963919363671490640> Support')
        .addField('Support Server', '[<:blurple_link:963919363847626762> link](https://discord.gg/4xYX4uVfa4)')
        .setColor('#4e5d94')
        interaction.reply({ embeds: [support] });
    }
}