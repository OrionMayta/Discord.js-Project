const { Client, Collection } = require('discord.js');
const client = new Client({intents: 32767});
const { promisify } = require('util');
const Ascii = require('ascii-table');
const { glob } = require('glob');
const PG = promisify(glob);
require('dotenv').config();

client.commands = new Collection();
client.buttons = new Collection();

['Events', 'Commands', 'Buttons'].forEach((handler)=> {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(process.env.TOKEN);