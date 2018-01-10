$(document).ready(function(evt){
    $("#form-login").submit(function(evt){
        var numeroControl = $(this).find("input[name='numeroControl']").val();
        var password = $(this).find("input[name='password']").val();

        $.ajax({
            url:"php/login.php",
            type:"POST",
            data:{
                numeroControl:numeroControl,
                password:password
            }
        }).done(function(respuesta){
            console.log(respuesta)
            var datos = JSON.parse(respuesta);
            if(datos[0].estado=="NC"){
                Materialize.toast("Error! Contraseña o usuario incorrecto",2000,"rounded");
                $("#form-registroUsuario").find("input[name='numeroControl']").val("");
                $("#form-registroUsuario").find("input[name='password']").val("");
                $("#form-registroUsuario").find("input[name='numeroControl']").focus();
            }else if(datos[1].estado=="OK"){
                Materialize.toast("Inicio de session con éxito!",2000,"rounded");
                localStorage.setItem('numeroControl', numeroControl);
                localStorage.setItem('nombreUsuario', datos[0].nombreCompleto);
                localStorage.setItem('estado', "OK");
                //$("html").load("buscar_viaje.html")
                window.location="buscar_viaje.html";
            }
            else if(datos[1].estado=="A"){
                var datos = JSON.parse(respuesta);
                Materialize.toast("Inicio de session con éxito!",2000,"rounded");
                localStorage.setItem('numeroControl', numeroControl);
                localStorage.setItem('nombreUsuario', datos[0].nombreCompleto);
                localStorage.setItem('estado', "A");
                window.location="publicar_viaje.html";
            }
        });
        return false;
    });
    
});
