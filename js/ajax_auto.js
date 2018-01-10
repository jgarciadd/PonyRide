$(document).ready(function(evt){
    $("#form-registroAuto").submit(function(evt){
        var numeroControl = sessionStorage.getItem('numeroControl');
        var marca = $(this).find("input[name='marca']").val();
        var modelo = $(this).find("input[name='modelo']").val();
        var placas = $(this).find("input[name='placas']").val();
        var color = $(this).find("input[name='color']").val();
        var num = $(this).find("input[name='num']").val();

        $.ajax({
            url:"php/registrar_auto.php",
            type:"POST",
            data:{
                numeroControl:numeroControl,
                marca:marca,
                modelo:modelo,
                placas:placas,
                color:color,
                num:num
            }
        }).done(function(respuesta){
            console.log(respuesta)
            if(respuesta=="OK"){
                Materialize.toast("El auto se registró con éxito!",2000,"rounded");
                location.href="registro_Usuario.html";
            }
            else if(respuesta=="NC"){
                Materialize.toast("Error! El número de control especificado no existe",2000,"rounded");
            }
        });
        return false;
    });
});
