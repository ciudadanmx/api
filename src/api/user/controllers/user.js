const createOrUpdateUser = async (ctx) => {
    try {
        const { email, username } = ctx.request.body;

        // Verificar si el usuario ya existe en `users-permissions`
        const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
            where: { email }
        });

        if (!existingUser) {
            // Crear usuario en `users-permissions`
            const newUser = await strapi.plugins['users-permissions'].services.user.add({
                username,
                email,
                password: 'temporalPassword', // Reemplaza esto con una contraseña real o lógica para generar contraseñas
                role: 1, // Asegúrate de que este sea el rol correcto
                confirmed: true,
            });

            // Agregar a la colección personalizada
            await strapi.entityService.create('api::user.user', {
                data: {
                    email: ctx.request.body.email,
                    username: ctx.request.body.username,
                    // Otros campos si es necesario
                }
            });

            return ctx.send({ message: 'Usuario creado con éxito', user: newUser });
        }

        return ctx.send({ message: 'Usuario ya existe', user: existingUser });
    } catch (error) {
        ctx.throw(500, error);
    }
};
