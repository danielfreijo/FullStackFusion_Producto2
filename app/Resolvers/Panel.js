const Project = require('../models/Panel');
// Las Query solicitan datos a nuestro Backend => Mostrar datos
const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Project.find();
      } catch (error) {
        throw new Error('Error al obtener los temas');
      }
    },
    subject: async (_, { id }) => {
      try {        
        return await Project.findById(id);
      } catch (error) {
        throw new Error('Error al obtener el proyecto');
      }
    },
  },
  Mutation: { //Si queremos crear, actualizar, eliminar se usan mutaciones => Actualizar datos
    // crearProyecto: async (_, {input}) => {
    //   try {
    //     const newProject = new Project(input);
    //     await newProject.save();
    //     return newProject;
    //   } catch (error) {
    //     throw new Error('Error al crear el proyecto');
    //   }
    // },
    createSubject: async (_, { input }) => {
      try {   
        const project = new Project(input); 
        await project.save();
        return project;
      } catch (error) {
        console.log(input);  
        throw new Error('Error al crear el proyecto nuevo');
      }
    },
    updateSubject: async (_, { id, input }) => {
      try {
        const project = await Project.findByIdAndUpdate(id, input, { new: true });
        return project;
      } catch (error) {
        throw new Error('Error al actualizar el proyecto');
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const project = await Project.findByIdAndDelete(id);
        return project;
      } catch (error) {
        throw new Error('Error al eliminar el proyecto');
      }
    },
  },
};

module.exports = resolvers;