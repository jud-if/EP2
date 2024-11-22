-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2024 a las 00:16:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `todomaestro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adsetiqueta`
--

CREATE TABLE `adsetiqueta` (
  `id_ad` int(10) UNSIGNED NOT NULL,
  `id_etiqueta` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `adsetiqueta`
--

INSERT INTO `adsetiqueta` (`id_ad`, `id_etiqueta`) VALUES
(28, 5),
(29, 2),
(30, 1),
(30, 5),
(31, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios`
--

CREATE TABLE `anuncios` (
  `id_ad` int(10) UNSIGNED NOT NULL,
  `tipo_anuncio` varchar(50) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descripcion` varchar(750) NOT NULL,
  `region` varchar(50) NOT NULL,
  `comuna` varchar(50) NOT NULL,
  `salario` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `anuncios`
--

INSERT INTO `anuncios` (`id_ad`, `tipo_anuncio`, `titulo`, `descripcion`, `region`, `comuna`, `salario`, `fecha_creacion`, `id_usuario`) VALUES
(28, '1', 'Plomero A domicilio', 'Me ofrezco a ir a sus hogares por paga a voluntad', 'Región Metropolitana', 'Comuna 1', 0, '2024-11-22', 7),
(29, '0', 'Busco jardinero para Jardin Gigante', 'Se busca quien me corte el pasto y plante unos arboles', 'Biobío', 'Comuna 6', 150000, '2024-11-22', 10),
(30, '0', 'Se necesita Electricista y Plomero', 'Estoy Construyendo una casa y necesito a alguien me haga el circuito de la casa. Ademas alguien que prepare el sistema del baño.', 'Valparaíso', 'Comuna 1', 350000, '2024-11-22', 10),
(31, '1', 'Trabajos de pintura y Arte', 'Soy un apasionado por todo lo relacionado a la pintura, me ofrezco a pintar casas, murales e interiores. El pago es a voluntad siempre y cuando me den los materiales', 'Biobío', 'Comuna 1', 0, '2024-11-22', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` bigint(20) UNSIGNED NOT NULL,
  `usuario_emisor` int(11) NOT NULL,
  `usuario_destino` int(11) NOT NULL,
  `valoracion` float NOT NULL,
  `texto_comentario` varchar(350) NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleadores`
--

CREATE TABLE `empleadores` (
  `company` varchar(150) DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `company_description` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id_etiqueta` int(10) UNSIGNED NOT NULL,
  `nombre_etiqueta` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`id_etiqueta`, `nombre_etiqueta`) VALUES
(1, 'Electricidad'),
(2, 'Jardineria'),
(5, 'Plomeria'),
(6, 'Soldador'),
(7, 'Carpintero'),
(9, 'Pintor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `ocupacion` varchar(100) DEFAULT NULL,
  `anyos_experiencia` int(11) DEFAULT NULL,
  `presentacion` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tipo_perfil` varchar(20) NOT NULL,
  `password` varchar(500) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `region` varchar(50) NOT NULL,
  `comuna` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombres`, `apellido`, `email`, `tipo_perfil`, `password`, `fecha_creacion`, `region`, `comuna`) VALUES
(6, 'ale', 'perez', 'prueba@gmail.com', 'Trabajador', '$2b$10$L7UW/wmNVJX313jtpTQRnOiO0s5RGmBba3GWbOIuOiwAI/vpuoVOW', '2024-11-14', 'Valparaíso', 'Villa alemana'),
(7, 'Beta Tester', 'Randomico', 'test@gmail.com', 'Trabajador', '$2b$10$P1Nmiqk9pxABTz0Q5fw5i.gpvRV6yEJDU5ovZaPZsiwQSaidDAibC', '2024-11-14', 'Biobío', 'Villa Alemana'),
(10, 'Pedrito Juna', 'Perez Gonzales', 'testing@pucv.cl', 'Trabajador', '$2b$10$sYer5UtB8cWGSlXovBgw8e6yxktUFVpyb2WboMZODewrtHhuVJ1gS', '2024-11-22', 'Valparaíso', 'Villa Alemana');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adsetiqueta`
--
ALTER TABLE `adsetiqueta`
  ADD PRIMARY KEY (`id_ad`,`id_etiqueta`),
  ADD KEY `fk_id_etiquetaCruce` (`id_etiqueta`);

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id_ad`),
  ADD UNIQUE KEY `id_ad` (`id_ad`),
  ADD KEY `fk_id_usuarioanuncio` (`id_usuario`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD UNIQUE KEY `id_comentario` (`id_comentario`),
  ADD KEY `fk_usuario_emisor` (`usuario_emisor`),
  ADD KEY `fk_usuario_destino` (`usuario_destino`);

--
-- Indices de la tabla `empleadores`
--
ALTER TABLE `empleadores`
  ADD KEY `fk_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id_etiqueta`),
  ADD UNIQUE KEY `id_etiqueta` (`id_etiqueta`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD KEY `fk_id_usuariotrabajador` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id_ad` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id_etiqueta` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adsetiqueta`
--
ALTER TABLE `adsetiqueta`
  ADD CONSTRAINT `fk_id_adCruce` FOREIGN KEY (`id_ad`) REFERENCES `anuncios` (`id_ad`),
  ADD CONSTRAINT `fk_id_etiquetaCruce` FOREIGN KEY (`id_etiqueta`) REFERENCES `etiquetas` (`id_etiqueta`);

--
-- Filtros para la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD CONSTRAINT `fk_id_usuarioanuncio` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_usuario_destino` FOREIGN KEY (`usuario_destino`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `fk_usuario_emisor` FOREIGN KEY (`usuario_emisor`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `empleadores`
--
ALTER TABLE `empleadores`
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD CONSTRAINT `fk_id_usuariotrabajador` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
