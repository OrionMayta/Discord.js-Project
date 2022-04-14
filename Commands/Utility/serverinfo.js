const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: '(╯°□°）╯︵ ┻━┻: High',

	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻: Very High'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};


module.exports = { 
    name: 'serverinfo',
    description: 'Get information on the server.',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {CLient} client 
     */
    async execute(interaction, client) {
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

		const channels = interaction.guild.channels.cache;

		const emojis = interaction.guild.emojis.cache;
		const embed = new MessageEmbed()

			.setDescription(`**Guild information for __${interaction.guild.name}__**`)

			.setColor('BLUE')

			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addField('**<:blurple_search:963933297363267594> Created At**', `${moment(interaction.guild.createdTimestamp).format('LL')} ${moment(interaction.guild.createdTimestamp).fromNow()}`, true)
      .addField('**<:blurple_invite:963933524241559622> Roles**', ` ${roles.length}`, true)
      .addField('**<:blurple_nitro:963919363629539440> Emojis**', ` ${emojis.size}`, true)
      .addField('**<:blurple_boost:963919363679879178> Boost Count**', ` ${interaction.guild.premiumSubscriptionCount || '0'}`, true)
      .addField('**<:blurple_lock:963919363809878077> Verification**', ` ${verificationLevels[interaction.guild.verificationLevel]}`, true)
      .addField('**<:blurple_shield:963657488018845696> Content Filter**', ` ${filterLevels[interaction.guild.explicitContentFilter]}`, true)
      .addField('**<:blurple_members:963919363877003284> Member**', ` ${interaction.guild.memberCount}`, true)
      .addField('**<:blurple_verified:963919363671490640> Shard**', `0`, true)
      .addField('**<:blurple_textchannel:963935132740382730> Channels**', `⌨️ ${channels.filter(channel => channel.type === 'text').size}  | 🔈 ${channels.filter(channel => channel.type === 'voice').size}`, true)
	  .setTimestamp();


        interaction.reply({embeds: [embed]});

    }
}