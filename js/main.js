var jsonNotificaciones;
var rutaViaje;
var directionsService
var directionsDisplay;
$(document).ready(function(){
    colocarNombre();
    Push.Permission.request(console.log("Notificaciones ON"), console.log("Notificaciones OFF"));
    $('.collapsible').collapsible();
    
    $('.button-collapse').sideNav();
    
    $('.tooltipped').tooltip({delay: 50});
    if($("select").length!=0)    
        $("select").material_select();

    if($(".dropdown-button").length!=0)
		$(".dropdown-button").dropdown({
			constrainWidth:false,
			belowOrigin:true
		});

    $("#iconselect").change(function(){
        cambiarLogo()
    });
	if($("div.modal").length!=0)
    	$("div.modal").modal();
    $(".btnLogout").click(function(){
        console.log("Cerrar sesion")
        localStorage.removeItem("numeroControl");
        window.location.href="index.html";
        return false;
    });
    $(".btnConfirmar").click(confirmarViaje);
    $(".btnRechazar").click(rechazarViaje);
    actualizarNotificaciones();
    $("#iconselect").change(function(){
            cambiarLogo()
        });
    if($('.timepicker').length!=0)
        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function(){} //Function for after opening timepicker
          });
});
    function cambiarLogo(){
        var carrera = document.getElementById("iconselect");
        var imagen = document.getElementById("carrera_actual");
    
        var dirImagen = $("#iconselect > option:selected").attr("data-icon");
        imagen.src=dirImagen        
    }
