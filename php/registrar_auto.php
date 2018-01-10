<?php
    require("acceso_bd.php");
    //Seleccionar una bd
    //Extraer los parametros que recibimos desde JS. numeroControl, nombreCompleto, etc...
    extract($_POST);
    //Verificar que en Numero de control no este registrado
        //Consulta
        $q = "SELECT numeroControl FROM usuario WHERE numeroControl = ".$numeroControl;
        //Ejecutar la consulta
        $res = $conexion->query($q);
        //Si no hubo ningún error
        if($res){
            if($res->num_rows!=0){//No existe el numero de control
                $q_registro = "INSERT INTO auto VALUES (null, '$numeroControl','$marca','$modelo','$placas','$color', $num)";
                $insercion = $conexion->query($q_registro);
                if($insercion){
                    echo "OK";
                }
                else
                    echo "Error al registrar ".$conexion->error;
            }
            else{
                //Numero de control ya registrado
                echo "NC";
            }
        }
        else{
            die ("Error en la base de datos ".$conexion->error);
        }

?>
