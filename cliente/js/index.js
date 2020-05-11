// Al finalizarse de cargar el DOM:
$(function() {

	if(!sesion()){
		window.location.href = "login.html";
	}

	$('#logout').click(function(){
		sessionStorage.clear();
		// location.reload(true); Terminar
		if(esAdmin()){
			window.location.href = "../../html/login.html";			
		}
		else{
			window.location.href = "login.html";
		}
	});

	// Se obtienen del backend y cargan en el DOM las competencias existentes
	var competenciasController = new CompetenciasController();
 	competenciasController.obtenerCompetencias();

	function esAdmin(){
		return sessionStorage.getItem("rol") == 1;
	}

	function sesion(){
		return sessionStorage.length != 0;
	}

	// Agregar nombre y foto de usuario dinamicamente. Implementar growl.
	const usuario = sessionStorage.getItem('usuarioActivo');
	$('#user').html(usuario);	
});
