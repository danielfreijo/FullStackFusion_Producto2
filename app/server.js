const express = require('express'); // importamos express
const { ApolloServer, gql } = require('apollo-server-express'); //importamos apollo
const path = require('path');  //utilidades para trabajar con rutas de archivos y directorios
//path.dirname(path): Devuelve el nombre del directorio de la ruta especificada.
//path.resolve([...paths]): Resuelve una secuencia de segmentos de ruta o rutas en una ruta absoluta. 
//Es útil para crear rutas absolutas desde rutas relativas o fragmentos de ruta.
//path.basename(path[, ext]): Devuelve la última porción de una ruta, similar al nombre del archivo. 
//Puedes especificar una extensión para excluirla del resultado.
const bodyParser = require('body-parser');
const { connectDB } = require('./config/connectionDB')
const app = express();
//Por ejemplo, puedes usar app.get(), app.post(), app.use(), entre otros, para definir cómo 
// la aplicación responde a diferentes tipos de solicitudes HTTP.
// es el punto de partida para construir una aplicación web o API utilizando Express en Node.js.
// Configurar body-parser
const panelRoutes = require('./controllers/PanelController'); // Importa las rutas del panel
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/panel', panelRoutes); // Utiliza las rutas del panel con el prefijo '/panel'

require('./Schema/Panel')
const typeDefs = require('./Schema/Panel')
const resolvers = require('./Resolvers/Panel')


// Definiciones de esquema y resolvers
// const typeDefs = gql`
//   ${typeDefsPanel}
// `;

// const resolvers = {
//  resolvers
// };

async function startServer() {

  try {
    connectDB;
    // mongoose.connect(uri);
    // console.log("Connected to MongoDB server");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });


    await server.start(); // Inicializa apolloServer defiendo esquemas a consultar y demás
    // Redirigir las solicitudes a /graphql al archivo index.html
    //****************** */
    // app.get('/graphql', (req, res) => {
    //   res.sendFile(path.join(__dirname, './front/index.html'));
    // });
    //********************** */
    // app.use(express.static(path.join(__dirname, 'front')));
    // app.get('/graphql', (req, res) => {
    //   res.sendFile(path.join(__dirname, 'front', 'index.html'));
    // });
    //******************** */
    app.use(express.static(path.join(__dirname, 'front')));
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'front', 'index.html'));
    });

    //*********************** */


    //**************************** */
    server.applyMiddleware({ app });
    //es la manera en que integras Apollo Server con Express, 
    //permitiendo que tu servidor Express maneje solicitudes GraphQL.
    //Estás aplicando el middleware de Apollo Server a tu instancia de Express app. 
    //Esto significa que cualquier solicitud que llegue a tu servidor Express será 
    //manejada por Apollo Server para las operaciones de GraphQL. 
    //Esto incluye las consultas (query), mutaciones (mutation) y suscripciones (subscription).
    const PORT = 4000;
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
    );
  } catch (err) {
    console.error(err);
  };
}

startServer();