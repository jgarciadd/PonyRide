-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2017 a las 07:55:42
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
(2, '14121466', 'Ford', 'Focus', 'AGB-10-01', 'Rojo');

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
('14121446', 'Diego Velez Jimenez', 'ISC', '452-168-0829', '0efa91b049f27a76e289cc47b83c58e8d576fcd8'),
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
  `salida` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `idAuto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `puntosruta`
--
ALTER TABLE `puntosruta`
  MODIFY `idPunto` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `idRuta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `viaje`
--
ALTER TABLE `viaje`
  MODIFY `idViaje` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `numeroControl` FOREIGN KEY (`numeroControl`) REFERENCES `usuario` (`numeroControl`) ON DELETE CASCADE ON UPDATE CASCADE;

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
