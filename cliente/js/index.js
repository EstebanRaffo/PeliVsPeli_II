// Al finalizarse de cargar el DOM:
$(function() {
	
	if(!sesionActiva()){
		window.location.href = "login.html";
	}

	showAlertSuccess();
	
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

function showAlertSuccess(){
    $('#alert').empty();
    $('#alert').css({'position': 'absolute', 'top': '10px', 'right': '16px', 'font-size': '18px', 'z-index': '1'});
    $('#alert').append(`<div class="alert alert-success"><strong>Login exitoso</strong></div>`);
    $('#alert').show();
    $('#alert').fadeOut(5000);
}
