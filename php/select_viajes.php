<?php
    require("acceso_bd.php");
    extract($_POST);
        $q = "Select * from viaje WHERE salida > now() AND idViaje NOT IN (SELECT idViaje FROM notificaciones WHERE visto=0 AND tipo='s' AND solicitante=$numeroControl) AND numeroControl!=$numeroControl"; //where salida>now()
        //Ejecutar la consulta
        $res = $conexion->query($q);
        //Si no hubo ningún error
        $lista = array();
        if($res){
            while($row = $res->fetch_array(MYSQLI_ASSOC))
                array_push($lista,$row);
            echo json_encode($lista);
        }
        else{
            die ("Error en la base de datos ".$conexion->error);
        }

?>