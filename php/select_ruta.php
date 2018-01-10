<?php
    require("acceso_bd.php");
    extract($_POST);
        $q = "Select * from ruta where idRuta=$idRuta"; 
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