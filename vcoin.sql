-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql9.freesqldatabase.com
-- Tiempo de generación: 18-03-2020 a las 22:00:31
-- Versión del servidor: 5.5.58-0ubuntu0.14.04.1
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sql9312738`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentasbancarias`
--

CREATE TABLE `cuentasbancarias` (
  `id` int(11) NOT NULL,
  `titular` text COLLATE utf8_spanish_ci,
  `dniTitular` text COLLATE utf8_spanish_ci,
  `nacional` text COLLATE utf8_spanish_ci,
  `paisBanco` text COLLATE utf8_spanish_ci,
  `banco` text COLLATE utf8_spanish_ci,
  `numeroCuenta` text COLLATE utf8_spanish_ci,
  `tipoCuenta` text COLLATE utf8_spanish_ci,
  `idTitular` bigint(9) UNSIGNED ZEROFILL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cuentasbancarias`
--

INSERT INTO `cuentasbancarias` (`id`, `titular`, `dniTitular`, `nacional`, `paisBanco`, `banco`, `numeroCuenta`, `tipoCuenta`, `idTitular`) VALUES
(8, 'Erick Diaz E.', '233423', 'Nacional', 'Venezuela', 'mercantil', '645353535456464', 'corriente/cheque', 000000003),
(9, 'gabriela ', '12345679', 'Nacional', 'Venezuela', 'banesco', '123456789369852', 'corriente/cheque', 000000006),
(10, 'nicole', '11111111111111', 'Extranjero', 'Argentina', 'banesco', '11111111111111111111111111111111111', 'corriente/cheque', 000000004),
(11, 'nicole', '111111111111', 'Nacional', 'Venezuela', 'bbbbbbbbbbb', 'bbbbbbbbbbbbbbbbbbbbbbb', 'ahorro', 000000004),
(12, 'leyda ejia', '111111111111', 'Nacional', 'Venezuela', 'bbbbbbbbbbb', '22222222222222', 'corriente/cheque', 000000007),
(13, 'eeeeeeeeee', '22222222222222222', 'Nacional', 'Venezuela', 'sssssssss', '33333333333333333333', 'corriente/cheque', 000000008),
(14, 'Gabriela Rincon', '256947005', 'Extranjero', 'Estados Unidos', 'SKRILL', 'gab18.12@gmail.com', 'corriente/cheque', 000000001),
(15, 'Gabriela Rincon', '143520980', 'Extranjero', 'Peru', 'PICHINCHA', '000760609713', 'ahorro', 000000001),
(16, 'Willy Gonzalez', '63333309', 'Nacional', 'Uruguay', 'BROU ', '600-0327133', 'ahorro', 000000001),
(19, 'Jorge Rincon', '95958074', 'Extranjero', 'Argentina', 'BRUBANK', '1430001713002165270016', 'ahorro', 000000001),
(20, 'Jorge Rincon', '95958074', 'Extranjero', 'Argentina', 'UALA (DEPÓSITOS)', '95958074', 'ahorro', 000000001),
(21, 'Mayerlis Carrillo ', '1045710039', 'Nacional', 'Colombia', 'BANCOLOMBIA', '51672806724', 'ahorro', 000000001),
(22, 'njnkklkl', '159852388', 'Nacional', 'Venezuela', 'bafgjhnj', '0000000000000000', 'corriente/cheque', 000000012),
(23, 'eduardo gonzalez', '1234', 'Nacional', 'Venezuela', 'bod', '1234', 'corriente/cheque', 000000013),
(24, 'miaaa', '1916583', 'Nacional', 'Venezuela', 'banesc', '111111111111111111111', 'corriente/cheque', 000000014),
(25, 'gabriela', '19178428', 'Nacional', 'Venezuela', 'banesco', '123456789132456', 'corriente/cheque', 000000012),
(26, 'andres', '22222', 'Nacional', 'Venezuela', 'bod', '7777777', 'corriente/cheque', 000000015),
(27, 'MIGUEL', '652355258', 'Nacional', 'Venezuela', 'BANESCO', '12345', 'corriente/cheque', 000000016),
(28, 'eduardo gonzalez', '12254', 'Nacional', 'Venezuela', 'bod', '34545454', 'corriente/cheque', 000000019),
(29, 'jose perz', '11860077', 'Nacional', 'Venezuela', 'banesco', '98765432123456789098', 'corriente/cheque', 000000020),
(30, 'daniel blanco', '7827282', 'Nacional', 'Venezuela', 'banesco', '12345678901234567890', 'corriente/cheque', 000000021),
(31, 'daniel blanco', '7827282', 'Nacional', 'Venezuela', 'banesco', '012345678901234567890', 'corriente/cheque', 000000023),
(32, 'maria', '1236', 'Nacional', 'Venezuela', 'banesco', '12345698741011236145', 'ahorro', 000000024),
(33, 'yupi', '36544', 'Nacional', 'Venezuela', 'banesco', '12312312312312312312', 'ahorro', 000000025),
(34, 'Florismar Silva', '4567383', 'Nacional', 'Venezuela', 'bod', '1349784', 'corriente/cheque', 000000027),
(35, 'Vcoin Spa', '77.076.386-k', 'Nacional', 'Chile', 'BANCO ESTADO', '00179336677', 'ahorro', 000000001),
(36, '11111', '1111', 'Nacional', 'Venezuela', 'Banesco', '11111', 'ahorro', 000000028);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imgpaises`
--

CREATE TABLE `imgpaises` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci,
  `codArea` text COLLATE utf8_spanish_ci,
  `ico` text COLLATE utf8_spanish_ci,
  `shortNombre` text COLLATE utf8_spanish_ci,
  `moneda` text COLLATE utf8_spanish_ci NOT NULL,
  `shortMoneda` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `imgpaises`
--

INSERT INTO `imgpaises` (`id`, `nombre`, `codArea`, `ico`, `shortNombre`, `moneda`, `shortMoneda`) VALUES
(1, 'Colombia', '+57', '/paises/colombia.svg', 'col', 'Peso Colombiano', 'cop'),
(2, 'Venezuela', '+58', '/paises/venezuela.svg', 'ven', 'Bolivar Venezolano', 'bs'),
(3, 'Estados Unidos', '+1', '/paises/estados-unidos.svg', 'usa', 'Dolar Americano', 'usd'),
(4, 'Argentina', '+54', '/paises/argentina.svg', 'arg', 'Peso Argentino', 'ars'),
(5, 'Chile', '+56', '/paises/chile.svg', 'chl', 'Peso Chileno', 'clp'),
(6, 'Peru', '+51', '/paises/peru.svg', 'per', 'Nuevo sol', 'pen'),
(7, 'Uruguay', '+598', '/paises/uruguay.svg', 'ury', 'Peso Uruguayo', 'uyu'),
(8, 'Bolivia', '+591', '/paises/bolivia.svg', 'bol', 'Boliviano', 'bob'),
(9, 'Brasil', '+55', '/paises/brasil.svg', 'bra', 'Real Brasileño', 'brl'),
(10, 'Costa Rica', '+506', '/paises/costa-rica.svg', 'CRI', 'Colón costarricense', 'CRC'),
(11, 'Cuba', '+53', '/paises/cuba.svg', 'CUB', 'Peso cubano', 'CUP'),
(12, 'Ecuador', '+593', '/paises/ecuador.svg', 'Ecu', 'Dólar estadounidense', 'usd'),
(13, 'Guatemala', '+502', '/paises/guatemala.svg', 'GTM', 'Quetzal', 'GTQ'),
(14, 'España', '+34', '/paises/espana.svg', 'Esp', 'Euro', 'eur'),
(15, 'Haití', '+509', '/paises/haiti.svg', 'HTI', 'Gourde haitiano', 'HTG'),
(16, 'México', '+52', '/paises/mexico.svg', 'MEX', 'Peso mexicano', 'MXN'),
(17, 'Nicaragua', '+505', '/paises/nicaragua.svg', 'NIC', 'Córdoba nicaragüense', 'NIO'),
(18, 'Panamá', '+507', '/paises/panama.svg', 'pan', 'Dólar estadounidense', 'usd'),
(19, 'Paraguay', '+595', '/paises/paraguay.svg', 'PRY', 'Guaraní paraguayo', 'PYG'),
(20, 'República Dominicana', '+1 809', '/paises/republica-dominicana.svg', 'dom', 'Peso dominicano', 'DOP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` text NOT NULL,
  `mensajeStatus` text,
  `idRemitente` text NOT NULL,
  `remitente` text NOT NULL,
  `idDestinatario` text NOT NULL,
  `destinatario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `titulo`, `mensaje`, `fecha`, `mensajeStatus`, `idRemitente`, `remitente`, `idDestinatario`, `destinatario`) VALUES
(4, 'CORREO', 'por favor verificar a direccion de correo electronico que no esta bien escrito , gracias', '9/12/2019', 'nuevo', '', '', '000000016', 'miguel reyes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci,
  `codArea` text COLLATE utf8_spanish_ci,
  `ico` text COLLATE utf8_spanish_ci,
  `shortNombre` text COLLATE utf8_spanish_ci,
  `moneda` text COLLATE utf8_spanish_ci NOT NULL,
  `shortMoneda` text COLLATE utf8_spanish_ci NOT NULL,
  `tazaCambio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id`, `nombre`, `codArea`, `ico`, `shortNombre`, `moneda`, `shortMoneda`, `tazaCambio`) VALUES
(5, 'Estados Unidos', '+1', '/paises/estados-unidos.svg', 'usa', 'Dolar Americano', 'usd', 67200),
(6, 'Argentina', '+54', '/paises/argentina.svg', 'arg', 'Peso Argentino', 'ars', 760),
(7, 'Colombia', '+57', '/paises/colombia.svg', 'col', 'Peso Colombiano', 'cop', 17.24),
(8, 'Chile', '+56', '/paises/chile.svg', 'chl', 'Peso Chileno', 'clp', 82),
(9, 'Peru', '+51', '/paises/peru.svg', 'per', 'Nuevo sol', 'pen', 19100),
(10, 'Uruguay', '+598', '/paises/uruguay.svg', 'ury', 'Peso Uruguayo', 'uyu', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` bigint(9) UNSIGNED ZEROFILL NOT NULL,
  `montoDeposito` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `monedaDeposito` text COLLATE utf8_spanish_ci,
  `montoRetiro` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `monedaRetiro` text COLLATE utf8_spanish_ci,
  `tazaCambio` text COLLATE utf8_spanish_ci NOT NULL,
  `status` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'abierta',
  `fechaPedido` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `idUsuario` bigint(9) UNSIGNED ZEROFILL DEFAULT NULL,
  `idBanco` int(11) DEFAULT NULL,
  `idOperador` bigint(9) UNSIGNED ZEROFILL DEFAULT NULL,
  `nombreOperador` text COLLATE utf8_spanish_ci,
  `correoOperador` text COLLATE utf8_spanish_ci,
  `referenciaDeposito` text COLLATE utf8_spanish_ci,
  `referenciaRetiro` text COLLATE utf8_spanish_ci,
  `fechaCompletada` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mensaje` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `montoDeposito`, `monedaDeposito`, `montoRetiro`, `monedaRetiro`, `tazaCambio`, `status`, `fechaPedido`, `idUsuario`, `idBanco`, `idOperador`, `nombreOperador`, `correoOperador`, `referenciaDeposito`, `referenciaRetiro`, `fechaCompletada`, `mensaje`) VALUES
(000000027, '10000', 'Peso Chileno', '485000.00', 'Bolivar Venezolano', '48.5', 'aceptada', '7/12/2019', 000000012, 17, 000000011, 'gabriela ', 'gabbarq@gmail.com', ' ', NULL, 'Sat Dec 07 2019 16:42:56 GMT-0300 (hora estándar de Argentina)', ''),
(000000028, '10000', 'Peso Chileno', '485000.00', 'Bolivar Venezolano', '48.5', 'pagada', '7/12/2019', 000000013, 23, 000000010, 'Kervin', 'kervinramirez.leon@gmail.com', '11111', NULL, 'Sat Dec 07 2019 16:43:02 GMT-0300 (hora de verano de Chile)', ''),
(000000029, '10000', 'Peso Chileno', '485000.00', 'Bolivar Venezolano', '48.5', 'aceptada', '7/12/2019', 000000014, 18, 000000011, 'gabriela ', 'gabbarq@gmail.com', ' ', NULL, 'Sat Dec 07 2019 16:47:34 GMT-0300 (hora estándar de Argentina)', ''),
(000000030, '100000', 'Peso Chileno', '4850000.00', 'Bolivar Venezolano', '48.5', 'completada', '7/12/2019', 000000012, 25, 000000011, 'gabriela ', 'gabbarq@gmail.com', '1111111111111111', '11111111111111', 'Sat Dec 07 2019 17:28:11 GMT-0300 (hora estándar de Argentina)', ''),
(000000031, '20000', 'Peso Chileno', '970000.00', 'Bolivar Venezolano', '48.5', 'pagada', '7/12/2019', 000000015, 26, 000000010, 'Kervin', 'kervinramirez.leon@gmail.com', '11111', NULL, 'Sat Dec 07 2019 17:49:34 GMT-0300 (hora de verano de Chile)', ''),
(000000032, '20000', 'Peso Chileno', '970000.00', 'Bolivar Venezolano', '48.5', 'aceptada', '12/8/2019', 000000016, 17, 000000010, 'Kervin', 'kervinramirez.leon@gmail.com', ' ', NULL, 'Sun Dec 08 2019 12:25:07 GMT-0300 (Chile Summer Time)', ''),
(000000033, '10000', 'Peso Chileno', '522000.00', 'Bolivar Venezolano', '52.2', 'completada', '12/10/2019', 000000012, 22, 000000011, 'gabriela ', 'gabbarq@gmail.com', '11111', '11111111111111', 'Tue Dec 10 2019 14:07:01 GMT-0300 (Argentina Standard Time)', ''),
(000000034, '20000', 'Peso Chileno', '1064000.00', 'Bolivar Venezolano', '53.2', 'pagada', '12/12/2019', 000000020, 29, 000000018, 'Luis Daniel', 'luisdanielmejiablanco@gmail.com', '11111', NULL, 'Thu Dec 12 2019 20:25:07 GMT-0300 (hora de verano de Chile)', ''),
(000000035, '10000', 'Peso Chileno', '532000.00', 'Bolivar Venezolano', '53.2', 'pagada', '12/12/2019', 000000021, 30, 000000018, 'Luis Daniel', 'luisdanielmejiablanco@gmail.com', '11111', NULL, 'Thu Dec 12 2019 22:08:52 GMT-0300 (hora de verano de Chile)', ''),
(000000036, '10000', 'Peso Chileno', '520000.00', 'Bolivar Venezolano', '52', 'pagada', '13/12/2019', 000000023, 31, 000000022, 'Sendy', 'gruporeyesreyes@yahoo.es', '111111', NULL, 'Fri Dec 13 2019 18:17:23 GMT-1100 (GMT-11:00)', ''),
(000000037, '20000', 'Peso Chileno', '1040000.00', 'Bolivar Venezolano', '52', 'pagada', '13/12/2019', 000000024, 32, 000000022, 'Sendy', 'gruporeyesreyes@yahoo.es', '111111', NULL, 'Fri Dec 13 2019 18:29:34 GMT-1100 (GMT-11:00)', ''),
(000000038, '58000', 'Peso Chileno', '3016000.00', 'Bolivar Venezolano', '52', 'aceptada', '13/12/2019', 000000025, 18, 000000022, 'Sendy', 'gruporeyesreyes@yahoo.es', ' ', NULL, 'Fri Dec 13 2019 18:41:36 GMT-1100 (GMT-11:00)', ''),
(000000039, '20000', 'Peso Chileno', '1500000.00', 'Bolivar Venezolano', '75', 'abierta', '14/3/2020', 000000027, 18, 000000010, 'Kervin', 'kervinramirez.leon@gmail.com', ' ', '', 'Sat Mar 14 2020 08:31:12 GMT-0300 (hora de verano de Chile)', ''),
(000000040, '10000', 'Peso Chileno', '820000.00', 'Bolivar Venezolano', '82', 'pagada', '3/14/2020', 000000028, 36, 000000011, 'gabriela ', 'gabbarq@gmail.com', '1222', NULL, 'Sat Mar 14 2020 08:46:57 GMT-0300 (GMT-03:00)', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenas`
--

CREATE TABLE `resenas` (
  `id` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` text NOT NULL,
  `idRemitente` text NOT NULL,
  `statusResena` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefonos`
--

CREATE TABLE `telefonos` (
  `id` int(11) NOT NULL,
  `codPais` varchar(4) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` bigint(9) UNSIGNED ZEROFILL NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci,
  `apellido` text COLLATE utf8_spanish_ci,
  `correo` text COLLATE utf8_spanish_ci,
  `telefono` text COLLATE utf8_spanish_ci,
  `password` text COLLATE utf8_spanish_ci NOT NULL,
  `rango` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'cliente',
  `userStatus` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'no confirmado',
  `foto` text COLLATE utf8_spanish_ci,
  `dni` text COLLATE utf8_spanish_ci,
  `direccion` text COLLATE utf8_spanish_ci,
  `token` text COLLATE utf8_spanish_ci,
  `fechaIncripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `pais` text COLLATE utf8_spanish_ci NOT NULL,
  `idOperador` bigint(9) UNSIGNED ZEROFILL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correo`, `telefono`, `password`, `rango`, `userStatus`, `foto`, `dni`, `direccion`, `token`, `fechaIncripcion`, `pais`, `idOperador`) VALUES
(000000001, 'adm', 'Adm', 'vcointransfer@gmail.com', '04148733690', 'admin', 'administrador', 'confirmado', '/uploads/191120044951descarga (1).png', '334423232', NULL, '1275682435698246', '', '', NULL),
(000000010, 'Kervin', 'Ramírez', 'kervinramirez.leon@gmail.com', NULL, 'kerl2585', 'corresponsal', 'confirmado', NULL, '25445970-4', NULL, '1575741183108', 'Sat Dec 07 2019 14:52:57 GMT-0300 (hora de verano de Chile)', 'Chile', 000000001),
(000000011, 'gabriela ', 'rincon', 'gabbarq@gmail.com', NULL, 'Nicole2407', 'corresponsal', 'confirmado', NULL, '256947005', NULL, '1575747325768', 'Sat Dec 07 2019 16:35:25 GMT-0300 (hora estándar de Argentina)', 'venezuela', 000000001),
(000000012, 'nnnnn', 'aaaaa', '123456@gmail.com', '111111', '123456', 'cliente', 'confirmado', NULL, '25852', NULL, '1575747530387', 'Sat Dec 07 2019 16:38:49 GMT-0300 (hora estándar de Argentina)', 'chile', 000000011),
(000000013, 'aaaaa', 'bbbb', 'kervin.ramirez@gmail.com', '97648373688', '1234', 'cliente', 'confirmado', NULL, '1234', NULL, '1575747589681', 'Sat Dec 07 2019 16:39:49 GMT-0300 (hora de verano de Chile)', 'chile', 000000010),
(000000014, 'gaba', 'bbb', '123@gmail.com', '123456789', 'Nicole2407', 'cliente', 'confirmado', NULL, '25694700', NULL, '1575748004785', 'Sat Dec 07 2019 16:46:44 GMT-0300 (hora estándar de Argentina)', 'chile', 000000011),
(000000015, 'Andres', 'Gonz', '1234@gmail.com', '555555', '1234', 'cliente', 'confirmado', NULL, '222222', NULL, '1575751699447', 'Sat Dec 07 2019 17:48:19 GMT-0300 (hora de verano de Chile)', 'chile', 000000010),
(000000016, 'miguel', 'reyes', 'gruporeyesreyes@hayoo.es', '56991035377', '1234', 'cliente', 'confirmado', NULL, '241113876', NULL, '1575818354504', 'Sun Dec 08 2019 12:19:12 GMT-0300 (Chile Summer Time)', 'chile', 000000010),
(000000017, 'Erick', 'Diaz E.', 'erickoficial69@gmail.com', NULL, '78789846', 'cliente', 'confirmado', NULL, '23413903', NULL, '1575826249780', 'Sun Dec 08 2019 13:30:49 GMT-0400 (hora de Venezuela)', 'Venezuela', 000000001),
(000000018, 'Luis Daniel', 'Mejia Blanco ', 'luisdanielmejiablanco@gmail.com', '+56947702524', 'Morochos2', 'corresponsal', 'confirmado', NULL, '267489602', NULL, '1575996744965', 'Tue Dec 10 2019 13:51:31 GMT-0300 (hora de verano de Chile)', 'Venezuela ', 000000001),
(000000019, 'andres', 'mejia', '2345@ganil.com', '999999', '1234', 'cliente', 'confirmado', NULL, '234545366', NULL, '1576020077195', 'Tue Dec 10 2019 20:21:17 GMT-0300 (hora de verano de Chile)', 'chile', 000000010),
(000000020, 'andres', 'perz', 'miguelmejialeon@gmail.com', '987867549', '1234', 'cliente', 'confirmado', NULL, '7827282', NULL, '1576192773869', 'Thu Dec 12 2019 20:19:34 GMT-0300 (hora de verano de Chile)', 'chile', 000000018),
(000000021, 'daniel', 'blanco', 'luisdmejia@hotmail.com', '947702524', '1234', 'cliente', 'confirmado', NULL, '7827282', NULL, '1576198842807', 'Thu Dec 12 2019 22:00:43 GMT-0300 (hora de verano de Chile)', 'chile', 000000018),
(000000022, 'Sendy', 'valdez', 'gruporeyesreyes@yahoo.es', NULL, 'maria1985', 'corresponsal', 'confirmado', NULL, '261664534', NULL, '1576266654870', 'Fri Dec 13 2019 16:50:57 GMT-1100 (GMT-11:00)', 'chile', 000000001),
(000000023, 'luis', 'mejia', 'luisdmejia@gmail.com', '947702524', '1234', 'cliente', 'confirmado', NULL, '267489602', NULL, '1576268858963', 'Fri Dec 13 2019 17:27:40 GMT-1100 (GMT-11:00)', 'chile', 000000022),
(000000024, 'osuero', 'diaz', 'osuero@hotmail.com', '506598745654', '1233', 'cliente', 'confirmado', NULL, '002015214', NULL, '1576272482411', 'Fri Dec 13 2019 18:28:05 GMT-1100 (GMT-11:00)', 'chile', 000000022),
(000000025, 'ffff', 'ssss', 'osuero@hotmail.es', '1233544', '11111', 'cliente', 'confirmado', NULL, '11222', NULL, '1576273059433', 'Fri Dec 13 2019 18:37:42 GMT-1100 (GMT-11:00)', 'chile', 000000022),
(000000026, 'juan', 'perez', 'juanmm@hotmail.com', '1555411225', '12455', 'cliente', 'confirmado', NULL, '000000254', NULL, '1576679943735', 'Wed Dec 18 2019 11:39:08 GMT-1100 (GMT-11:00)', 'chile', 000000022),
(000000027, 'Flor', 'Silva', 'flor@gmail.com', '76589435', '1234', 'cliente', 'confirmado', NULL, '2020', NULL, '1584143156162', 'Fri Mar 13 2020 20:46:16 GMT-0300 (hora de verano de Chile)', 'Chile', 000000010),
(000000028, '1q1qq', '11111', 'operador@gmail.com', '1111', '1111', 'cliente', 'confirmado', NULL, '11111', NULL, '1584186362306', 'Sat Mar 14 2020 08:46:00 GMT-0300 (GMT-03:00)', 'Chile', 000000011);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuentasbancarias`
--
ALTER TABLE `cuentasbancarias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imgpaises`
--
ALTER TABLE `imgpaises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD UNIQUE KEY `idPedido` (`idPedido`);

--
-- Indices de la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `telefonos`
--
ALTER TABLE `telefonos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuentasbancarias`
--
ALTER TABLE `cuentasbancarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT de la tabla `imgpaises`
--
ALTER TABLE `imgpaises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` bigint(9) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT de la tabla `resenas`
--
ALTER TABLE `resenas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `telefonos`
--
ALTER TABLE `telefonos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` bigint(9) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
