//  GNU General Publice Lisence v3.0 - https://www.gnu.org/licenses/gpl-3.0.en.html
//  Credit to: Wilson#0159 on Discord.
//  Removal of this header breaches the license agreement.
//  For more info, refer to the license page linked at the top.

const {CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    description: "Generate a custom embed!",
    permissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "generate",
            description: "Generate a custom embed!",
            type: "SUB_COMMAND",
            options: [
                { name: "color", description: "Provide a color for the embed.", type: "STRING"},
                { name: "title", description: "Provide a title for the embed.", type: "STRING"},
                { name: "url", description: "Provide a url for the embed.", type: "STRING"},
                { name: "author", description: "Provide an author for the embed.", type: "STRING"},
                { name: "description", description: "Provide a description for the embed.", type: "STRING"},
                { name: "thumbnail", description: "Provide a thumbnail for the embed.", type: "STRING"},
                { name: "image", description: "Provide an image for the embed.", type: "STRING"},
                { name: "timestamp", description: "Enable timestamp?", type: "BOOLEAN"},
                { name: "footer", description: "Provide a footer for the embed.", type: "STRING"},
                { name: "fields", description: "name^value^inline (true or false)^^", type: "STRING" }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "generate":
                const eFields     = [[], [], []];
                const splitFields = [];

                
                const color      = options.getString("color");
                const title       = options.getString("title");
                const url         = options.getString("url");
                const author      = options.getString("author");
                const description = options.getString("description");
                const thumbnail   = options.getString("thumbnail");
                const image       = options.getString("image");
                const timestamp   = options.getBoolean("timestamp");
                const footer      = options.getString("footer");
                let   fields      = options.getString("fields");

                const embed       = new MessageEmbed();

                if(url && url.includes("http"))             embed.setURL(url);
                if(thumbnail && thumbnail.includes("http")) embed.setThumbnail(thumbnail);
                if(image && image.includes("http"))         embed.setImage(image);
                if(color)                                   embed.setColor(color.toUpperCase());
                if(title)                                   embed.setTitle(title);
                if(author)                                  embed.setAuthor(author);
                if(description)                             embed.setDescription(description);
                if(timestamp)                               embed.setTimestamp();
                if(footer)                                  embed.setFooter(footer);
                if(fields) {
                    fields = fields.split("^");
                    fields.forEach(e => {
                        if(e.length > 0) {
                            splitFields.push(e.trim())
                        }
                    });
            
                    let x = 0;
                    for (let i = 0; i < splitFields.length; i++) {
                        if(x == 3) x = 0;
                        eFields[x].push(splitFields[i]);
                        x++;
                    }
                        
                    for (let i = 0; i < eFields[0].length; i++) {
                        embed.addField(`${eFields[0][i]}`, `${eFields[1][i]}`, JSON.parse(eFields[2][i].toLowerCase()));
                    }
                }

                if(!embed.title && !embed.description && !embed.fields[0]) {
                    embed.setDescription("You have not provided valid options!")
                }
                //const embedChannel = interaction.channel
                interaction.reply({content: 'Success! Your embed is ready!', ephemeral: true});
                await channel.send({embed: [embed]});
        
        }
    }
}