$(function(){
    // Cargar datos de usuario
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
            alert(error);
        }
    });
})

$('#save').click(function(event){
    event.preventDefault();
    var server = 'http://localhost:8080';
    var id = sessionStorage.getItem('id');
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var repass = $('#repass').val();

    if(password != repass){
        alert('Las contraseñas no coinciden');
        event.preventDefault();
        return;
    }
    // Agregar validación de formulario

    $.put({
        url: server + "/usuario/"+id+"/actualizar",
        data: {"name": name, "email": email, "password": password},
        success: function(){
            alert('Usuario actualizado con exito');
            window.location.href = "index.html";
            // esAdmin() ? window.location.href = "./administrar/index.html" : window.location.href = "index.html";
        },
        error: function(error){
            alert(error);
        }
    });

});

function esAdmin(){
    return sessionStorage.getItem("rol") == 1;
}


$('#cancel').click(function(){
    esAdmin() ? window.location.href = "./administrar/index.html" : window.location.href = "index.html";  
})