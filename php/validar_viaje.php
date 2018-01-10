<?php
    require("acceso_bd.php");
    //Seleccionar una bd
    //Extraer los parametros que recibimos desde JS. numeroControl, nombreCompleto, etc...
    extract($_POST);
    switch($operacion){
        case "V":
            $qValidar = "SELECT idViaje,idRuta,modelo,salida,v.asientos FROM viaje v INNER JOIN auto a USING (idAuto) WHERE salida > curtime() AND v.numeroControl=$numeroControl";
            $res = $conexion->query($qValidar);
            $respuesta = array();
            if($row = $res->fetch_array(MYSQLI_ASSOC)){
                $idViaje = $row["idViaje"];
                $idRuta = $row["idRuta"];
                array_push($respuesta,$row);
                $qRuta = "SELECT origenLat,origenLng,lat,lng FROM ruta r INNER JOIN puntosruta pr USING (idRuta) WHERE idRuta=".$idRuta;
                $res = $conexion->query($qRuta);
                while($row = $res->fetch_array(MYSQLI_ASSOC)){
                    array_push($respuesta,$row);
                }
                $qRuta = "SELECT idNotificacion FROM notificaciones WHERE tipo='s' AND visto=1 AND idViaje=$idViaje";
                $res = $conexion->query($qRuta);
                while($row = $res->fetch_array(MYSQLI_ASSOC)){
                    $idNot = $row["idNotificacion"];
                    $qEnc = "SELECT confirmado,lat,lng,nombreCompleto FROM encuentro e INNER JOIN notificaciones n USING (idNotificacion) INNER JOIN usuario u ON u.numeroControl = n.solicitante WHERE n.idNotificacion = $idNot AND confirmado=1";
                    $resEnc = $conexion->query($qEnc);
                    if($enc = $resEnc->fetch_array(MYSQLI_ASSOC)){
                        array_push($respuesta,$enc);
                    }
                }
                $qPasajeros = "SELECT nombreCompleto,carrera,telefono FROM pasajeros p INNER JOIN viaje USING (idViaje) INNER JOIN usuario u ON u.numeroControl = p.pasajero WHERE idViaje=$idViaje";
                $res = $conexion->query($qPasajeros);
                while($row = $res->fetch_array(MYSQLI_ASSOC)){
                    array_push($respuesta,$row);
                }
                echo json_encode($respuesta);
            }
            else{
                echo "NV";  //No hay viaje
            }
        break;
        case "R":   //Obtener una ruta
            $qRuta = "select origenLat,origenLng,lat,lng from viaje v INNER JOIN ruta r USING(idRuta) INNER JOIN puntosruta pr USING(idRuta) where idViaje=$idViaje";
			$res = $conexion->query($qRuta);
			$resultado = array();
			while($row=$res->fetch_array(MYSQLI_ASSOC)){
				array_push($resultado,$row);
			}
			echo json_encode($resultado);
        break;
    }
?>
