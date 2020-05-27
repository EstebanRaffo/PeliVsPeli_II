// Cargar datos del usuario
$(function(){
    var server = 'http://localhost:8080';
    var id = sessionStorage.getItem('id');

    $.get({
        url: server + "/usuario/perfil",
        data: {"id": id},
        success: function(perfilUsuario){
            $('#name').val(perfilUsuario.name);
            $('#email').val(perfilUsuario.email);
            $('#password').val(perfilUsuario.password);
            $('#repass').val(perfilUsuario.password);
        },
        error: function(error){
            console.log(error);
        }
    });
});

$('#cancel').click(function(){
    esAdmin() ? window.location.href = "./administrar/index.html" : window.location.href = "index.html";  
});

$('#volver').click(function(){
    esAdmin() ? window.location.href = "./administrar/index.html" : window.location.href = "index.html";  
});



$('#save').click(function(event){
    event.preventDefault();
    var server = 'http://localhost:8080';
    var id = sessionStorage.getItem('id');
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var repass = $('#repass').val();

    // if(password != repass){
    //     alert('Las contraseñas no coinciden');
    //     event.preventDefault();
    //     return;
    // }
    // Agregar validación de formulario

    $.ajax({
        url: server + "/usuario/"+id+"/actualizar",
        method: 'put',
        data: {"name": name, "email": email, "password": password},
        success: function(){
            showAlertSuccess(); 
        },
        error: function(error){
            console.log(error);
        }
    });

});


function showAlertSuccess(){
    $('#alert').empty();
    $('#alert').css({'position': 'absolute', 'top': '10px', 'right': '16px', 'font-size': '18px', 'z-index': '1'});
    $('#alert').append(`<div class="alert alert-success"><strong>Los datos han sido guardados</strong></div>`);
    $('#alert').show();
    $('#alert').fadeOut(5000);
}

function esAdmin(){
    return sessionStorage.getItem("rol") == 1;
}


    