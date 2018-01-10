<?php
	require("acceso_bd.php");
	extract($_POST);
	$q = "SELECT * FROM ruta WHERE numeroControl=$numeroControl";
	$res = $conexion->query($q);
	if($row = $res->fetch_array(MYSQLI_ASSOC)){
		echo "OK";
	}
	else
		echo "NOK";
?>