const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { connection } = require('mongoose');
require('../../Events/Client/Ready.js');

module.exports = { 
    name: 'ping',
    description: 'Displays the status of the client and database connection',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const ResponseEmbed = new MessageEmbed()
        .setColor('WHITE')
        .setTitle('**Client Status**')
        .addField('<:Online:960249619529465946> Online', `\`\`\`js\n'${client.ws.ping}ms'\`\`\``)
        .addField('Uptime', `<t:${parseInt(client.readyTimestamp / 1000)}:R>`)
        .addField('Database Status', `${switchTo(connection.readyState)}`)
        interaction.reply({embeds: [ResponseEmbed]});
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `<:Offline:960249619135201321> DISCONNECTED`
        break;
        case 1 : status = `<:Online:960249619529465946> CONNECTED`
        break;
        case 2 : status = `<:Idle:960249619386888252> CONNECTING`
        break;
        case 3 : status = `<:Cross:960249619143610398> DISCONNECTING`
        break;
    }
    return status;
}