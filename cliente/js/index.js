// Al finalizarse de cargar el DOM:
$(function() {

	if(!sesionActiva()){
		window.location.href = "login.html";
	}

	$('#logout').click(function(){
		esAdmin() ? window.location.href = "../login.html" : window.location.href = "login.html";
		sessionStorage.clear();
	});

	// Agregar nombre y foto de usuario dinamicamente. 
	const usuario = sessionStorage.getItem('usuarioActivo');
	$('#user').html(usuario);	
	
	// Se obtienen del backend y cargan en el DOM las competencias existentes
	var competenciasController = new CompetenciasController();
 	competenciasController.obtenerCompetencias();

	function esAdmin(){
		return sessionStorage.getItem("rol") == 1;
	}

	function sesionActiva(){
		return sessionStorage.length > 0;
	}
});
