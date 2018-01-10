<?php
    require("acceso_bd.php");
    extract($_POST);
        $q = "Select * from usuario WHERE numeroControl='$numeroControl'"; 
        //Ejecutar la consulta
        $res = $conexion->query($q);
        //Si no hubo ningún error
        if($res){
            $row=mysqli_fetch_array($res,MYSQLI_NUM);
            echo $row[1];
        }
        else{
            die ("Error en la base de datos ".$conexion->error);
        }

?>