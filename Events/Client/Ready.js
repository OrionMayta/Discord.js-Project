const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { Database } = require('../../config.json')
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('✅ The client is now ready')
        client.user.setActivity('The best OmniBot', { type: 'WATCHING' })
        if (!Database) return console.log('❌ Database is not connected')
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('✅ Database is connected')
        }).catch((err) => {
            console.log(err)
        })
    }
}