$(function (){
    
        $("#cambiarF").click(function(){
         // var numeroControl = localStorage.getItem('numeroControl');
           // alert(numeroControl);
            var formData = new FormData(document.forms.namedItem("form_foto"));
            $.ajax({
                url: "subir_archivo_foto.php",
                type: "POST",
                async: true,
                data:formData,
                success: function(data){
    
                    if(data.nombre_archivo == "error"){
    
                        alert("Error al cargar fotografía");
                    }
                    else{
                        if(data.nombre_archivo == "extension"){
                            alert("Extensión invalida");
                        }
                        else{
                            alert(data.nombre_archivo);
                            var numeroControl = localStorage.getItem('numeroControl');
                            alert(numeroControl);
                            $.ajax({
                                url:"php/insert_foto.php",
                                type:"POST",
                                data:{
                                    numeroControl: localStorage.getItem("numeroControl"),
                                    ruta: data.nombre_archivo
                                }
                            }).done(function(respuesta){
                                console.log(respuesta);
                            });
                        }
                    }
                },error: function(){
                    alert("Error al cargar fotografía");
                },
                contentType: false,
                processData: false,
                timeout: 20000,
                dataType: "json"
            });
        });

    });