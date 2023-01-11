const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const htmlparser2 = require("htmlparser2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Return translate of word.")
    .addStringOption((option) =>
      option.setName("word").setDescription("Enter a word").setRequired(true)
    ),
  async execute(interaction, client) {
    const wordValue = interaction.options.getString("word");

    async function fetchData(word) {
      const url = `https://tureng.com/en/turkish-english/${word}`;
      const response = await fetch(url);
      const html = await response.text();

      const rows = [];
      let inTable = false;
      let inRow = false;
      let currentRow = [];

      const parser = new htmlparser2.Parser(
        {
          onopentag: (name, attribs) => {
            if (name === "table") {
              inTable = true;
            } else if (name === "tr" && inTable) {
              inRow = true;
            } else if (name === "td" && inRow) {
              currentRow.push("");
            }
          },
          ontext: (text) => {
            if (inRow) {
              currentRow[currentRow.length - 1] += text;
            }
          },
          onclosetag: (name) => {
            if (name === "table") {
              inTable = false;
            } else if (name === "tr") {
              inRow = false;
              if (currentRow.length > 1) {
                rows.push({
                  category: currentRow[1],
                  translation: currentRow[3],
                });
              }

              currentRow = [];
            }
          },
        },
        { decodeEntities: true }
      );
      parser.write(html);
      parser.end();

      return rows;
    }
    const data = await fetchData(wordValue);

    const embed = new EmbedBuilder()
      .setTitle(
        `${wordValue.charAt(0).toUpperCase() + wordValue.slice(1)}'s translates`
      )
      .setColor(0x18e1ee);

    for (let i = 0; i < data?.slice(0, 12).length; i++) {
      embed.addFields({
        name: data[i].category,
        value: data[i].translation,
        inline: true,
      });
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
