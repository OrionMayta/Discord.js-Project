const { ButtonInteraction, MessageEmbed } = require('discord.js');

module.exports = { 
    name: 'interactionCreate',
    /**
     * @param {ButtonInteraction} interaction
     */
    execute(interaction, client) {
        const InvalidPermission = new MessageEmbed()
        .setTitle('<:blurple_cross:963650863828717618> Invalid Permission')
        .setDescription(`You do not have the permission to use this button.`)
        .setColor('RED')

        if(!interaction.isButton()) return;
        const Button = client.buttons.get(interaction.customId);
        if(!Button) return;
        if(Button.permission && !interaction.member.permissions.has(Button.permission))
        return Interaction.reply({ embeds: [InvalidPermission], ephemeral: true });

        if(Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
        return interaction.reply({ embeds: [InvalidPermission], ephemeral: true });

        Button.execute(interaction, client);
    }
}