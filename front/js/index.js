let projects = [];

// 1. Definiciones de Funciones Asíncronas para interactuar con la API
async function getProjects() {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({
      query: `
        query {
          getProjects {
            id
            name
            description
            department
            backgroundcolor
            backgroundimage
            backgroundcolorcard
            backgroundcard
            priority
            dateaccess
          }
        }
      `,
    }),
  });

  const responseBody = await response.text(); 
  //console.log("Respuesta del servidor:", responseBody);
  try {
    const { data } = JSON.parse(responseBody);
    //console.log("Datos obtenidos:", data);
    return data.getProjects;
  } catch (error) {
    console.error("Error al parsear la respuesta:", responseBody);
    throw new Error(`Error al obtener los proyectos: ${error}`);
  }
  
}

// 2. Funciones para manipulación del DOM 
function createProjectCard(project) {
  const projectNameUpperCase = project.name.toUpperCase();
  let backgroundStyle = '';
  if (!project.backgroundcard) {
    backgroundStyle = `background-color: ${project.backgroundcolorcard};`;
  } else{
    const backgroundUrl = `/assets/BackgroundCards/${project.backgroundcard}`; 
    backgroundStyle = `background-image: url('${backgroundUrl}');`;
  }
  //console.log("backgroundStyle:", backgroundStyle);
  const starIcon = project.priority === true 
  ? '<img src="/assets/estrellaM.png" alt="prioridad" style="width: 22px; height: 22px;">' 
  : '<img src="/assets/estrellaV.png" alt="sin prioridad" style="width: 22px; height: 22px;">';

  return `
  <a class="card" href="/cardDetail.html?id=${project.id}" data-id="${project.id}" style="${backgroundStyle};">
      <div class="card-body">
        <h5 class="card-title">${projectNameUpperCase}</h5>
        <button class="btn btn-primary delete-button" style="display:none;" >ELIMINAR</button>
        <button class="btn btn-primary priority-button" style="display:none;">-${starIcon}-</button>
      </div>
  </a>
  `;
}
function showRecentProjects(projects) {
  const recentProjects = $('#recentProjects');
  recentProjects.empty();
  const projectsCopy = [...projects];

  // Ordenar los proyectos por fecha de acceso de manera descendente
  projectsCopy.sort((a, b) => +b.dateaccess - +a.dateaccess);
  
  // Tomar los 4 proyectos más recientes
  const projectsToShow = projectsCopy.slice(0, 4);

  projectsToShow.forEach(project => {
    const cardHTML = createProjectCard(project);
    recentProjects.append(cardHTML);
  });
}
function showAllProjects(projects, category = 'all') {
  const allProjects = $('#allProjects');
  allProjects.empty();
  //console.log('Categoría seleccionada:', category); 

  let filteredProjects;
  
  if (category === 'all') {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(project => project.department === category);
  }
  //console.log('Proyectos filtrados:', filteredProjects); 

  // Ordenar los proyectos por su ID de manera ascendente
  filteredProjects.sort((a, b) => a.id - b.id);

  filteredProjects.forEach(project => {
    const cardHTML = createProjectCard(project);
    allProjects.append(cardHTML);
  });
}
function showPriorityProjects(projects) {
  const priorityProjects = $('#priorityProjects');
  priorityProjects.empty();

  const priorityProjectsArray = projects.filter(project => project.priority === true);

  priorityProjectsArray.forEach(project => {
    const cardHTML = createProjectCard(project);
    priorityProjects.append(cardHTML);
  });
}

