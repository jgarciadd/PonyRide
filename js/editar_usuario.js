$(document).ready(function(evt){
    var f = 0;
    $("#form-editarUsuario").submit(function(evt){
        var nombreCompleto = $(this).find("input[name='nombreCompleto']").val();
        var carrera = $(this).find("select[name='carrera'] option:selected").text();
        var telefono = $(this).find("input[name='telefono']").val();
        var password = $(this).find("input[name='password']").val();
        var numeroControl = localStorage.getItem("numeroControl");
        $.ajax({
            url:"php/editar_usuario.php",
            type:"POST",
            data:{
                numeroControl:numeroControl,
                nombreCompleto:nombreCompleto,
                carrera:carrera,
                telefono:telefono,
                password:password
            }
        }).done(function(respuesta){
            console.log(respuesta)
            if(respuesta=="OK"){
                Materialize.toast("El usuario se actualizo con éxito!",2000,"rounded");
            }
            else if(respuesta=="NE"){
                Materialize.toast("Error! El número de control especificado na se actualizó",2000,"rounded");
            }
        });
        return false;
    });
});