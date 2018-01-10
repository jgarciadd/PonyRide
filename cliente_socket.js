var socket = io.connect(location.host+":3000",{'forceNew':true});
Push.config({ serviceWorker: '/node_modules/push.js/bin/serviceWorker.min.js'});
socket.on("solicitud",function(data){
    var numeroControl = localStorage.getItem('numeroControl');
    if(numeroControl==data.to){
        console.log("Mensaje recibido")
        if(Push.Permission.has()){
            Push.create("Solicitud de viaje nueva",{
                icon:"assets/img/pony.png",
                data:"asdf"
            })
        }else
            alert("Solicitud entrante")
        actualizarNotificaciones();
    }
});
socket.on("respuesta",function(data){
    var numeroControl = localStorage.getItem('numeroControl');
    if(numeroControl==data.to){
        console.log("Mensaje recibido");
        console.log(data);
        if(data.tipo="C"){
            if(Push.Permission.has()){
                Push.create("¡Tu viaje ha sido confirmado!",{
                    icon:"assets/img/pony.png",
                    data:"asdf"
                })
            }else
                alert("Viaje confirmado");
        }
        else if(data.tipo="R"){
            if(Push.Permission.has()){
                Push.create("¡Tu viaje ha sido rechazado!",{
                    icon:"assets/img/pony.png",
                    data:"asdf"
                })
            }else
                alert("Viaje rechazado");
        }
        else if(data.tipo="B"){
            if(Push.Permission.has()){
                Push.create("¡Tu viaje ha sido cancelado!",{
                    icon:"assets/img/pony.png",
                    data:"asdf"
                })
            }else
                alert("Viaje cancelado");
        }
        actualizarNotificaciones();
    }
});
