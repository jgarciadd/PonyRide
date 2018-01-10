<?php
    require("acceso_bd.php");
    //Seleccionar una bd
    //Extraer los parametros que recibimos desde JS. numeroControl, nombreCompleto, etc...
    extract($_POST);
    //Verificar que en Numero de control no este registrado
    //Consulta
    $q_registro = "INSERT INTO ruta VALUES (null,'$origenLat','$origenLng','$numeroControl')";
    $insercion = $conexion->query($q_registro);
    if($insercion){
        $q = "Select idRuta from ruta order by idRuta desc limit 1";
        //Ejecutar la consulta
        $res = $conexion->query($q);
        //Si no hubo ningún error
        if($res){
            $idRuta = $res->fetch_assoc();
            echo $idRuta['idRuta'];
        }
        else{
            die ("Error en la base de datos ".$conexion->error);
        }
    }
    else
        echo "Error al registrar ".$conexion->error;

?>
