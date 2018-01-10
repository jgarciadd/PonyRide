<?php
	require("acceso_bd.php");
	extract($_POST);

	switch($operacion){
        case 'N':   //Mostrar notificaciones
            $q = "SELECT idNotificacion,idViaje,hora,tipo,nombreCompleto,lat,lng,carrera,solicitante FROM notificaciones n LEFT JOIN usuario u ON u.numeroControl=n.solicitante LEFT JOIN encuentro e USING (idNotificacion) WHERE n.numeroControl=$numeroControl AND visto=0 ORDER BY hora DESC";
            $res = $conexion->query($q);
            $lista = array();
            if($res){
                if($res->num_rows >= 1){
                    while($row = $res->fetch_array(MYSQLI_ASSOC))
                        array_push($lista,$row);
                    echo json_encode($lista);
                }else{
                    echo "NOK";
                }
            }
            else
                echo $conexion->error;
        break;
        case 'V':   //Marcar como vista: confirmar o rechazar viaje
            if($tipo=="C"){ //Confirmar viaje
                $qDisp = "SELECT asientos FROM notificaciones INNER JOIN viaje USING(idViaje) WHERE idNotificacion = $idNotificacion";
                $res = $conexion->query($qDisp);
                if($row = $res->fetch_array(MYSQLI_ASSOC)){
                    $k = intval($row["asientos"]);
                    if($k>0){     //Asientos disponibles
                        $qVisto = "UPDATE notificaciones SET visto=1 WHERE idNotificacion=$idNotificacion";
                        #echo $qVisto;
                        $res = $conexion->query($qVisto);
                        $qAsientos = "UPDATE viaje SET asientos = asientos-1 WHERE idViaje = $idViaje";
                        #echo "\n";
                        #echo $qAsientos;
                        $res = $conexion->query($qAsientos);
                        $qPasajero = "INSERT INTO pasajeros VALUES ($idViaje,$pasajero)";
                        $res = $conexion->query($qPasajero);
                        #echo "\n";
                        #echo $qPasajero;
                        $qNotificacion = "INSERT INTO notificaciones VALUES(null,$pasajero,$numeroControl,$idViaje,curtime(),'c',0)";
                        $res = $conexion->query($qNotificacion);
                        
                        $qEncuentro = "UPDATE encuentro SET confirmado=1 WHERE idNotificacion=$idNotificacion";
                        $res = $conexion->query($qEncuentro);
                        $respuesta = array("resp"=>"OK","asientos"=>$k-1);
                        echo json_encode($respuesta);
                    }else{  //No hay asientos disponibles
                        $qVisto = "UPDATE notificaciones SET visto=1 WHERE idNotificacion=$idNotificacion";
                        $res = $conexion->query($qVisto);
                        $qNotificacion = "INSERT INTO notificaciones VALUES(null,$pasajero,$numeroControl,$idViaje,curtime(),'b',0)";
                        $res = $conexion->query($qNotificacion);
                        $respuesta = array("resp"=>"NOK");
                        echo json_encode($respuesta);
                    }
                }
                else
                    echo $conexion->error;
            }else if($tipo=="R"){   //Rechazado
                $qVisto = "UPDATE notificacion SET visto=1 WHERE idNotificacion=$idNotificacion";
                $res = $conexion->query($qVisto);
                $qNotificacion = "INSERT INTO notificaciones VALUES(null,$pasajero,$numeroControl,$idViaje,curtime(),'r',0)";
                $res = $conexion->query($qNotificacion);
                $respuesta = array("resp"=>"OK");
                echo json_encode($respuesta);
            }
        break;
        case "D":   //datos confirmacion:contacto y ruta
            $qContacto = "SELECT nombreCompleto,carrera,telefono,salida FROM notificaciones n INNER JOIN usuario u ON u.numeroControl=n.solicitante INNER JOIN viaje USING(idViaje) WHERE idNotificacion=$idNotificacion";
            $res = $conexion->query($qContacto);
            $datos = array();
            if($row = $res->fetch_array(MYSQLI_ASSOC)){
                array_push($datos,$row);
                $qRuta = "SELECT idViaje,idRuta,origenLat,origenLng,idPunto,lat,lng FROM notificaciones n INNER JOIN viaje v USING (idViaje) INNER JOIN ruta r USING (idRuta) INNER JOIN puntosRuta pt USING (idRuta) WHERE idNotificacion=$idNotificacion";
                $res = $conexion->query($qRuta);
                $idViaje = null;
                while($row = $res->fetch_array(MYSQLI_ASSOC)){
                    $idViaje = $row["idViaje"];
                    array_push($datos,$row);  
                }
                $qEncuentro = "SELECT 'encuentro' AS encuentro, lat,lng FROM notificaciones INNER JOIN encuentro using (idNotificacion) WHERE idViaje=$idViaje AND tipo='s' AND solicitante=$numeroControl";
                $res = $conexion->query($qEncuentro);
                if($row = $res->fetch_array(MYSQLI_ASSOC)){
                    array_push($datos,$row);  
                }
                echo json_encode($datos);
            }
        break;
	}
?>
