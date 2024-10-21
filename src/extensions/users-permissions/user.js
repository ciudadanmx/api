'use strict';

// @ts-nocheck
module.exports = {
  async findOneByEmail(ctx) {
    const { email } = ctx.query;

    // Busca el usuario por email en el plugin de users-permissions
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email },
    });

    if (!user) {
      return ctx.notFound('Usuario no encontrado');
    }

    return ctx.send({ user });
  },
};
