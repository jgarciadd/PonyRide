<?php
    require("acceso_bd.php");
    //Seleccionar una bd
    //Extraer los parametros que recibimos desde JS. numeroControl, nombreCompleto, etc...
    extract($_POST);
    //Verificar que en Numero de control este registrado
        //Consulta
        $q = "SELECT * FROM usuario WHERE numeroControl = '$numeroControl' and password= SHA1('$password')";
        //Ejecutar la consulta
        $res = $conexion->query($q);
        $respuesta = array();
        if($res){//Si no hubo ningún error
            if($res->num_rows==0){//No existe el numero de control
                array_push($respuesta,array("estado"=>"NC"));
                echo json_encode($respuesta);
            }else{             
                array_push($respuesta,$res->fetch_assoc());
                $q2 = "SELECT idAuto FROM auto WHERE numeroControl = '$numeroControl'";
                $res2 = $conexion->query($q2);
                if($res2->num_rows>0){
                    array_push($respuesta,array("estado"=>"A"));//Regresar una A si tiene auto para redireccionar a publicar
                    echo json_encode($respuesta);
                }
                else{
                    array_push($respuesta,array("estado"=>"OK"));//Regresar un OK si no tiene auto para redireccionar a buscar
                    echo json_encode($respuesta);
                }
            }
        }
        else{
            die ("Error en la base de datos ".$conexion->error);
        }

?>