// 3. Bloque de inicialización $(document).ready
$(document).ready(async function() {
  try {
    projects = await getProjects();
    showRecentProjects(projects);
    showAllProjects(projects);
    showPriorityProjects(projects);
    console.log('Proyectos obtenidos:', projects);

  } catch (error) { 
    console.error('Error al obtener los proyectos:', error);
  }

  // Función para abrir el modal
  $('#openModal').click(function() {
    $('#addProjectModal').modal('show');
    console.log("Modal abierto");
  });
  
  // Función para cambiar la sección de fondo
  $('#backgroundType').change(function() {
    var backgroundType = $(this).val(); // Obtener el valor seleccionado del select
    if (backgroundType === 'color') {
      $('#colorSection').show();
      $('#imageSection').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundType);
    } else if (backgroundType === 'image') {
      $('#imageSection').show();
      $('#colorSection').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundType);
    }
  });
  $('#backgroundTypeCard').change(function() {
    var backgroundTypeCard = $(this).val(); // Obtener el valor seleccionado del select
    if (backgroundTypeCard === 'color') {
      $('#colorSectionCard').show();
      $('#imageSectionCard').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundTypeCard);
    } else if (backgroundTypeCard === 'image') {
      $('#imageSectionCard').show();
      $('#colorSectionCard').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundTypeCard);
    }
  });

  // Función para mostrar la vista previa de la imagen seleccionada
  $('#backgroundImage').change(function() {
    var selectedImage = $(this).val();
    if (selectedImage) {
      console.log("Imagen seleccionada:", selectedImage);
      $('#previewImage').attr('src', '/assets/BackgroundsProjects/' + selectedImage).show();
    } else {
      $('#previewImage').hide();
    }
  });
  $('#backgroundImageCard').change(function() {
    var selectedImage = $(this).val();
    if (selectedImage) {
      console.log("Imagen seleccionada:", selectedImage);
      $('#previewImageCard').attr('src', '/assets/BackgroundCards/' + selectedImage).show();
    } else {
      $('#previewImageCard').hide();
    }
  });

  // Evento para agregar un proyecto
  $('#addProjectForm').submit(async function(event) {
    event.preventDefault(); 
    console.log("Formulario de proyecto enviado"); 
    
    // Obtener los valores del formulario
    const projectName = $('#projectName').val();
    const projectDescription = $('#description').val();
    const projectDepartment = $('#department').val();
    const projectPriority = $('#priority').prop('checked') ? true : false; 

    let projectBackgroundColorCard;
    let projectBackgroundImageCard;
    
    // Verificar el tipo de fondo seleccionado para la tarjeta
    const backgroundTypeCard = $('#backgroundTypeCard').val();
     
    if (backgroundTypeCard === 'color') {
      projectBackgroundColorCard = $('#backgroundColorCard').val();
      projectBackgroundImageCard = null; 
    } else if (backgroundTypeCard === 'image') {
      projectBackgroundColorCard = $('#backgroundColorCard').val();
      projectBackgroundImageCard = $('#backgroundImageCard').val();
    }

    let projectBackgroundColor;
    let projectBackgroundImage;
    
    // Verificar el tipo de fondo seleccionado pora el proyecto
    const backgroundType = $('#backgroundType').val();

    if (backgroundType === 'color') {
      projectBackgroundColor = $('#backgroundColor').val();
      projectBackgroundImage = null; 
    } else if (backgroundType === 'image') {
      projectBackgroundColor = $('#backgroundColor').val();
      projectBackgroundImage = $('#backgroundImage').val();
    }

    const mutation = `
      mutation CreateProject($input: ProjectInput!) {
        createProject(input: $input) {
          id
          name
          description
          department
          backgroundcolor
          backgroundimage
          backgroundcolorcard
          backgroundcard
          priority
          dateaccess
        }
      }
    `;

    // Prepara el cuerpo de la solicitud, incluyendo la mutación y las variables
    const requestBody = {
      query: mutation,
      variables: {
        input: {
          name: projectName,
          description: projectDescription,
          department: projectDepartment,
          backgroundcolor: projectBackgroundColor,
          backgroundimage: projectBackgroundImage,
          backgroundcolorcard: projectBackgroundColorCard,
          backgroundcard: projectBackgroundImageCard,
          priority: projectPriority,
        },
      },
    };

    try {
      // Envía la solicitud al servidor GraphQL
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody = await response.json();
      if (responseBody.errors) {
        console.error("Error al crear proyecto:", responseBody.errors);
        
      } else {
        console.log("Proyecto creado exitosamente:", responseBody.data.createProject);
        projects.push(responseBody.data.createProject);

        showAllProjects(projects); 
        showRecentProjects(projects);
        showPriorityProjects(projects);
        
        $('#addProjectModal').modal('hide');
      }
    } catch (error) {
      console.error("Error al realizar la solicitud a GraphQL:", error);
    }
  });

  // Función para filtrar los proyectos
  $('.filter-button').click(function() {
    $('.filter-button').removeClass('active');
    $(this).addClass('active');
    var category = $(this).data('filter');
    
    showAllProjects(projects, category);
  });

  // Función para mostrar el tablero del proyecto
  $(document).on('click', '.card', function() {
    var projectId = $(this).data('id');
    console.log('Proyecto seleccionado:', projectId);
  });

  // Evento para cambiar la prioridad del proyecto
  $(document).on('click', '.priority-button', async function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Se hizo clic en el botón de prioridad.');

    const card = $(this).closest('.card');
    const projectId = card.data('id');
    const project = projects.find(project => project.id === projectId)
    const newPriority = !project.priority;

    // Preparar la mutación de GraphQL
    const mutation = `
      mutation UpdateProjectPriority($id: ID!, $priority: Boolean!) {
        updateProject(id: $id, input: { priority: $priority }) {
          id
          priority
        }
      }
    `;

    // Preparar el cuerpo de la solicitud
    const requestBody = {
      query: mutation,
      variables: {
        id: projectId,
        priority: newPriority,
      },
    };

    try {
      // Envía la solicitud al servidor GraphQL
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody = await response.json();
      if (responseBody.errors) {
        console.error("Error al actualizar la prioridad del proyecto:", responseBody.errors);
      } else {
        console.log("Prioridad del proyecto actualizada con éxito", responseBody.data.updateProject);
        
        // Actualizar la imagen del botón
        $(this).find('img').attr('src', newPriority ? '/assets/estrellaM.png' : '/assets/estrellaV.png');
        $(this).find('img').attr('alt', newPriority ? 'prioridad' : 'sin prioridad');
        
        // Actualiza el estado local del proyecto
        project.priority = newPriority;

        showPriorityProjects(projects);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud a GraphQL:", error);
    }
  });

  // Función para mostrar el botón de eliminación y prioridad
  $(document).on('mouseenter', '.card', function() {  
    $(this).find('.delete-button').show();
    $(this).find('.priority-button').show();
  });
  
  // Función para ocultar el botón de eliminación y prioridad
  $(document).on('mouseleave', '.card', function() {
    $(this).find('.delete-button').hide();
    $(this).find('.priority-button').hide();  
  });

  // Evento para eliminar un proyecto
  $(document).on('click', '.delete-button', function(event) {
    event.preventDefault();
    console.log("Botón de eliminación clicado");

    // Obtener el ID del proyecto asociado con la tarjeta
    var projectId = $(this).closest('.card').data('id');
    //console.log("ID del proyecto a eliminar:", projectId);

    // Mostrar el modal de confirmación
    $('#confirmationModal').modal('show');

    // Manejar el evento de confirmación
    $('#confirmDelete').click( async function() {

      const mutation = `
        mutation DeleteProject($id: ID!) {
          deleteProject(id: $id)
        }
      `;

      const requestBody = {
        query: mutation,
        variables: {
          id: projectId,
        },
      };

      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const responseBody = await response.json();
        if (responseBody.errors) {
          console.error("Error al eliminar el proyecto:", responseBody.errors);
          
        } else {
          console.log("Proyecto eliminado con éxito", responseBody.data.deleteProject);

          projects = projects.filter(project => project.id !== projectId); //mirar esto para tareas
          
          showRecentProjects(projects); 
          showAllProjects(projects);
          showPriorityProjects(projects);

          $('#confirmationModal').modal('hide');
        }
      } catch (error) { 
        console.error("Error al realizar la solicitud a GraphQL:", error);
      }
    });
    return false; // Evita el comportamiento predeterminado del enlace
  });

});



