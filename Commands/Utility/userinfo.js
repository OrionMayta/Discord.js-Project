const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Displays the userinfo of the specified target.",
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();

        const getPresence = (status) => {
            const statusType = {
                idle: "1FJj7pX.png",
                dnd: "fbLqSYv.png",
                online: "JhW7v9d.png",
                invisible: "dibKqth.png"
            };

            return `https://i.imgur.com/${statusType[status] || statusType["invisible"]}`;
        };

        const response = new MessageEmbed()
            .setColor(target.user.accentColor || "#4e5d94")
            .setAuthor({ name: target.user.tag, iconURL: getPresence(target.presence?.status) })
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "<:blurple_members:963919363877003284> ID", value: target.user.id },
                { name: "<:blurple_compass:963919363692441610> Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "<:blurple_chat:963919363843432508> Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "<:blurple_settings:963657845792972811> Roles", value: target.roles.cache.map(r => r).sort((a, b) => b.position - a.position).join(" ").replace("@everyone", "") || "None" },
                { name: "<:blurple_invite:963933524241559622> Nickname", value: target.nickname || "None", inline: true },
                { name: "<:blurple_support:963933477588320266> Accent Color", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None", inline: true },
                { name: "<:blurple_image:963919363847622686> Banner", value: target.user.bannerURL() ? "** **" : "None" }
            );

        interaction.reply({ embeds: [response], ephemeral: false });
    }
}