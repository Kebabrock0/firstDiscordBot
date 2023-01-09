module.exports = {
  data: {
    name: `fav-color`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You said your favourite color is  ${interaction.fields.getTextInputValue(
        "favColorInput"
      )}`,
    });
  },
};
