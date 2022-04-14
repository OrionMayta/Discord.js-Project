const chalk = require("chalk"); // Importing Chalk from Chalk
const config = require('../config.json')
const {MessageEmbed, WebhookClient} = require('discord.js') // Importing MessageEmbed from Discord.js
const {inspect} = require("util")
const s = new WebhookClient({
                id: "962543741107855480",
                token:"gvI5S3uJKSMQKXQnGzgAC4pxWc1RZ4JzyuvZSDeAdzMsOzDDyPoyhz8EjspaGWIA4Aw3",
            });


module.exports = (client) => {
    client.on('error', err => {
        // const a = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err)
        const ErrorEmbed = new MessageEmbed()
            .setTitle('Error')
            .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors')
            .setColor('#2F3136')
            .setDescription(`\`\`\`${inspect(error, {depth: 0})}\`\`\``)
            
            .setTimestamp()
    });
    process.on("unhandledRejection", (reason, p) => {
        // const b = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(
            chalk.yellow('——————————[Unhandled Rejection/Catch]——————————\n'),
            reason, p
        )
        const unhandledRejectionEmbed = new MessageEmbed()
            .setTitle('**<:blurple_cross:963650863828717618>There was an Unhandled Rejection/Catch <:Cross:960249619143610398>**')
            .setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
            .setColor('RED')
            .addField('Reason', `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Promise', `\`\`\`${inspect(p, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
    });
    
    process.on("uncaughtException", (err, origin) => {
        // const c = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err, origin)
        const uncaughtExceptionEmbed = new MessageEmbed()
            .setTitle('**<:Cross:960249619143610398>There was an Uncaught Exception/Catch <:Cross:960249619143610398>**')
            .setColor('RED')
            .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
            .addField('Error', `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Origin', `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
    });
    
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        // const d = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err, origin)
        const uncaughtExceptionMonitorEmbed = new MessageEmbed()
            .setTitle('**<:blurple_cross:963650863828717618>There was an Uncaught Exception Monitor <:Cross:960249619143610398>**')
            .setColor('RED')
            .setURL('https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor')
            .addField('Error', `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Origin', `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000))
 
            .setTimestamp()
    
    });
    
    process.on("multipleResolves", (type, promise, reason) => {
        // const e = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(type, promise, reason)
        const multipleResolvesEmbed = new MessageEmbed()
            .setTitle('**<:blurple_cross:963650863828717618>There was an Multiple Resolve <:Cross:960249619143610398>**')
            .setURL('https://nodejs.org/api/process.html#event-multipleresolves')
            .setColor('RED')
            .addField('Type', `\`\`\`${inspect(type, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Promise', `\`\`\`${inspect(promise, { depth: 0 })}\`\`\``.substring(0, 1000))
            .addField('Reason', `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
    });
    
    process.on("warning", (warn) => {
        // const f = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(warn)
        const warningEmbed = new MessageEmbed()
            .setTitle('**<:blurple_cross:963650863828717618>There was an Uncaught Exception Monitor Warning <:Cross:960249619143610398>**')
            .setColor('RED')
            .setURL('https://nodejs.org/api/process.html#event-warning')
            .addField('Warn', `\`\`\`${inspect(warn, { depth: 0 })}\`\`\``.substring(0, 1000))
            .setTimestamp()
    });
    
}
