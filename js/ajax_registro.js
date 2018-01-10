$(document).ready(function(evt){
    var f = 0;
    $("#form-registroUsuario").submit(function(evt){
        var nombreCompleto = $(this).find("input[name='nombreCompleto']").val();
        var carrera = $(this).find("select[name='carrera'] option:selected").text();
        var numeroControl = $(this).find("input[name='numeroControl']").val();
        var telefono = $(this).find("input[name='telefono']").val();
        var password = $(this).find("input[name='password']").val();

        $.ajax({
            url:"php/registrar_usuario.php",
            type:"POST",
            data:{
                nombreCompleto:nombreCompleto,
                carrera:carrera,
                numeroControl:numeroControl,
                telefono:telefono,
                password:password
            }
        }).done(function(respuesta){
            console.log(respuesta)
            if(respuesta=="OK"){
                Materialize.toast("El usuario se registró con éxito!",2000,"rounded");
                if(f==1){
                    sessionStorage.setItem('numeroControl', numeroControl);
                    window.location.href="RegistroAuto.html";
                }
                document.getElementById("form-registroUsuario").reset();
                f=0;
            }
            else if(respuesta=="NC"){
                Materialize.toast("Error! El número de control especificado ya se registró",2000,"rounded");
                $("#form-registroUsuario").find("input[name='numeroControl']").val("");
                $("#form-registroUsuario").find("input[name='numeroControl']").focus();
            }
        });
        return false;
    });
    
   $("#btnRegistroAuto").click(function(evt){
       f=1;
       $("#form-registroUsuario").isValid();
   });
});
