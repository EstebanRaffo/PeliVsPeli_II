// Al finalizarse de cargar el DOM:
$(function() {
	// Validar si la sesión sigue activa

	// Se obtienen del backend y cargan en el DOM las competencias existentes
	var competenciasController = new CompetenciasController();
 	competenciasController.obtenerCompetencias();
	
	// Agregar nombre y foto de usuario dinamicamente

});
