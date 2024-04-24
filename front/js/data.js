if (!sessionStorage.getItem('projectsdb') || !sessionStorage.getItem('usersdb')) {

    // Defino los usuarios
    var userdata = [
    user1 = {"nombre":"Maria", "pass":"12345678", "active":1},
    user2 = {"nombre":"Carlos", "pass":"12345678", "active":1},
    user3 = {"nombre":"Esteban", "pass":"12345678", "active":1},
    user4 = {"nombre":"Daniel", "pass":"12345678", "active":1},
    user5 = {"nombre":"Jordi", "pass":"12345678", "active":1},
    ];  

    // Defino el array de los Proyectos
    var projectsModel = [
        {       
            "id":0, 
            "name": "Desarrollo web Cafeteria el barrio",
            "description":"This is a description of the Project A.",
            "department":"Desarrollo",
            "backgroundcolor":"#f8e800",
            "backgroundimage":null,
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "cafeteria.jpg",
            "priority":0,
            "status":1,
            "dateAccess": new Date("2023-12-11T16:32:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-28",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
                {
                    "id": 3,
                    "title": "Tarea 4",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 4,
                    "title": "Tarea 5",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "POR HACER"
                },
                {
                    "id": 5,
                    "title": "Tarea 6",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-28",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
            
        },

        {
            "id":1, 
            "name": "Desarrollo web Restaurante Japonés",
            "description":"This is a description of the Project B.",
            "department":"Desarrollo",
            "backgroundcolor":"#f2df38",
            "backgroundimage":null,
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "sushi.jpg",
            "priority":0,
            "status":1,
            "dateAccess": new Date("2024-02-11T16:32:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
        },

        {       
            "id":2, 
            "name": "Estrategia de marca Micas's",
            "description":"This is a description of the Project A.",
            "department":"Diseño",
            "backgroundcolor":"#909D30",
            "backgroundimage":null,
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "diseño1.jpg",
            "priority":1,
            "status":1,
            "dateAccess": new Date("2024-02-21T16:32:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
        },

        {
            "id":3, 
            "name": "Logotipo E-commerce Luís",
            "description":"This is a description of the Project B.",
            "department":"Diseño",
            "backgroundcolor":"#1256f2",
            "backgroundimage":null,
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "diseño2.jpg",
            "priority":0,
            "status":1,
            "dateAccess": new Date("2023-12-19T09:10:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
        },

        {       
            "id":4, 
            "name": "Campaña de impacto Gripo SA",
            "description":"This is a description of the Project A.",
            "department":"Marketing",
            "backgroundcolor":"#909D30",
            "backgroundimage":null,
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "marketing1.jpg",
            "priority":1,
            "status":1,
            "dateAccess": new Date("2023-12-28T11:52:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
        },

        {       
            "id":5, 
            "name": "Branding Pasteleria Pepita",
            "description":"This is a description of the Project A.",
            "department":"Diseño",
            "backgroundcolor":"#1DC53F",
            "backgroundimage":null,
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "pasteleria.jpg",
            "priority":1,
            "status":1,
            "dateAccess": new Date("2024-01-08T12:32:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
        },

        {       
            "id":6, 
            "name": "Desarrollo aplicación móvil",
            "description":"This is a description of the Project A.",
            "department":"Desarrollo",
            "backgroundcolor":"#ffffff",
            "backgroundimage":"animal1.jpg",
            "backgroundcolorcard":"#ffffff",
            "backgroundcard": "desarrollo1.jpg",
            "priority":1,
            "status":1,
            "dateAccess": new Date("2024-03-11T16:32:00"),
            "tasks": [
                {
                    "id": 0,
                    "title": "Tarea 1",
                    "description": "Description of Task 1",
                    "responsible": ["Maria", "Jordi"],
                    "enddate": "2024-04-15",
                    "notes": "Some notes about Task 1",
                    "status": "POR HACER"
                },
                {
                    "id": 1,
                    "title": "Tarea 2",
                    "description": "Description of Task 2",
                    "responsible": ["Carlos", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "EN PROGRESO"
                },
                {
                    "id": 2,
                    "title": "Tarea 3",
                    "description": "Description of Task 2",
                    "responsible": ["Daniel", "Esteban"],
                    "enddate": "2024-04-20",
                    "notes": "Some notes about Task 2",
                    "status": "FINALIZADO"
                },
            ]
        },

    ];

    // Almacenamiento de datos en el almacenamiento de sesión del navegador
    console.log("Guardando datos en el almacenamiento de sesión del navegador: ", tempProjects);

    // Convertir Array de objetos a cadenas JSON
    var tempProjects = JSON.stringify(projectsModel);
    var tempUsers = JSON.stringify(userdata);

    console.log("Proyectos en JSON: ", tempProjects);

    // Almacenar cadenas JSON en el almacenamiento de sesión
    sessionStorage.setItem('projectsdb', tempProjects);
    sessionStorage.setItem('usersdb', tempUsers);

    console.log("Datos guardados en el almacenamiento de sesión del navegador: ", sessionStorage);
}