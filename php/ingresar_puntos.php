<?php
    require("acceso_bd.php");
    //Seleccionar una bd
    //Extraer los parametros que recibimos desde JS. numeroControl, nombreCompleto, etc...
    extract($_POST);
    //Verificar que en Numero de control no este registrado
    //Consulta
    $q_registro = "INSERT INTO puntosruta VALUES (null, $idRuta, $lat, $lng)";
    echo $q_registro;
    $insercion = $conexion->query($q_registro);
    if($insercion){
        echo "OK";
    }
    else
        echo "Error al registrar ".$conexion->error;

?>
