const express = require('express');
const path = require('path');
const { ApolloServer} = require('apollo-server-express');
const { projectTypeDefs, projectResolvers } = require('./controllers/projectsController');
const { taskTypeDefs, taskResolvers } = require('./controllers/tasksController');
const { connection} = require('./config/connectionDB');
const socketIO = require ('socket.io');
const multer = require ('multer');
const logger = require ('morgan');

// Crea la aplicación Express
const app = express();
const upload = multer();
connection();

// Define el directorio público
const publicPath = path.join(__dirname, "front");

// Configura la aplicación Express para servir archivos estáticos
app.use(express.static(path.join( publicPath )));

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs: [projectTypeDefs, taskTypeDefs],
    resolvers: {
      Query: {
        ...projectResolvers.Query,
        ...taskResolvers.Query
      },
      Mutation: {
        ...projectResolvers.Mutation,
        ...taskResolvers.Mutation
      }
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/api'});

  // Inicia el servidor de Socket.IO
  const io = new socketIO(server);

  // Maneja el evento 'mensaje' enviado por el cliente
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Manejar el evento 'mensaje' enviado por el cliente
    socket.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido:', mensaje);
        // Emitir el mensaje a todos los clientes conectados
        io.emit('mensaje', mensaje);
    });
  });

  app.use((req, res, next) => {
    res.status(404).send('Error 404');
  });

  const PORT = process.env.PORT || 4000;
  const expressServer = app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    //console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
  );

  // Exporta el objeto io y el servidor Express
  module.exports = { io, expressServer };

}

startServer();