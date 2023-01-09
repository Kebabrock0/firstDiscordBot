const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Return a menu!"),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`sub-menu`)
      .setPlaceholder(`Nothing selected`)
      .addOptions(
        {
          label: "Bilgeyi çok seviyorum",
          description: "Mami Bilgeyi çok seviyor",
          value: "Mami",
        },
        {
          label: "Mamiyi çok seviyorum",
          description: "Bilge Mamiyi çok seviyor",
          value: "Bilge",
        }
      );

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
