$(document).ready(function(){
    
    $(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {

        var $this = $(this),
          label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if($this.val() === "") {
                label.removeClass("active highlight"); 
                } else {
                label.removeClass("highlight");   
                }   
        } else if (e.type === "focus") {
            if($this.val() === "") {
                label.removeClass("highlight"); 
            } 
            else if($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });

    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});

$('#newUser').click(function(event){
    event.preventDefault();
    var server = 'http://localhost:8080';
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val()
    var name = nombre + ' ' + apellido;
    var email = $('#email').val();
    var password = $('#pass').val();
    var repass = $('#repass').val();
    var rol_id = 2;

    // Agregar validación de formulario
    if(password != repass){
        alert('Las contraseñas no coinciden');
        event.preventDefault();
        return;
    }

    $.post({
        url: server + "/usuario/crear",
        data: {"nombre": name, "email": email, "password": password, "rol_id": rol_id},
        success: function(){
            alert('Usuario creado con exito');
            window.location.href = "index.html";
        },
        error: function(error){
            window.location.href = "error.html";
        }
    });
});


$('#login').click(function(event){
    event.preventDefault();
    var server = 'http://localhost:8080';
 
    var email = $('#emaillogin').val();
    var password = $('#passlogin').val();
    
    $.post({
        url: server + "/login",
        data: {"email": email, "password": password},
        success: function(infoUsuario){
            const rol = infoUsuario.rol_id;
            sessionStorage.setItem('usuarioActivo', infoUsuario.name);
            sessionStorage.setItem('rol', infoUsuario.rol_id);
            sessionStorage.setItem('id', infoUsuario.id);

            switch(rol){
                case 1:
                    showAlertSuccess();
                    window.location.href = "./administrar/index.html";
                    break;
                case 2:
                    showAlertSuccess();
                    window.location.href = "index.html";
                    break;
                default:
                    window.location.href = "login.html";
                    break;
            }
        },
        error: function(){
            event.preventDefault();
            showAlertError();
        }
    });
});

function showAlertSuccess(){
    $('#alert').empty();
    $('#alert').css({'position': 'absolute', 'top': '10px', 'right': '16px', 'font-size': '18px', 'z-index': '1'});
    $('#alert').append(`<div class="alert alert-success"><strong>Login exitoso</strong></div>`);
    $('#alert').show();
    $('#alert').fadeOut(5000);
}

function showAlertError(error){
    $('#alert').empty();
    $('#alert').css({'position': 'absolute', 'top': '10px', 'right': '16px', 'font-size': '18px', 'z-index': '1'});
    $('#alert').append(`<div class="alert alert-danger"><strong>Usuario o contraseña inválidos</strong></div>`);
    $('#alert').show();
    $('#alert').fadeOut(6000);
}