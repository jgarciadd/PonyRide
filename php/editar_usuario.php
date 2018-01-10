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
            if($res->num_rows!=0){//Existe el numero de control
                $q_act = "UPDATE ponyride.usuario SET nombreCompleto='$nombreCompleto', carrera='$carrera', telefono='$telefono', password=SHA1('$password') WHERE numeroControl='$numeroControl'";   
                $actualizar = $conexion->query($q_act);
                if($actualizar){
                    echo "OK";
                }
                else
                    echo "Error al registrar ".$conexion->error;
            }
            else{
                //Numero de control NO ha sido registrado
                echo "NE";
            }
        }
        else{
            die ("Error en la base de datos ".$conexion->error);
        }

?>