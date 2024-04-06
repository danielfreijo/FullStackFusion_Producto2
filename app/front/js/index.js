
// Función para abrir el modal
$('#openModal').click(function () {
  $('#addProjectModal').modal('show');
});

// Evento para agregar un proyecto
// $('#addProjectForm').submit(function (event) {
//   event.preventDefault();
//   console.log("Formulario de proyecto enviado");

//   // Obtener los valores del formulario
//   var pname = $('#pname').val();
//   var description = $('#description').val();
//   var department = $('#department').val();
//   var priority = $('#priority').prop('checked') ? 1 : 0;

//   var backgroundColorCard;
//   var backgroundImage;

//   // Verificar el tipo de fondo seleccionado para la tarjeta
//   var backgroundCard = $('#backgroundCard').val();
//   console.log("Tipo de fondo seleccionado:", backgroundType);

//   if (backgroundCard === 'color') {
//     backgroundColorCard = $('#backgroundColorCard').val();
//     backgroundImage = null;
//   } else if (backgroundCard === 'image') {
//     backgroundColorCard = $('#backgroundColorCard').val();
//     backgroundImage = $('#backgroundImageCard').val();
//   }

//   var backgroundColor;
//   var projectBackgroundImage;

//   // Verificar el tipo de fondo seleccionado pora el proyecto
//   var backgroundType = $('#backgroundType').val();
//   console.log("Tipo de fondo seleccionado:", backgroundType);

//   if (backgroundType === 'color') {
//     projectBackgroundColor = $('#backgroundColor').val();
//     projectBackgroundImage = null;
//   } else if (backgroundType === 'image') {
//     projectBackgroundColor = $('#backgroundColor').val();
//     projectBackgroundImage = $('#backgroundImage').val();
//   }

 
  // $('#addProjectForm').trigger('reset');
  // $('#addProjectModal').modal('hide');
// });
a