function actualizarNotificaciones(){
    var numeroControl = localStorage.getItem("numeroControl");
    $.ajax({
        url:"php/notificaciones.php",
        method:"post",
        data:{
            operacion:"N",
            numeroControl:numeroControl
        }
    }).done(function(data){
        var listaNotificaciones="";
        if(data!="NOK"){
            jsonNotificaciones = [];
            $(".badgeNotificaciones").attr("data-badge-caption","");
            $("#notificaciones").empty();
            $("#notificaciones2").empty();
            var notificaciones = JSON.parse(data);
            Materialize.toast("Tienes notificaciones sin leer!",2000,"rounded");
            var contador = 0;
            for(var i in notificaciones){
                var notif = notificaciones[i];
                jsonNotificaciones[i] = notif;
                var nombre = notif.nombreCompleto;
                var msj = notif.tipo=="s"?nombre+" ha solicitado viajar contigo":notif.tipo=="c"?nombre+" a confirmado tu viaje":nombre+" ha rechazado tu viaje";
                listaNotificaciones+="<li><a data-id='"+i+"' class='notificacion_"+notif.tipo+"'>"+msj+"</a></li>";
                contador++;
            }
            $(".badgeNotificaciones").attr("data-badge-caption",contador);
            $("#notificaciones").html(listaNotificaciones);
            $("#notificaciones2").html(listaNotificaciones);
            $(".dropdown-button").dropdown({
                constrainWidth:false,
                belowOrigin:true
            });
            $(".notificacion_s").click(function(data){
                var idNotificacion = $(this).attr("data-id");
                var notificacion = jsonNotificaciones[idNotificacion];
                console.log(notificacion)
                var nombre = notificacion.nombreCompleto;
                var idViaje = notificacion.idViaje;
                $("#solicitudViaje").attr("data-id",idNotificacion)
                $("#solicitudViaje").find("span.nombreUsuario").html(notificacion.nombreCompleto);
                $("#solicitudViaje").find("img.logoCarrera").attr("src","assets/logosCarreras/"+logoCarrera(notificacion.carrera));
                var pickup = document.getElementById("pickUp");
				var origen=null,waypts=[];
				$.ajax({
					url:"php/validar_viaje.php",
					method:"post",
					data:{
						operacion:"R",
						idViaje:idViaje
					}
				}).done(function(data){
					console.log(data);
					var datos = JSON.parse(data);
					for(var i in datos){
						var x = datos[i];
						origen = new google.maps.LatLng(x.origenLat,x.origenLng);
						waypts.push({
							location:new google.maps.LatLng(x.lat,x.lng),
							stopover:true
						});
					}
					var map = new google.maps.Map(pickup,{
						zoom:15,
						center:latlng
					});
					var marker = new google.maps.Marker({
						position:latlng,
						map:map,
						icon:"assets/img/pony_32.png"
					});
					var directionsService = new google.maps.DirectionsService;
                	var directionsDisplay = new google.maps.DirectionsRenderer({
                        draggable: false,
                        map: map
                    });
					displayRoute(origen, 'Instituto Tecnologico de Morelia', directionsService, directionsDisplay, waypts);
					map.setZoom(15);
					map.setCenter(latlng);
				});
                var lat = Number(notificacion.lat);
                var lng = Number(notificacion.lng);
                $("#solicitudViaje").modal("open");
                var latlng = new google.maps.LatLng(lat,lng);
                
				
                google.maps.event.trigger(map, "resize");
            });
            $(".notificacion_c").click(function(data){
                var idNotificacion = $(this).attr("data-id");
                var notificacion = jsonNotificaciones[idNotificacion];
                datosContacto(notificacion.idNotificacion);
            });
        }

    });
}
function confirmarViaje(){
    var id = $("#solicitudViaje").attr("data-id");
    var notif = jsonNotificaciones[id];
    var idNotificacion = notif.idNotificacion;
    $.ajax({
        url:"php/notificaciones.php",
        method:"post",
        data:{
            operacion:"V",
            idNotificacion:idNotificacion,
            tipo:"C",
            pasajero:notif.solicitante,
            idViaje:notif.idViaje,
            numeroControl:localStorage.getItem("numeroControl")
        }
    }).done(function(data){
        var respuesta=JSON.parse(data);
        console.log(data)
        if(respuesta.resp == "OK"){          //Todo bien
            var k = respuesta.asientos;
            if(parseInt(k)>0)
                Materialize.toast("Pasajero confirmado, quedan "+respuesta.asientos+" asientos libres en tu viaje",1500,"rounded");
            else
                Materialize.toast("Pasajero confirmado, el viaje está lleno",1500,"rounded");
            var text = $("a.notificacion_s[data-id='"+id+"']").html();
            var check = "<i class='material-icons left'>check</i>";
            $("a.notificacion_s[data-id='"+id+"']").css("pointer-events","none");
            $("a.notificacion_s[data-id='"+id+"']").html(check+text);
            var respuesta = {from:localStorage.getItem("numeroControl"),to:notif.solicitante,tipo:"C"};
            socket.emit("respuesta",respuesta);
        }else if(respuesta.resp=="NOK"){     //Viaje lleno
            Materialize.toast("No puedes aceptar más pasajeros para éste viaje",1500,"rounded");
            var check = "<i class='material-icons left'>block</i>";
            var text = $("a.notificacion_s[data-id='"+id+"']").html();
            $("a.notificacion_s[data-id='"+id+"']").css("pointer-events","none");
            $("a.notificacion_s[data-id='"+id+"']").html(check+text);
            var respuesta = {from:localStorage.getItem("numeroControl"),to:notif.solicitante,tipo:"B"};
            socket.emit("respuesta",respuesta);
        }
    });
    $("#solicitudViaje").modal("close");
        actualizarBadge();
    actualizarViaje();
    return false;
}
function rechazarViaje(){
    var id = $("#solicitudViaje").attr("data-id");
    var notif = jsonNotificaciones[id];
    var idNotificacion = notif.idNotificacion;
    $.ajax({
        url:"php/notificaciones.php",
        method:"post",
        data:{
            operacion:"V",
            idNotificacion:idNotificacion,
            tipo:"R",
            pasajero:notif.solicitante,
            idViaje:notif.idViaje,
            numeroControl:localStorage.getItem("numeroControl")
        }
    }).done(function(data){
        var respuesta=JSON.parse(data);
        console.log(data);
        var text = $("a.notificacion_s[data-id='"+id+"']").html();
        var check = "<i class='material-icons left'>cancel</i>";
        $("a.notificacion_s[data-id='"+id+"']").css("pointer-events","none");
        $("a.notificacion_s[data-id='"+id+"']").html(check+text);
        var respuesta = {from:localStorage.getItem("numeroControl"),to:notif.solicitante,tipo:"R"};
        socket.emit("respuesta",respuesta);
    });
    $("#solicitudViaje").modal("close");
    actualizarBadge();
    return false;
}
function actualizarBadge(){
    var contador =  parseInt($(".badgeNotificaciones").attr("data-badge-caption")) - 1;
    console.log(contador)
    $(".badgeNotificaciones").attr("data-badge-caption",contador);
}
function logoCarrera(sigla){
    switch(sigla){
        case "ISC":
            return "ISC.png";
        case "INFO":
            return "info.png";
        case "IMAT":
            return "imat.jpeg";
        case "ITICS":
            return "itics.png";
        case "IBQ":
            return "ibq.png";
        case "IE":
            return "electrica.png";
        case "IEA":
            return "electronica.png";
        case "IGE":
            return "ige.jpeg";
        case "IMEC":
            return "mecanica.png";
        case "II":
            return "industrial.png";
        case "IMT":
            return "imt.png";
        case "ADMI":
            return "admi.jpg";
        default:
            return "pony.png";
    }
}
function validarLogin(pag){
    if(localStorage.getItem("numeroControl")==null){    //No hay sesion
    if(pag=="login")    //No hay sesion y ocupas login
            window.location="index.html";
    }else{          //Hay sesion
        if(pag=="nologin")    //Hay sesion y ocupas no-login
            window.location="buscar_viaje.html";
    }
}

