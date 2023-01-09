const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permission")
    .setDescription("This command require permission!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const { roles } = interaction.member;
    const role = await interaction.guild.roles
      .fetch("1059071481130254356")
      .catch(console.error);

    const testRole = await interaction.guild.roles
      .create({
        name: `Test`,
        permissions: [PermissionsBitField.Flags.KickMembers],
      })
      .catch(console.error);

    // Has role
    if (roles.cache.has("1059071481130254356")) {
      await interaction.deferReply({
        fetchReply: true,
      });
      await roles.remove(role).catch(console.error);
      await interaction.editReply({
        content: `Removed ${role.name} from you.`,
      });
    } else {
      await interaction.reply({
        content: `You do not have the ${role.name} role.`,
      });
    }

    await roles.add(testRole).catch(console.error);

    await testRole
      .setPermissions([PermissionsBitField.Flags.BanMembers])
      .catch(console.error);

    const channel = await interaction.guild.channels.create({
      name: `Test`,
      permissionsOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionFlagsBits.Flags.ViewChannel],
        },
        {
          id: testRole.id,
          allow: [PermissionFlagsBits.Flags.ViewChannel],
        },
      ],
    });

    await channel.permissionsOverwrites
      .edit(testRole.id, {
        SendMessages: false,
      })
      .catch(console.error);
  },
};
