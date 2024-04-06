// Importar los módulos necesarios
const express = require('express');
const router = express.Router();
const Subject = require('../models/Panel');


// Definir una ruta para el panel
router.get('/panel', async (req, res) => {
    try {
        res.render('Intentando obtener datos de la BBDD')
        // Obtener los datos del panel desde la base de datos o cualquier otra fuente de datos
        const subjects = await Subject.find().exec();
        res.render('Dentro de get en panel');
        // Renderizar el panel con los datos obtenidos
        res.render('panel', { subjects });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al obtener los datos del panel:', error);
    }
});

// Definir una ruta para crear un nuevo tema (subject)
router.post('/createSubject', async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { name, description, department, backgroundColor, 
            backgroundImage, backgroundColorCard, backgroundCard, 
            dataAccess, priority, status } = req.body;

        // Crear un nuevo tema (subject) utilizando los datos proporcionados
        const newSubject = new Subject({
            name,
            description,
            department,
            backgroundColor,
            backgroundImage,
            backgroundColorCard,
            backgroundCard,
            dataAccess,
            priority,
            status
        });

        // Guardar el nuevo tema (subject) en la base de datos
        const savedSubject = await newSubject.save();

        // Devolver el tema (subject) creado como respuesta
        res.status(201).json(savedSubject);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al crear el tema:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Exportar el router para su uso en la aplicación principal
module.exports = router;