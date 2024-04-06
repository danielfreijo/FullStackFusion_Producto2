const mongoose = require('mongoose');
const { Schema } = mongoose;
// Este tipo de configuración des para la BBDD MongoDb
const subjectSchema = new Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String, 
        required: false
    },
    description: {
        type: String, 
        required: false
    },
    department: {
        type: String,
        required: false
    },
    backgroundColor: {
        type: String,
        required: false
    },
    backgroundImage: {
        type: String,
        required: false
    },
    backgroundColorCard: {
        type: String,
        required: false
    },
    backgroundCard: {
        type: String,
        required: false
    },
    dataAccess: {
        type: String,
        required: false
    },
    priority: {
        type: Number,
        required: false
    },
    status: {
        type: Number,
        required: false
    }
});


// Listas
subjectSchema.methods.addProjects = function (h){this.projects.push(h)};
subjectSchema.methods.getProjects = function () {return this.projects}

module.exports = mongoose.model('Panel', subjectSchema);


