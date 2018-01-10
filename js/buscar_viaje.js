var jsonViaje;
var marcadorEncuentro;
function cancelar(){
    var $toastContent = $('<span>¿Seguro de cancelar tu vaje?</span>').add($('<button class="btn-flat toast-action">Aceptar</button>').add($('<button class="btn-flat toast-action">Cancelar</button>')));
    Materialize.toast($toastContent, 5000);
}
$(document).ready(function(){
    $("#btnDefinirPunto").click(function(){
        var lat = marcadorEncuentro.position.lat(),lng = marcadorEncuentro.position.lng();
        jsonViaje.lat = lat;
        jsonViaje.lng = lng;
        console.log("S=>"+lat+","+lng)
        socket.emit("solicitud",jsonViaje);
        map.setZoom(16);
        map.setCenter({lat: lat, lng: lng});
        $.ajax({
            url:"php/select_viaje.php",
            type:"POST",
            data:{
                idViaje: sessionStorage.getItem('viaje'+parseInt(pag))
            }
        }).done(function(respuesta){
            console.log(respuesta)
            var notificaciones = JSON.parse(respuesta);
            var notif = notificaciones[0];
            document.getElementById('asientos').innerHTML = notif.asientos;
            document.getElementById('partida').innerHTML = notif.salida;
            $.ajax({
                url:"php/select_usuario.php",
                type:"POST",
                data:{
                    numeroControl: notif.numeroControl
                }
            }).done(function(respuesta){
                document.getElementById('conductor').innerHTML = respuesta;
            });
        });
        document.getElementById('pagina2').style.display = "none";
        document.getElementById('pagina3').style.display = "inline";
        return false;
    });
})
function mostrarMapaEncuentro(lat,lng){
    console.log(lat+","+lng);
    var latlng = new google.maps.LatLng(lat,lng);
    map.setCenter(latlng);
    google.maps.event.trigger(map, "resize");
    marcadorEncuentro = new google.maps.Marker({
        position:latlng,
        map:map,
        draggable:true,
        icon:"assets/img/pony_32.png"
    });
}

function getPosition(){
    navigator.geolocation.getCurrentPosition(function(data){
        var posicion = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        mostrarMapaEncuentro(parseFloat(data.coords.latitude),parseFloat(data.coords.longitude));
    });
}

// AIzaSyDHVhgGJi-wqzO10nBETUJDO-IH2K-0dkU  api key google maps
