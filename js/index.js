function createProjectCard(project) {
  return `
      <a class="card" href="/html/cardDetail.html?id=${project.id}">
          <div class="card-body">
            <h5 class="card-title">${project.name}</h5>
            <p class="card-text">${project.description}</p>
          </div>
      </a>
     
  `;
}

function showRecentProjects(projects) {
  const recentProjects = $('#recentProjects');
  recentProjects.empty();

  projects.sort((a,b) => new Date(b.lastAccessed)- new Date(a.lastAccessed));

  const projectsToShow = projects.slice(0, 4);

  projectsToShow.forEach(project => {
    const cardHTML = createProjectCard(project);
    recentProjects.append(cardHTML);
  });
}

function showAllProjects(projects, category = 'all') {
  const allProjects = $('#allProjects');
  allProjects.empty();

  console.log('Categoría seleccionada:', category); 

  let filteredProjects;
  
  if (category === 'all') {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(project => project.department === category);
  }

  console.log('Proyectos filtrados:', filteredProjects); 

  filteredProjects.forEach(project => {
    const cardHTML = createProjectCard(project);
    allProjects.append(cardHTML);
  });
}

function showPriorityProjects(projects) {
  const priorityProjects = $('#priorityProjects');
  priorityProjects.empty();

  const priorityProjectsArray = projects.filter(project => project.priority === 1);

  priorityProjectsArray.forEach(project => {
    const cardHTML = createProjectCard(project);
    priorityProjects.append(cardHTML);
  });
}

$(document).ready(function() {

  showRecentProjects(projects);
  showAllProjects(projects);
  showPriorityProjects(projects);

  // Evento para abrir el modal
  $('#openModal').click(function() {
    
    $('#addProjectModal').modal('show');
  });

  // Evento para agregar un proyecto
  $('#addProjectForm').submit(function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    console.log("Formulario de proyecto enviado"); 
    
    // Obtener los valores del formulario
    var projectName = $('#projectName').val();
    var projectDescription = $('#description').val();
    var projectDepartment = $('#department').val();
    var projectColor = $('#backgroundColor').val(); 
    var projectPriority = $('#priority').prop('checked') ? 1 : 0; 

    console.log("Valores del formulario obtenidos"); 
    
    // Agregar el proyecto al array projects
    var newProject = {
      "id": projects.length, 
      "name": projectName,
      "description": projectDescription,
      "department": projectDepartment,
      "backgroundcolor": projectColor,
      "backgroundimage": "null",
      "priority": projectPriority,
      "status": 1 
    };
    console.log("Nuevo proyecto creado:", newProject); 

    projects.push(newProject); 

    console.log("Proyecto añadido al array 'projects'"); 
    console.log("Proyectos después de agregar:", projects);

    $('#addProjectModal').modal('hide');
    
    showRecentProjects(projects);
    showAllProjects(projects);
  });

  // Evento para filtrar los proyectos
  $('.filter-button').click(function() {
    
    $('.filter-button').removeClass('active');
    $(this).addClass('active');
    var category = $(this).data('filter');
    
    showAllProjects(projects, category);
  });

  // Evento para mostrar el tablero del proyecto
  $(document).on('click', '.card', function() {
    var projectId = $(this).data('id');
    console.log('Proyecto seleccionado:', projectId);
    window.location.href = '../html/cardDetail.html?id=' + projectId;
  });

});