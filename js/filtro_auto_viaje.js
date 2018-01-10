$(document).ready(function(){
	$.ajax({
		url:"php/filtro_auto_viaje.php",
		method:"post",
		data:{
			numeroControl:localStorage.getItem("numeroControl")
		}
	}).done(function(data){
		console.log(data);
		if(data!="OK"){
			Materialize.toast("No puedes registrar rutas si no tienes auto",2000,"rounded");
			setTimeout(function(){
				window.location="AdminAuto.html";
			},2100);
		}
	});
});