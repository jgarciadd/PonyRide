$(document).ready(function(evt){
        $.ajax({
            url:"php/select_usuario_datos.php",
            type:"POST",
            data:{
                numeroControl:localStorage.getItem("numeroControl")
            }
        }).done(function(respuesta){
            console.log(respuesta)
            var notificaciones = JSON.parse(respuesta);
            var notif = notificaciones[0];
            $("#iconselect > option[value='"+notif.carrera+"']").attr("selected","selected");
            $("select").material_select();
            document.getElementById('nombre').value = notif.nombreCompleto;
            document.getElementById('telefono').value = notif.telefono;
            document.getElementById('carrera_actual').src = 'assets/logosCarreras/'+logoCarrera(notif.carrera);
        });
        return false;
    
});
