
var auto=1;
var j;
$(document).ready(function(){
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
});