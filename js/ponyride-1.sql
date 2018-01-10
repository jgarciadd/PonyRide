-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2017 a las 22:04:37
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ponyride`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto`
--

CREATE TABLE `auto` (
  `idAuto` int(11) NOT NULL,
  `numeroControl` varchar(8) NOT NULL,
  `marca` varchar(15) NOT NULL,
  `modelo` varchar(15) NOT NULL,
  `placas` varchar(9) NOT NULL,
  `color` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `auto`
--

INSERT INTO `auto` (`idAuto`, `numeroControl`, `marca`, `modelo`, `placas`, `color`) VALUES
(2, '14121466', 'Ford', 'Focus', 'AGB-10-01', 'Rojo'),
(3, '14121463', 'Mazda', 'mazda3', 'ASDF-33-1', 'Blanco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuentro`
--

CREATE TABLE `encuentro` (
  `idNotificacion` int(11) DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuentro`
--

INSERT INTO `encuentro` (`idNotificacion`, `lat`, `lng`) VALUES
(20, '19.67787530', '-101.21504060'),
(24, '19.67405040', '-101.20496655'),
(31, '19.67443430', '-101.21272350'),
(34, '19.67443430', '-101.21272350'),
(38, '19.67443430', '-101.21272350'),
(46, '19.71943025', '-101.18788387'),
(48, '19.71943025', '-101.18788387');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `idNotificacion` int(11) NOT NULL,
  `numeroControl` varchar(8) DEFAULT NULL,
  `solicitante` varchar(8) DEFAULT NULL,
  `idViaje` int(11) DEFAULT NULL,
  `hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tipo` char(1) DEFAULT NULL,
  `visto` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`idNotificacion`, `numeroControl`, `solicitante`, `idViaje`, `hora`, `tipo`, `visto`) VALUES
(20, '13121463', '11121017', 1, '2017-12-04 02:29:13', 's', 1),
(24, '13121463', '14121463', 1, '2017-12-04 02:27:01', 's', 1),
(31, '13121463', '11121017', 1, '2017-12-04 02:31:04', 's', 1),
(34, '13121463', '14121463', 1, '2017-12-04 02:28:51', 's', 1),
(35, '14121463', '13121463', 1, '2017-12-04 02:28:51', 'c', 0),
(36, '11121017', '13121463', 1, '2017-12-04 02:29:01', 'r', 0),
(37, '11121017', '13121463', 1, '2017-12-04 02:29:13', 'c', 0),
(38, '13121463', '14121463', 1, '2017-12-04 02:46:58', 's', 1),
(39, '14121463', '13121463', 1, '2017-12-04 02:30:54', 'r', 0),
(40, '11121017', '13121463', 1, '2017-12-04 02:31:04', 'c', 0),
(43, '14121463', '13121463', 1, '2017-12-04 02:46:17', 'r', 0),
(44, '14121463', '13121463', 1, '2017-12-04 02:46:42', 'r', 0),
(45, '14121463', '13121463', 1, '2017-12-04 02:46:58', 'b', 0),
(46, '14121463', '13121463', 1, '2017-12-04 20:19:48', 's', 1),
(47, '13121463', '14121463', 1, '2017-12-04 20:19:48', 'c', 0),
(48, '14121463', '13121463', 1, '2017-12-04 20:19:54', 's', 0),
(49, '13121463', '14121463', 1, '2017-12-04 20:20:13', 'r', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajeros`
--

CREATE TABLE `pasajeros` (
  `idViaje` int(11) DEFAULT NULL,
  `pasajero` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pasajeros`
--

INSERT INTO `pasajeros` (`idViaje`, `pasajero`) VALUES
(1, '14121463'),
(1, '11121017'),
(1, '11121017'),
(1, '13121463');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntosruta`
--

CREATE TABLE `puntosruta` (
  `idPunto` int(11) NOT NULL,
  `idRuta` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `puntosruta`
--

INSERT INTO `puntosruta` (`idPunto`, `idRuta`, `lat`, `lng`) VALUES
(1, 9, 19.719941881110785, -101.18969321250916),
(2, 9, 19.719275304554003, -101.18782639503479);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `idRuta` int(11) NOT NULL,
  `idAuto` int(11) NOT NULL,
  `origenLat` double NOT NULL,
  `origenLng` double NOT NULL,
  `salida` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`idRuta`, `idAuto`, `origenLat`, `origenLng`, `salida`) VALUES
(1, 3, 19.6738981, -101.2136567, '11:15:00'),
(7, 3, 19.722795800000004, -101.18871419999999, '07:08:00'),
(8, 3, 19.722795800000004, -101.18871419999999, '00:00:00'),
(9, 3, 19.722795800000004, -101.18871419999999, '14:12:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `numeroControl` varchar(8) NOT NULL,
  `nombreCompleto` varchar(45) NOT NULL,
  `carrera` varchar(5) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`numeroControl`, `nombreCompleto`, `carrera`, `telefono`, `password`) VALUES
('11121017', 'Erick Garcia', 'IBQ', '443-400-2365', 'edab4b3906b6b5bac10f20cf194a7be740bbf358'),
('13121463', 'Maria', 'II', '492-113-4877', 'edab4b3906b6b5bac10f20cf194a7be740bbf358'),
('14121446', 'Diego Velez Jimenez', 'ISC', '452-168-0829', '0efa91b049f27a76e289cc47b83c58e8d576fcd8'),
('14121463', 'Jorge Garcia', 'ISC', '443-471-3947', 'edab4b3906b6b5bac10f20cf194a7be740bbf358'),
('14121466', 'Susana Diaz Gonzalez', 'ISC', '4433214567', 'er45wsdr');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viaje`
--

CREATE TABLE `viaje` (
  `idViaje` int(11) NOT NULL,
  `numeroControl` varchar(8) NOT NULL,
  `idAuto` int(11) NOT NULL,
  `idRuta` int(11) NOT NULL,
  `salida` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `asientos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `viaje`
--

INSERT INTO `viaje` (`idViaje`, `numeroControl`, `idAuto`, `idRuta`, `salida`, `asientos`) VALUES
(1, '14121463', 3, 9, '2017-12-04 20:19:48', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`idAuto`),
  ADD KEY `numeroControl` (`numeroControl`);

--
-- Indices de la tabla `encuentro`
--
ALTER TABLE `encuentro`
  ADD KEY `idNotificacion` (`idNotificacion`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`idNotificacion`),
  ADD KEY `numeroControl` (`numeroControl`),
  ADD KEY `idViaje` (`idViaje`),
  ADD KEY `fk_usr_solicitante` (`solicitante`);

--
-- Indices de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD KEY `idViaje` (`idViaje`),
  ADD KEY `pasajero` (`pasajero`);

--
-- Indices de la tabla `puntosruta`
--
ALTER TABLE `puntosruta`
  ADD PRIMARY KEY (`idPunto`),
  ADD KEY `idRuta` (`idRuta`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`idRuta`),
  ADD KEY `idauto_idx` (`idAuto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`numeroControl`);

--
-- Indices de la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD PRIMARY KEY (`idViaje`),
  ADD KEY `numeroControl` (`numeroControl`),
  ADD KEY `idAuto` (`idAuto`),
  ADD KEY `idRuta` (`idRuta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auto`
--
ALTER TABLE `auto`
  MODIFY `idAuto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `idNotificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT de la tabla `puntosruta`
--
ALTER TABLE `puntosruta`
  MODIFY `idPunto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `idRuta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `viaje`
--
ALTER TABLE `viaje`
  MODIFY `idViaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `numeroControl` FOREIGN KEY (`numeroControl`) REFERENCES `usuario` (`numeroControl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuentro`
--
ALTER TABLE `encuentro`
  ADD CONSTRAINT `encuentro_ibfk_1` FOREIGN KEY (`idNotificacion`) REFERENCES `notificaciones` (`idNotificacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_noti_usuario` FOREIGN KEY (`numeroControl`) REFERENCES `usuario` (`numeroControl`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_noti_viaje` FOREIGN KEY (`idViaje`) REFERENCES `viaje` (`idViaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usr_solicitante` FOREIGN KEY (`solicitante`) REFERENCES `usuario` (`numeroControl`);

--
-- Filtros para la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD CONSTRAINT `pasajeros_ibfk_1` FOREIGN KEY (`idViaje`) REFERENCES `viaje` (`idViaje`),
  ADD CONSTRAINT `pasajeros_ibfk_2` FOREIGN KEY (`pasajero`) REFERENCES `usuario` (`numeroControl`);

--
-- Filtros para la tabla `puntosruta`
--
ALTER TABLE `puntosruta`
  ADD CONSTRAINT `idRuta` FOREIGN KEY (`idRuta`) REFERENCES `ruta` (`idRuta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD CONSTRAINT `idauto` FOREIGN KEY (`idAuto`) REFERENCES `auto` (`idAuto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD CONSTRAINT `fk_viaje_auto` FOREIGN KEY (`idAuto`) REFERENCES `auto` (`idAuto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_viaje_ruta` FOREIGN KEY (`idRuta`) REFERENCES `ruta` (`idRuta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_viaje_usuario` FOREIGN KEY (`numeroControl`) REFERENCES `usuario` (`numeroControl`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


GRANT SELECT,INSERT,UPDATE ON ponyride.viaje TO pony;
GRANT SELECT,INSERT,UPDATE ON ponyride.notificaciones TO pony;
GRANT SELECT,INSERT,UPDATE ON ponyride.encuentro TO pony;
GRANT SELECT,INSERT,UPDATE ON ponyride.pasajeros TO pony;
FLUSH PRIVILEGES;