const { MessageEmbed } = require('discord.js');
module.exports = { 
    
    id: "Invite",
    execute(interaction) {
        const invite = new MessageEmbed() 
        .setTitle('<:blurple_bot:963919363809894450> Invite')
        .addField('Invite our bot!', '[<:blurple_link:963919363847626762> link](https://discord.com/oauth2/authorize?client_id=954927451279069224&scope=bot&permissions=8)')
        .setColor('#4e5d94')
        interaction.reply({ embeds: [invite] });
    }
}