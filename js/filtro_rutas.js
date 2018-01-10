$(document).ready(function(){
	$.ajax({
		url:"php/filtro_rutas.php",
		method:"post",
		data:{
			numeroControl:localStorage.getItem("numeroControl")
		}
	}).done(function(data){
		console.log(data);
		if(data=="NOK"){
			Materialize.toast("No puedes publicar viajes si no tienes rutas creadas",2000,"rounded");
			setTimeout(function(){
				window.location="ingresar_ruta.html"
			},2000);
		}
	});
});