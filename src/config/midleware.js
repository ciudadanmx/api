module.exports = [
  // Otras configuraciones de middleware
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // Cambia esto si tu aplicación está en otro dominio
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
      exposedHeaders: ['authorization'], // Encabezados que se exponen
      credentials: true, // Si se necesita enviar cookies
    },
  },
  // Otros middlewares...
];
