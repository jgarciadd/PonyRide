var map;
var pag=1;
var auto=1;
var j;
$(document).ready(function(){
    mapas = document.getElementById('viajes');
    datos = document.getElementById('datos');
    $.ajax({
            url:"php/select_autos.php",
            type:"POST",
            data:{
                numeroControl: localStorage.getItem("numeroControl")
            }
        }).done(function(respuesta){
            console.log(respuesta);
            var notificaciones = JSON.parse(respuesta);
            tabs = "";
            for(var i in notificaciones){
                var notif = notificaciones[i];
                j= parseInt(i)+1
                tabs += '<div id="auto'+j+'" class="col s12" style="display: none">';
                tabs += "<br>Numero de Control: "+notif.numeroControl;   
                tabs += "<br>Placas: "+notif.placas;
                tabs += "<br>Modelo: "+notif.marca+" "+notif.modelo;   
                tabs += "<br>Color: "+notif.color;   
                tabs += "<br>Asientos: "+notif.asientos;   
                tabs += '</div>';
                sessionStorage.setItem("auto"+j, notif.idAuto);
                if(notificaciones.length==j){
                    datos.innerHTML = tabs;
                    notif = notificaciones[0];
                    document.getElementById('auto'+auto).style.display = "inline";
                    document.getElementById('antauto').style.visibility = "hidden";
                    if(j==1)
                        document.getElementById('sigauto').style.visibility = "hidden";
                }
            }
        });
    
     $.ajax({
            url:"php/select_ruta_nc.php",
            type:"POST",
            data:{
                numeroControl: localStorage.getItem("numeroControl")
            }
        }).done(function(respuesta){
            console.log(respuesta);
            var notificaciones = JSON.parse(respuesta);
            tabs = "";
            for(var i in notificaciones){
                var notif = notificaciones[i];
                j= parseInt(i)+1
                tabs += '<div id="ruta'+j+'" class="col s12" style="display: none">';
                tabs += "<br>Numero de Control: "+notif.numeroControl;             
                tabs += '</div>';
                sessionStorage.setItem("ruta"+j, notif.idRuta);
                if(notificaciones.length==j){
                    mapas.innerHTML = tabs;
                    notif = notificaciones[0];
                    dibujar(notif.idRuta);
                    document.getElementById('ruta'+pag).style.display = "inline";
                    document.getElementById('ant').style.visibility = "hidden";
                    if(j==1)
                        document.getElementById('sig').style.visibility = "hidden";
                }
            }
        });
    $("#sigauto").click(function(){
        document.getElementById('antauto').style.visibility = "visible";
        document.getElementById('auto'+auto).style.display = "none";
        document.getElementById('auto'+(parseInt(auto)+1)).style.display = "inline";
        auto = auto+1;
        if (auto>j-1)
            document.getElementById('sigauto').style.visibility = "hidden";
        return false;
    })
    $("#antauto").click(function(){
        document.getElementById('sigauto').style.visibility = "visible";
        document.getElementById('auto'+auto).style.display = "none";
        document.getElementById('auto'+(parseInt(auto)-1)).style.display = "inline";
        auto = auto-1;
        if (auto<2)
            document.getElementById('antauto').style.visibility = "hidden";
        return false;
    })
    $("#sig").click(function(){
        document.getElementById('ant').style.visibility = "visible";
        document.getElementById('ruta'+pag).style.display = "none";
        document.getElementById('ruta'+(parseInt(pag)+1)).style.display = "inline";
        dibujar(sessionStorage.getItem('ruta'+(parseInt(pag)+1)));
        pag = pag+1;
        if (pag>j-1)
            document.getElementById('sig').style.visibility = "hidden";
        return false;
    })
    $("#ant").click(function(){
        document.getElementById('sig').style.visibility = "visible";
        document.getElementById('ruta'+pag).style.display = "none";
        document.getElementById('ruta'+(parseInt(pag)-1)).style.display = "inline";
        dibujar(sessionStorage.getItem('ruta'+(parseInt(pag)-1)));
        pag = pag-1;
        if (pag<2)
            document.getElementById('ant').style.visibility = "hidden";
        return false;
    })
    $("#publicar").click(function(){
        salida = document.getElementById('salida').value;
        $.ajax({
            url:"php/insert_viaje.php",
            type:"POST",
            data:{
                numeroControl: localStorage.getItem("numeroControl"),
                idRuta: sessionStorage.getItem("ruta"+parseInt(pag)),
                idAuto: sessionStorage.getItem("auto"+parseInt(auto)),
                salida: salida,
                asientos: 4
            }
        }).done(function(respuesta){
            console.log(respuesta);
            Materialize.toast("El viaje se registró con éxito!",2000,"rounded");
            window.location.href="buscar_viaje.html";
        });
    })
});

function dibujar(idRuta){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 19.722, lng: -101.185}  
    });
    $.ajax({
            url:"php/select_ruta.php",
            type:"POST",
            data:{
                idRuta: idRuta
            }
        }).done(function(respuesta){
            var notificaciones = JSON.parse(respuesta);
            var notif = notificaciones[0];
            var or = {lat: parseFloat(notif.origenLat), lng: parseFloat(notif.origenLng)};
            $.ajax({
                url:"php/select_puntosruta.php",
                type:"POST",
                data:{
                    idRuta: idRuta
                }
            }).done(function(respuesta){
                var notificaciones = JSON.parse(respuesta);
                var waypts=[];
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        map: map
                    });
                for(var i in notificaciones){
                    var notif = notificaciones[i];
                    waypts.push({
                        location: {lat: parseFloat(notif.lat), lng: parseFloat(notif.lng)},
                        stopover: true
                      });
                }
                displayRoute(or, 'Instituto Tecnologico de Morelia', directionsService, directionsDisplay, waypts);
            });
        });
}

function displayRoute(origin, destination, service, display, waypts) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    waypoints: waypts, //puntos por los que hay que pasar
    optimizeWaypoints: true,
    avoidTolls: true
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}
