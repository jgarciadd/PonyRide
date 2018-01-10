var mapaViaje;
var directionsService2;
var directionsDisplay2;
var infoWindows;
var markers;
$(document).ready(function(){
    actualizarViaje();
});
function actualizarViaje(){
    $.ajax({
        url:"php/validar_viaje.php",
        method:"post",
        data:{
            operacion:"V",
            numeroControl:localStorage.getItem("numeroControl")
        }
    }).done(function(data){
        console.log(data);
        if(data!="NV"){     //Hay un viaje, dibujar ruta,etc   
            $("#mapaViaje").css("width","100%");
            $("#mapaViaje").css("height","400px");
            $("div.container-login").hide();
            
            var datos=JSON.parse(data),datosViaje,puntosRuta=[],datosContacto,origen=null,encuentro=[],pasajeros=[];
            for (var i in datos){
                var x = datos[i];
                if(i=="0"){
                    datosContacto = {nombreUsuario:x.nombreCompleto,carrera:x.carrera,telefono:x.telefono,salida:x.salida};
                }else{
                    if(x.confirmado=="1")
                        encuentro.push({latlng:new google.maps.LatLng(x.lat,x.lng),nombre:x.nombreCompleto});
                    else if(x.telefono!=null)
                        pasajeros.push(x);
                    else{
                        origen = new google.maps.LatLng(x.origenLat,x.origenLng);
                        puntosRuta.push({
                            location:new google.maps.LatLng(x.lat,x.lng),
                            stopover:true
                        });
                    }
                }
            }
            mostrarViaje(origen,puntosRuta,encuentro);
            mostrarPasajeros(pasajeros);
         }
    });
}
function mostrarViaje(origen,puntosRuta,encuentro){
    mapaViaje = new google.maps.Map(document.getElementById("mapaViaje"),{
        zoom:13
    });
    var k=0;
    for(var i in encuentro){
		
    	infoWindows=[];
		markers=[];
        var mark = new google.maps.Marker({
            position:encuentro[i].latlng,
            map:mapaViaje,
            draggable:false,
            icon:"assets/img/pony_32.png"
        });
        var infoWindow = new google.maps.InfoWindow({
            content:encuentro[i].nombre
        })
        
        mark.addListener('click', function() {
            infoWindow.open(mapaViaje, mark);
          });
		infoWindows.push(infoWindow);
		markers.push(mark);
    }
    directionsService2 = new google.maps.DirectionsService;
    directionsDisplay2 = new google.maps.DirectionsRenderer({
        draggable: false,
        map: mapaViaje
    });
google.maps.event.trigger(mapaViaje, "resize");
    displayViaje(origen, 'Instituto Tecnologico de Morelia', directionsService2, directionsDisplay2, puntosRuta);
}
function displayViaje(origin, destination, service, display, waypts) {
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
        mapaViaje.setZoom(13);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
google.maps.event.trigger(mapaViaje, "resize");
}
function mostrarPasajeros(pasajeros){
    var lista = "";
    for(var i in pasajeros){
        var x = pasajeros[i];
        lista+="<li class='collection-item avatar'>";
        lista+="<img src='assets/img/user.png' class='circle'>";
        lista+="<p>"+x.nombreCompleto+"<br>"+x.telefono+"</p></li>";
    }
    $("ul#pasajeros").empty();
    $("ul#pasajeros").html(lista);
}
