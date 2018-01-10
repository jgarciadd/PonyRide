<?php
    
$file_path = "usuarios/";
    if(isset($_FILES["archivo"])){

        $response = null;
        for($x = 0; $x < count($_FILES["archivo"]["name"]); $x++)
        {
            $file = $_FILES["archivo"];
            $nombre = $file["name"][$x];
           
            //Buscar donde este el punto
            $tipo = $file["type"][$x];
            $ruta_temp = $file["tmp_name"][$x];
            $size = $file["size"][$x];
            $dimensiones = getimagesize($ruta_temp);
            $width  = $dimensiones[0];
            $height = $dimensiones[1];
            $carpeta = "usuarios/";
        

        if($tipo != "image/jpeg" && $tipo != "image/jpg" && $tipo != "image/JPEG" && $tipo != "image/JPG" &&  $tipo != "image/png" && $tipo != "image/PNG"){
            //unlink( $carpeta . $nombre . $tipo);
            $response["nombre_archivo"] = "extension";

        }else{
            $src = $carpeta.$nombre;
            move_uploaded_file($ruta_temp, $src);
            $response["nombre_archivo"] = $nombre;
        }
    }


    }else{
        $response["nombre_archivo"] = "error";
    }

    echo json_encode($response);
    //echo ('$src');


    /*$q = "UPDATE usuario 
        SET imagen = '$src'
        WHERE numeroControl = $numeroControl";

       // $q = "UPDATE usuario SET imagen = '$src' WHERE numeroControl = '14121400'";

 if($conn-> query($q)){
     echo "Cambios guardados";
 }
else{
 echo "Error al insertar" . $conn->error;
 }*/



//ALTER TABLE `usuario` ADD `imagen` VARCHAR(25) NULL AFTER `password`;
?>