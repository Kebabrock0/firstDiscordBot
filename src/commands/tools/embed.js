const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Return as embed."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`This is an EMBED`)
      .setDescription(`this is a very cool description`)
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://rozgun.social`,
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://rozgun.social`)
      .addFields([
        {
          name: `Minik Vaşağım benim`,
          value: `Seni çok seviyorum`,
          inline: true,
        },
        {
          name: `İmza`,
          value: `Minik davşanın`,
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
