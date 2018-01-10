var map;
var directionsService;
var directionsDisplay;
var pos;
var waypts=[];

function initMap() {
    //Crear el mapa en el div de map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 19.722, lng: -101.185}  
    });
    //variable para modificar la ventana del mapa 
    var infoWindow = new google.maps.InfoWindow({map: map});
    //obtener geolocalizacion
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //ubicar punto y etiqueta de tu ubicacion y centrar el mapa en tu posicion
            infoWindow.setPosition(pos);
            //infoWindow.setContent('Tu estas aqui.');
            map.setCenter(pos);
            
            //varibles para llamar las direcciones y la ruta
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: false,
                map: map
            });
            
            //creacion de la ruta de patzcuaro al tecnologico
            displayRoute(map.getCenter(), 'Instituto Tecnologico de Morelia', directionsService, directionsDisplay, waypts);
            /*Para ruta de ubicacion al tecnologico: 
            displayRoute(map.getCenter(), 'Instituto Tecnologico de Morelia', directionsService, directionsDisplay);*/
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        
        
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    
    map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
    });
}

function placeMarkerAndPanTo(latLng, map) {
    waypts.push({
        location: latLng,
        stopover: true
      });
      displayRoute(pos, 'Instituto Tecnologico de Morelia', directionsService, directionsDisplay, waypts);
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
}

$(document).ready(function(evt){
    $("#form-ingresarruta").submit(function(evt){
        var numeroControl = localStorage.getItem("numeroControl");
        $.ajax({
            url:"php/ingresar_ruta.php",
            type:"POST",
            data:{
                origenLat:pos.lat,
                origenLng:pos.lng,
                numeroControl: numeroControl                
            }
        }).done(function(respuesta){ 
            console.log(respuesta)
            for(var i=0; i<waypts.length; i++){
                $.ajax({
                    url:"php/ingresar_puntos.php",
                    type:"POST",
                    data:{
                        idRuta: respuesta,
                        lat: waypts[i].location.lat(),
                        lng: waypts[i].location.lng()
                    }
                }).done(function(respuesta){   
                    console.log(respuesta);
                });
            }
            Materialize.toast("La ruta se registró con éxito!",2000,"rounded");
            location.href="buscar_viaje.html";
        });
        return false;
    });
});