function colocarNombre(){
    var nombre = localStorage.getItem("nombreUsuario");
    $("#opciones > li > a > span.nombreUsuario").html(nombre);
    $("#menu-lateral > li > div > div >span.name").html(nombre);
    $(".dropdown-button").dropdown({
        constrainWidth:false,
        belowOrigin:true
    });
}
function datosContacto(idNot){
    var numeroControl = localStorage.getItem("numeroControl");
    $.ajax({
        url:"php/notificaciones.php",
        method:"post",
        data:{
            idNotificacion:idNot,
            numeroControl:numeroControl,
            operacion:"D"
        }
    }).done(function(data){
        console.log(data);
        var datos = JSON.parse(data);
        colocarDatosContacto(datos);
    });
}
function colocarDatosContacto(datos){
    var puntosRuta=[],datosContacto,origen=null,encuentro;
    for (var i in datos){
        var x = datos[i];
        if(i=="0"){
            datosContacto = {nombreUsuario:x.nombreCompleto,carrera:x.carrera,telefono:x.telefono,salida:x.salida};
        }else{
            if(x.encuentro=="encuentro")
                encuentro = new google.maps.LatLng(x.lat,x.lng);
            else{
                puntosRuta.push({
                    location:new google.maps.LatLng(x.lat,x.lng),
                    stopover:true
                });
                origen = new google.maps.LatLng(x.origenLat,x.origenLng);
            }
        }
    }
    mostrarRuta(origen,puntosRuta,encuentro);    
    $("#datosContacto").find("span.nombreUsuario").html(datosContacto.nombreUsuario);
    $("#datosContacto").find("span.numerotel").html(datosContacto.telefono);
    $("#datosContacto").find("span.salida").html(datosContacto.salida);
    $("#datosContacto").modal("open");
    google.maps.event.trigger(rutaViaje, "resize");
}
function mostrarRuta(origen,puntosRuta,encuentro){
    rutaViaje = new google.maps.Map(document.getElementById("rutaViaje"),{
        zoom:11
    });
    var marcaEncuentro = new google.maps.Marker({
        position:encuentro,
        map:rutaViaje,
        draggable:false,
        icon:"assets/img/pony_32.png"
    });
    getPosition();
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: false,
        map: rutaViaje
    });
    displayRoute(origen, 'Instituto Tecnologico de Morelia', directionsService, directionsDisplay, puntosRuta,encuentro);
}
function getPosition(){
    navigator.geolocation.getCurrentPosition(function(data){
        var posicion = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        rutaViaje.setCenter({lat:parseFloat(data.coords.latitude),lng:parseFloat(data.coords.longitude)});
    });
}
function displayRoute(origin, destination, service, display, waypts,centro) {
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
        rutaViaje.setCenter(centro)
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}
function fav1(){
    $("#estrella1").html("star");
    $("#estrella2").html("star_border");
    $("#estrella3").html("star_border");
}
function fav2(){
    $("#estrella1").html("star_border");
    $("#estrella2").html("star");
    $("#estrella3").html("star_border");
}
function fav3(){
    $("#estrella1").html("star_border");
    $("#estrella2").html("star_border");
    $("#estrella3").html("star");
}
