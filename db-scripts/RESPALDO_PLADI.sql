-- --------------------------------------------------------
-- Host:                         10.200.4.161
-- Versión del servidor:         10.8.8-MariaDB - MariaDB Server
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para PLADI
DROP DATABASE IF EXISTS `PLADI`;
CREATE DATABASE IF NOT EXISTS `PLADI` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `PLADI`;

-- Volcando estructura para tabla PLADI.files_gral
DROP TABLE IF EXISTS `files_gral`;
CREATE TABLE IF NOT EXISTS `files_gral` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idowner` char(36) NOT NULL,
  `NombreFile` varchar(200) NOT NULL,
  `Ruta` longtext NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general de los archivos';

-- Volcando datos para la tabla PLADI.files_gral: ~0 rows (aproximadamente)
DELETE FROM `files_gral`;

-- Volcando estructura para tabla PLADI.inap_gral
DROP TABLE IF EXISTS `inap_gral`;
CREATE TABLE IF NOT EXISTS `inap_gral` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `Clave` int(11) NOT NULL,
  `FechaConveniogrlinicio` datetime DEFAULT NULL,
  `FechaConveniogrlfin` datetime DEFAULT NULL,
  `NombreConvenio` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `Clave` (`Clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.inap_gral: ~3 rows (aproximadamente)
DELETE FROM `inap_gral`;
INSERT INTO `inap_gral` (`Id`, `Deleted`, `UltimaActualizacion`, `FechaCreacion`, `ModificadoPor`, `CreadoPor`, `Clave`, `FechaConveniogrlinicio`, `FechaConveniogrlfin`, `NombreConvenio`) VALUES
	('5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-08 12:32:03', '2024-02-08 12:32:03', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 3, '2021-12-01 00:00:00', '2024-09-30 00:00:00', 'Convenio General de Colaboración INAP, SFyTGE 2022-2024'),
	('84205fd7-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-08 12:26:29', '2024-02-08 12:26:03', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 1, '2016-11-16 00:00:00', '2018-12-31 00:00:00', 'Convenio General de Colaboración INAP, SFyTGE 2016-2018'),
	('e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-08 12:28:58', '2024-02-08 12:28:47', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 2, '2018-12-17 00:00:00', '2021-12-31 00:00:00', 'Convenio General de Colaboración INAP, SFyTGE 2018-2021');

-- Volcando estructura para tabla PLADI.inap_gral_01
DROP TABLE IF EXISTS `inap_gral_01`;
CREATE TABLE IF NOT EXISTS `inap_gral_01` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `IdGral` char(36) NOT NULL DEFAULT '0',
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `Clave` int(11) NOT NULL AUTO_INCREMENT,
  `FechaConvenioinicio` datetime DEFAULT NULL,
  `FechaConveniofin` datetime DEFAULT NULL,
  `Objetivo` longtext DEFAULT NULL,
  `Monto` varchar(300) DEFAULT NULL,
  `FechaFiniquito` datetime DEFAULT NULL,
  `NombreConvenio` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `FK1_GRAL_01` (`IdGral`),
  KEY `Clave` (`Clave`),
  CONSTRAINT `FK1_GRAL_01` FOREIGN KEY (`IdGral`) REFERENCES `inap_gral` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información del convenio espesifico';

-- Volcando datos para la tabla PLADI.inap_gral_01: ~22 rows (aproximadamente)
DELETE FROM `inap_gral_01`;
INSERT INTO `inap_gral_01` (`Id`, `IdGral`, `Deleted`, `UltimaActualizacion`, `FechaCreacion`, `ModificadoPor`, `CreadoPor`, `Clave`, `FechaConvenioinicio`, `FechaConveniofin`, `Objetivo`, `Monto`, `FechaFiniquito`, `NombreConvenio`) VALUES
	('1dbd8ec8-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 87, '2017-10-02 00:00:00', '2018-12-31 00:00:00', 'Basado en la exigencia de la Ley General de Contabilidad Gubernamental, los Municipios del Estado de Nuevo León, con población menor a los 25,000 habitantes, apoyados por el Estado en coordinación con la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León (SFyTGE), requieren arrancar una iniciativa interna de armonización contable, e implementación, de una metodologúa con el objetivo de cumplir con las disposiciones que marca la Ley General de Contabilidad Gubernamental en las que se estable cumplir con la Armonización Contable', '10566486.4', '2018-08-16 00:00:00', 'Armonización Contable en los Municipios del Estado de Nuevo León '),
	('1dc0e31b-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 88, '2017-10-02 00:00:00', '2018-12-31 00:00:00', 'Se requiere realizar el análisis y actualización del Manual de políticas y procedimientos de la Dirección de Patrimonio para dar cumplimiento a la Ley de Transparencia y Acceso a la Información que obliga a los entes públicos a tener actualizado el documento. Aunado a lo anterior se requiere realizar acciones correctivas de las áreas de oportunidad detectadas para los rubros de Bienes Inmuebles y Bienes Muebles realizando un análisis y diagnóstico de los importes presentados en el Informe del Primer Trimestre de Avance de Gestión Financiera del ejercicio anterior, atendiendo a la Ley General de Contabilidad Gubernamental y a la normatividad emitida por CONAC', '3012500', '2019-11-14 00:00:00', 'Análisis y actualización del manual de políticas y procesos de la Dirección de Patrimonio GENL'),
	('1dc2c08c-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 89, '2017-10-01 00:00:00', '2018-12-31 00:00:00', 'Se requiere realizar una valuación actuarial para cuantificar el pasivo contingente que tienen los municipios del estado de Nuevo León ante sus empleados por concepto de obligaciones laborales para dar cumplimiento a la Ley General de Contabilidad Gubernamental y la Ley de Disciplina Financiera de las Entidades Federativas y los Municipios  y a la normatividad emitida por el Consejo Nacional de Armonización Contable que obligan a los entes públicos a determinar un aprovisión para este pasivo.  ', 'min $2,288,231.56  máx $2,816,285.00', '2018-09-12 00:00:00', 'Estudio a la valuación actuarial de los pasivos laborales,Ejercicio 2017'),
	('1dc3cf17-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 90, '2018-11-01 00:00:00', '2018-12-31 00:00:00', 'Se requiere realizar una valuación actuarial para cuantificar el pasivo contingente que tienen los municipios del estado de Nuevo León ante sus empleados por concepto de obligaciones laborales para dar cumplimiento a la Ley General de Contabilidad Gubernamental la Ley de Disciplina Financiera de las Entidades Federativas y los Municipios y a la normatividad emitida por el Consejo Nacional de Armonización Contable que obligan a los entes públicos a determinar una provisión para este pasivo; este pasivo se genera calculando la obligación de la Indemnización Legal de cada trabajador de manera individual debido a que cada trabajador presneta condiciones particuales, aún cuando existen perfiles similares, logrando garantizar una mayor certeza en las estimaciones de los costos futuros. ', 'min $2,288,231.56  máx $2,816,285.00', '2019-04-09 00:00:00', 'Estudio a la valuación actuarial de los pasivos laborales, Ejercicio 2018'),
	('1dc653f8-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 91, '2019-04-29 00:00:00', '2021-06-30 00:00:00', 'Proporcionar a la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León de un servicio de consultoría con una metodología que le permita mejorar e eficientar las gestiones y los tiempos de atención a diversos procesos administrativos transversales, a partir del rediseño, la mejora y las recomendaciones efectuadas con el propósito de promover la adopción de manera mas sencilla y ágil de los lineamientos, normativas y aplicaciones de gobernabilidad de procesos según corresponsa. ', 'min $7,160,398.00  máx $15,206,283.26', '2021-09-28 00:00:00', 'Consultoría para la mejora de los procesos '),
	('1dc7d90b-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 92, '2019-04-01 00:00:00', '2019-12-31 00:00:00', 'Realizar 13 evaluaciones de desempeño de los tipo establecidos en el Programa Anual de Evaluación 2019 (PAE 2019) a los programas presupuestarios y fondos establecidos en dicho PAE 2019 del Gobierno del Estado de Nuevo León, ejecutados con recursos del gasto federal y/o estatal. ', '11148500', '2019-12-10 00:00:00', 'PAE 2019'),
	('1dc8e0a5-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 93, '2019-09-17 00:00:00', '2020-01-31 00:00:00', 'Se requiere realizar una valuación actuarial para cuantificar el pasivo contingente que tienen los municipios del estado de Nuevo León ante sus empleados por concepto de obligaciones laborales para dar cumplimiento a la Ley General de Contabilidad Gubernamental, la Ley de Disciplina Financiera de las Entidades Federativas y los Municipios y a la normatividad emitida por el Consejo Nacional de Armonización Contable que obligan a los entes públicos a determinar una provisión para este pasivo; este pasivo se genera calculando la obligación de la Indemnización Legal de cada trabajador de manera individual debido a que cada trabajador presenta condiciones particulares, aún cuando existen perfiles similares, logrando garantizar una mayor certeza en las estimaciones de los costos futuros. ', 'min $2,435,514.00  máx $3,030,514.00', '2020-03-31 00:00:00', 'Estudio a la valuación actuarial de los pasivos laborales, Ejercicio 2019'),
	('1dca2c44-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 94, '2019-11-01 00:00:00', '2021-06-30 00:00:00', 'Dotar a la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León de un servicio que mediante la visión y misión de la mejora continua, permita analizar el estado tanto de salud como de operación que guarda el ciclo completo de implementación del Sistema de Administración de los Recursos de tipo GRP (Goverment Resources Planning) y las oportunidades de mejora. Esto con el firme propósito de promover la adopción de los lineamientos de gobernabilidad de los procesos administrativos, sustantivos y financieros en las áreas que intervienen e interactúan en la plataforma, así como los módulos en uso. Revisar y evaluar cualquier actividad de la Secretaría a nivel contable, financiero, administrativo, operativo, etc. Que intervengan o interactúen con el GRP y así validar el cabal cumplimiento de las leyes, normas, políticas y/o lineamientos aplicables. ', '20884204', '2021-08-05 00:00:00', 'Levantamiento y Análisis de la Situación actual de la Plataforma del Sistema de Administración tipo GRP '),
	('1dcb62d9-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 95, '2020-05-01 00:00:00', '2020-12-31 00:00:00', 'Realizar 25 evaluaciones de desempeño de los tipo establecidos en el Programa Anual de Evaluación 2020 (PAE 2020) a los programas presupuestarios y fondos establecidos en dicho PAE 2020 del Gobierno del Estado de Nuevo León, ejecutados con recursos del gasto federal y/o estatal. ', '21182150', '2021-02-05 00:00:00', 'PAE 2020'),
	('1dccb843-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 96, '2020-04-16 00:00:00', '2021-06-30 00:00:00', 'Se requiere realizar el Manual de Procedimientos de las áreas y actividades relacionadas con el tema de demandas y laudos laborales contra los municipios del Estado de Nuevo León, mismo que tendrá como objetivo atender las expectativas que demanda un Gobierno ordenado, honesto y transparente consolidando un modelo de gobierno que incentive una mayor eficiencia interinstitucional fortaleciendo las herramientas necesarias que permitan mejorar la eficacia y eficiencia para atender los asuntos encomendados, mediante la instrumentación, formalización y estandarización de lo métodos y procedimientos de trabajo identificando quién y cómo se realizan las actividades que dan cumplimiento a las atribuciones que de manera sistemática realizan cada una de las áreas que lo integran. ', '2200000', '2021-09-17 00:00:00', 'Manual de procedimientos de las áreas y actividades relacionadas con el tema de demandas y laudos laborales'),
	('1dcdfa8e-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 97, '2020-08-03 00:00:00', '2021-01-31 00:00:00', 'Se requiere realizar una valuación actuarial para cuantificar el pasivo contingente que tienen 32 de los municipios del estado de Nuevo León ante sus empleados por concepto de obligaciones laborales para dar cumplimiento a la Ley General de Contabilidad Gubernamental, la Ley de Disciplina Financiera de las Entidades Federativas y los Municipios y a la normatividad emitida por el Consejo Nacional de Armonización Contable que obligan a los entes públicos a determinar una provisión para este pasivo; este pasivo se genera calculando la obligación de la Indemnización Legal de cada trabajador de manera individual debido a que cada trabajador presenta condiciones particulares, aún cuando existen perfiles similares, logrando garantizar una mayor certeza en las estimaciones de los costos futuros. ', 'min $2,780,000.00  máx $3,200,000.00', '2021-02-05 00:00:00', 'Estudio a la valuación actuarial de los pasivos laborales, Ejercicio 2020'),
	('1dcf444d-c7a7-11ee-b4e1-3cd92b4d9bf4', 'e637cc5c-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:58:26', '2024-02-09 17:58:26', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 98, '2021-02-15 00:00:00', '2021-10-15 00:00:00', 'Realizar evaluaciones de los tipo establecidos en el Programa Anual de Evaluación 2021 (PAE 2021) a los programas presupuestarios y fondos establecidos en dicho PAE 2021 del Gobierno del Estado de Nuevo León, ejecutados con recursos del gasto federal y/o estatal. ', '24358000', '2021-09-28 00:00:00', 'PAE 2021'),
	('3c35729a-c781-11ee-b4e1-3cd92b4d9bf4', '84205fd7-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:27:16', '2024-02-09 13:27:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 27, '2016-11-16 00:00:00', '2017-01-31 00:00:00', 'Dar un panorama general a la Secretaría de Finanzas y Tesorería General del Gobierno de Nuevo León, de los procesos establecidos en su área de operación, con el propósito de verificar que se lleven a cabo de manera correcta las actividades sustantivas, administrativas y operativas, además de mantener adecuado control sobre la gobernabilidad de los procesos y reducir a niveles mínimos el riesgo inherente. \n', '857625', '2017-01-31 00:00:00', 'CONVENIO ESPECIFICO Y ANEXO , ETAPA 1 DIAGNÒSTICO'),
	('5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', '84205fd7-c6af-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:28:12', '2024-02-09 13:28:12', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 28, '2017-02-01 00:00:00', '2018-08-31 00:00:00', 'Optimizar los procesos administrativos de la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León a partir de un rediseño, con el propósito de promover la adopción de los lineamientos de gobernabilidad de procesos. Revisar y evaluar cualquier actividad de la Secretaría a nivel contable, financiero, administrativo, operativo, etc. y así validar el cabal cumplimiento de las normas, políticas y lineamientos aplicables. \n', 'min $8,348,874.01  max $11,918.818.72', '2019-01-15 00:00:00', 'Alineación de Procesos administrativos para la Secretaria de Finanzas de acuerdo a la normatividad del CONAC (Rediseño y Documentación de procesos Etapa II)'),
	('884ebd21-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 79, '2022-04-01 00:00:00', '2022-12-15 00:00:00', 'Realizar evaluaciones de los tipos establecidos en el Programa Anual de Evaluación 2022 (PAE 2022) a los programas presupuestarios y fondos establecidos en dicho PAE 2022 del Gobierno del Estado de Nuevo León, ejecutados con recursos del gasto federal y/o estatal.', '24517180', '2023-01-02 00:00:00', 'PAE 2022'),
	('8850f9d6-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 80, '2022-04-01 00:00:00', '2022-11-30 00:00:00', 'Realizar una valuación actuarial para cuantificar el pasivo contingente que tienen 32 de los municipios del estado de Nuevo León ante sus empleados por concepto de obligaciones laborales para dar cumplimiento a la Ley General de Contabilidad Gubernamental , la Ley de Disciplina Financiera de las Entidades Federativas y los Municipios y a la normatividad emitida por el Consejo Nacional de Armonización Contable que obligan a los entes públicos a determinar una provisión para este pasivo; este pasivo se genera calculando la obligación de la Indemnización Legal de cada trabajador de manera individual debido a que cada trabajador presenta condiciones particulares, aun cuando existen perfiles similares, logrando garantizar una mayor certeza en las estimaciones de los costos futuros. ', 'min $3,369,800.00  máx $3,897,600.00', '2023-12-05 00:00:00', 'Estudio a la valuación actuarial de los pasivos laborales, Ejercicio 2021'),
	('885192b0-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 81, '2022-08-01 00:00:00', '2022-12-31 00:00:00', 'Actualizar los determinantes de la calidad del gasto público en el Gobierno del Estado de Nuevo León como los son: a) el marco jurídico - administrativo del Presupuesto basado en Resultados y del Sistema de Evaluación del Desempeño (PbR-SED); b) la estructura programática presupuestal del gasto público estatal; c) la transformación digital del modelo PbR-SED, y d) la formació técnica de las personas servidoras públicas en materia de gestión pública para resultados. ', '10643348', '2023-08-21 00:00:00', 'Consultoría Especializada para Mejorar los Determinantes de la Calidad'),
	('885419e7-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 82, '2022-08-01 00:00:00', '2022-12-31 00:00:00', 'Dotar a la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León de un servicio que le permita evaluar las condiciones del centro de datos y así pueda contar con la certeza y la confianza a nivel operativo y de seguridad del propio centro de datos.', '2807385.6', '2023-01-31 00:00:00', 'Evaluación de los Activos Tecnológicos del Centro de Datos de la SFyTGE '),
	('885583b8-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 83, '2023-01-01 00:00:00', '2023-12-31 00:00:00', 'Apoyar a la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León a la gestión de servicios de sus plataformas de información, que le permita eficientar la gobernabilidad y los tiempos de atención a diversos procesos administrativos transversales dependientes de dichas plataformas, así como la implementación de una mejora continua de esta gestión. ', 'min $15,536,947.20  máx $42,119,692.80', '2024-02-09 00:00:00', 'Consultoría para el manejo y gestión de las plataformas tecnológicas de la SFyTGE, 2023'),
	('8856b9ff-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 84, '2022-04-01 00:00:00', '2022-11-30 00:00:00', 'Realizar una valuación actuarial para cuantificar el pasivo contingente que tienen 32 de los municipios del estado de Nuevo León ante sus empleados por concepto de obligaciones laborales para dar cumplimiento a la Ley General de Contabilidad Gubernamental, la Ley de Disciplina Financiera de las Entidades Federativas y los Municipios y a la normatividad emitida por el Consejo Nacional de Armonización Contable que obligan a lso entes públicos a determinar una provisión para este pasivo; este pasivo se genera calculando la obligación de la Indemnización Legal de cada trabajador de manera individual debido a que cada trabajador presenta condiciones particulares, aun cuando existen perfiles similares, logrando garantizar una mayor certeza en las estimaciones de los costos futuros. ', 'min $3,369,800.00  máx $3,897,600.00', '2024-02-09 00:00:00', 'Estudio a la valuación actuarial de los pasivos laborales, Ejercicio 2022'),
	('88583a40-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 85, '2023-05-15 00:00:00', '2023-12-15 00:00:00', 'Realizar evaluaciones de los tipos establecidos en el Programa Anual de Evaluación 2023 (PAE 2023) a los programas presupuestarios y fondos establecidos en dicho PAE 2023 del Gobierno del Estado de Nuevo León, ejecutados con recursos del gasto federal y/o estatal.', '19499600', '2024-02-09 00:00:00', 'PAE 2023'),
	('885d37db-c7a6-11ee-b4e1-3cd92b4d9bf4', '5afc6965-c6b0-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 17:54:16', '2024-02-09 17:54:16', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 86, '2023-05-15 00:00:00', '2023-12-15 00:00:00', 'Derivado de la adopción de mejores ', '19499600', '2024-02-09 00:00:00', 'Consultoría para la mejora del Centro de Datos de la Secretaría de Finanzas y Tesorería General del Estado de Nuevo León ');

-- Volcando estructura para tabla PLADI.inap_gral_01_01
DROP TABLE IF EXISTS `inap_gral_01_01`;
CREATE TABLE IF NOT EXISTS `inap_gral_01_01` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `IdGral01` char(36) NOT NULL DEFAULT uuid(),
  `Clave` int(11) NOT NULL,
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `FechaEntregable` datetime DEFAULT NULL,
  `Nombre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `FK1_GRAL_0101` (`IdGral01`),
  KEY `Clave` (`Clave`),
  CONSTRAINT `FK1_GRAL_0101` FOREIGN KEY (`IdGral01`) REFERENCES `inap_gral_01` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información de los entregables';

-- Volcando datos para la tabla PLADI.inap_gral_01_01: ~6 rows (aproximadamente)
DELETE FROM `inap_gral_01_01`;
INSERT INTO `inap_gral_01_01` (`Id`, `IdGral01`, `Clave`, `Deleted`, `UltimaActualizacion`, `FechaCreacion`, `ModificadoPor`, `CreadoPor`, `FechaEntregable`, `Nombre`) VALUES
	('3a06729c-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 1, 0, '2024-02-09 13:34:22', '2024-02-09 13:34:22', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2021-02-01 00:00:00', 'Firma del Convenio de Colaboración '),
	('423297a1-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 2, 0, '2024-02-09 13:34:36', '2024-02-09 13:34:36', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-02-28 00:00:00', 'Plan de trabajo'),
	('4abcc9ae-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 3, 0, '2024-02-09 13:34:50', '2024-02-09 13:34:50', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-08-31 00:00:00', 'Entrega parcial 62 procesos as-is '),
	('52b225f5-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 4, 0, '2024-02-09 13:35:04', '2024-02-09 13:35:04', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-10-23 00:00:00', 'Entrega parcial 57 procesos as-is'),
	('5db74744-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 5, 0, '2024-02-09 13:35:22', '2024-02-09 13:35:22', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-06-11 00:00:00', 'Entrega parcial 70 procesos as-is '),
	('685f8214-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 6, 0, '2024-02-09 13:35:40', '2024-02-09 13:35:40', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-06-11 00:00:00', 'Entrega parcial 105 procesos as-is y 278 procesos to-be'),
	('79b6a2a4-c781-11ee-b4e1-3cd92b4d9bf4', '3c35729a-c781-11ee-b4e1-3cd92b4d9bf4', 1, 0, '2024-02-09 13:29:00', '2024-02-09 13:29:00', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2016-12-15 00:00:00', 'Diagnóstico');

-- Volcando estructura para tabla PLADI.inap_gral_01_02
DROP TABLE IF EXISTS `inap_gral_01_02`;
CREATE TABLE IF NOT EXISTS `inap_gral_01_02` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `IdGral01` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `FechaActa` datetime DEFAULT NULL,
  `NombreActa` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `FK1_GRAL_02` (`IdGral01`),
  CONSTRAINT `FK1_GRAL_02` FOREIGN KEY (`IdGral01`) REFERENCES `inap_gral_01` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información de las actas';

-- Volcando datos para la tabla PLADI.inap_gral_01_02: ~4 rows (aproximadamente)
DELETE FROM `inap_gral_01_02`;
INSERT INTO `inap_gral_01_02` (`Id`, `IdGral01`, `Deleted`, `UltimaActualizacion`, `FechaCreacion`, `ModificadoPor`, `CreadoPor`, `FechaActa`, `NombreActa`) VALUES
	('86c8b189-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:36:31', '2024-02-09 13:36:31', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-10-02 00:00:00', 'Acta de entrega , 62 procesos'),
	('8df9bd70-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:36:43', '2024-02-09 13:36:43', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-02-02 00:00:00', 'Acta procesos firmada , segunda entrega parcial (57 procesos)'),
	('94398929-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:36:54', '2024-02-09 13:36:54', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-06-11 00:00:00', 'Acta entrega 70 procesos'),
	('9fdfbbea-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:37:13', '2024-02-09 13:37:13', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2021-08-31 00:00:00', 'Minuta de entrega, entregable 6');

-- Volcando estructura para tabla PLADI.inap_gral_01_03
DROP TABLE IF EXISTS `inap_gral_01_03`;
CREATE TABLE IF NOT EXISTS `inap_gral_01_03` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `IdGral01` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `FechaFactura` datetime DEFAULT NULL,
  `Factura` varchar(200) DEFAULT NULL,
  `RouteFactura` varchar(300) DEFAULT NULL,
  `NombreFile` varchar(200) DEFAULT NULL,
  `Monto` double(20,2) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `FK1_GRAL_03` (`IdGral01`),
  CONSTRAINT `FK1_GRAL_03` FOREIGN KEY (`IdGral01`) REFERENCES `inap_gral_01` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='guarda la información de las Facturas';

-- Volcando datos para la tabla PLADI.inap_gral_01_03: ~6 rows (aproximadamente)
DELETE FROM `inap_gral_01_03`;
INSERT INTO `inap_gral_01_03` (`Id`, `IdGral01`, `Deleted`, `UltimaActualizacion`, `FechaCreacion`, `ModificadoPor`, `CreadoPor`, `FechaFactura`, `Factura`, `RouteFactura`, `NombreFile`, `Monto`) VALUES
	('098fe210-c783-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:40:11', '2024-02-09 13:40:11', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-09-06 00:00:00', '14812', NULL, NULL, 1065722.39),
	('14f3adc4-c783-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:40:30', '2024-02-09 13:40:30', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-11-29 00:00:00', '15318', NULL, NULL, 1968789.12),
	('930a86ce-c781-11ee-b4e1-3cd92b4d9bf4', '3c35729a-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:29:42', '2024-02-09 13:29:42', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-02-20 00:00:00', '10265', NULL, NULL, 994845.00),
	('db3342ab-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:38:53', '2024-02-09 13:38:53', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-05-04 00:00:00', '10852', NULL, NULL, 2764831.00),
	('e3aec757-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:39:07', '2024-02-09 13:39:07', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-05-04 00:00:00', '10853', NULL, NULL, 2073623.25),
	('ec627b27-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:39:22', '2024-02-09 13:39:22', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2017-12-05 00:00:00', '12906', NULL, NULL, 943925.55),
	('f98b9045-c782-11ee-b4e1-3cd92b4d9bf4', '5d63deb0-c781-11ee-b4e1-3cd92b4d9bf4', 0, '2024-02-09 13:39:44', '2024-02-09 13:39:44', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '44473f52-b3c9-11ee-b473-3cd92b4d9bf4', '2018-02-20 00:00:00', '13542', NULL, NULL, 867802.52);

-- Volcando estructura para tabla PLADI.inap_gral_01_03_01
DROP TABLE IF EXISTS `inap_gral_01_03_01`;
CREATE TABLE IF NOT EXISTS `inap_gral_01_03_01` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `IdGral0103` char(36) NOT NULL,
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `FechaPresupuesto` datetime DEFAULT NULL,
  `FechaPAgo` datetime DEFAULT NULL,
  `RouteSpei` longtext DEFAULT NULL,
  `NombreFile` longtext DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `FK1_GRAL0103` (`IdGral0103`),
  CONSTRAINT `FK1_GRAL0103` FOREIGN KEY (`IdGral0103`) REFERENCES `inap_gral_01_03` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información del Pago de la factura';

-- Volcando datos para la tabla PLADI.inap_gral_01_03_01: ~1 rows (aproximadamente)
DELETE FROM `inap_gral_01_03_01`;

-- Volcando estructura para tabla PLADI.ppi
DROP TABLE IF EXISTS `ppi`;
CREATE TABLE IF NOT EXISTS `ppi` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `Orden` varchar(700) DEFAULT NULL,
  `Noficio` varchar(50) DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  `TipoOficio` varchar(50) DEFAULT NULL,
  `Dependencia` varchar(500) DEFAULT NULL,
  `Descripcion` varchar(500) DEFAULT NULL,
  `Importe` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.ppi: ~0 rows (aproximadamente)
DELETE FROM `ppi`;

-- Volcando estructura para tabla PLADI.siregob_01
DROP TABLE IF EXISTS `siregob_01`;
CREATE TABLE IF NOT EXISTS `siregob_01` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idContrato` varchar(500) NOT NULL DEFAULT '',
  `NombreContrato` longtext DEFAULT NULL,
  `FechaContrato` datetime DEFAULT NULL,
  `pdfContrato` varchar(500) DEFAULT NULL,
  `ObjetivoContrato` longtext DEFAULT NULL,
  `MontoContrato` varchar(700) DEFAULT NULL,
  `PropuestaTecnica` varchar(700) DEFAULT NULL,
  `PropuestaEconomica` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_01: ~0 rows (aproximadamente)
DELETE FROM `siregob_01`;

-- Volcando estructura para tabla PLADI.siregob_02
DROP TABLE IF EXISTS `siregob_02`;
CREATE TABLE IF NOT EXISTS `siregob_02` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `DerechosAutor` varchar(700) DEFAULT NULL,
  `SolicitudExcepcion` varchar(700) DEFAULT NULL,
  `Terminos` varchar(700) DEFAULT NULL,
  `FichaTecnica` varchar(700) DEFAULT NULL,
  `CartaProtesta` varchar(700) DEFAULT NULL,
  `CartaProtesta2` varchar(700) DEFAULT NULL,
  `DeclaracionIntegridad` varchar(700) DEFAULT NULL,
  `ActaConstitutivas` varchar(700) DEFAULT NULL,
  `PoderLegal` varchar(700) DEFAULT NULL,
  `PadronProveedores` varchar(700) DEFAULT NULL,
  `Rfc` varchar(700) DEFAULT NULL,
  `cv` varchar(700) DEFAULT NULL,
  `ClavePresupuestal` varchar(700) DEFAULT NULL,
  `Acta` varchar(700) DEFAULT NULL,
  `CartaDomicilio` varchar(700) DEFAULT NULL,
  `Fianza` varchar(700) DEFAULT NULL,
  `Poliza` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_02: ~0 rows (aproximadamente)
DELETE FROM `siregob_02`;

-- Volcando estructura para tabla PLADI.siregob_03
DROP TABLE IF EXISTS `siregob_03`;
CREATE TABLE IF NOT EXISTS `siregob_03` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idsiregob02` char(36) DEFAULT NULL,
  `Requisicion` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_03: ~0 rows (aproximadamente)
DELETE FROM `siregob_03`;

-- Volcando estructura para tabla PLADI.siregob_04
DROP TABLE IF EXISTS `siregob_04`;
CREATE TABLE IF NOT EXISTS `siregob_04` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idsiregob02` char(36) DEFAULT NULL,
  `Vale` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_04: ~0 rows (aproximadamente)
DELETE FROM `siregob_04`;

-- Volcando estructura para tabla PLADI.siregob_05
DROP TABLE IF EXISTS `siregob_05`;
CREATE TABLE IF NOT EXISTS `siregob_05` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idsiregob02` char(36) DEFAULT NULL,
  `Orden` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_05: ~0 rows (aproximadamente)
DELETE FROM `siregob_05`;

-- Volcando estructura para tabla PLADI.siregob_06
DROP TABLE IF EXISTS `siregob_06`;
CREATE TABLE IF NOT EXISTS `siregob_06` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idsiregob02` char(36) DEFAULT NULL,
  `Entregable` longtext DEFAULT NULL,
  `Finicio` datetime DEFAULT NULL,
  `Ffin` datetime DEFAULT NULL,
  `PdfEntregable` varchar(700) DEFAULT NULL,
  `FinicioActa` datetime DEFAULT NULL,
  `FfinActa` datetime DEFAULT NULL,
  `PdfActa` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_06: ~0 rows (aproximadamente)
DELETE FROM `siregob_06`;

-- Volcando estructura para tabla PLADI.siregob_07
DROP TABLE IF EXISTS `siregob_07`;
CREATE TABLE IF NOT EXISTS `siregob_07` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `idsiregob06` char(36) DEFAULT NULL,
  `FechaFactura` datetime DEFAULT NULL,
  `Factura` varchar(50) DEFAULT NULL,
  `PdfFactura` varchar(700) DEFAULT NULL,
  `importe` decimal(20,2) DEFAULT NULL,
  `OrdenPago` varchar(700) DEFAULT NULL,
  `SPEI` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='Guarda la información general del Convenio';

-- Volcando datos para la tabla PLADI.siregob_07: ~0 rows (aproximadamente)
DELETE FROM `siregob_07`;

-- Volcando estructura para tabla PLADI.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Deleted` int(1) NOT NULL DEFAULT 0,
  `UltimaActualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificadoPor` char(36) NOT NULL,
  `CreadoPor` char(36) NOT NULL DEFAULT '',
  `NombreUsuario` varchar(30) NOT NULL,
  `Nombre` varchar(70) NOT NULL,
  `ApellidoPaterno` varchar(40) NOT NULL,
  `ApellidoMaterno` varchar(40) NOT NULL,
  `CorreoElectronico` varchar(100) NOT NULL,
  `Puesto` varchar(255) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `CURP` varchar(18) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Ext` varchar(4) NOT NULL,
  `Celular` varchar(10) NOT NULL,
  `UltimoInicioDeSesion` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla PLADI.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`Id`, `Deleted`, `UltimaActualizacion`, `FechaCreacion`, `ModificadoPor`, `CreadoPor`, `NombreUsuario`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `CorreoElectronico`, `Puesto`, `Contrasena`, `CURP`, `RFC`, `Telefono`, `Ext`, `Celular`, `UltimoInicioDeSesion`) VALUES
	('44473f52-b3c9-11ee-b473-3cd92b4d9bf4', 0, '2024-01-15 11:13:13', '2024-01-15 11:11:16', '1', '1', 'aagarcia', 'Adolfo Angel', 'Garcia', 'Martinez', 'aagarcia@cecapmex.com', 'Sistemas', 'a', 'a', 'a', '8126902423', '6224', '8126902423', '2024-01-15 11:12:34');

-- Volcando estructura para procedimiento PLADI.sp_error
DROP PROCEDURE IF EXISTS `sp_error`;
DELIMITER //
CREATE PROCEDURE `sp_error`(
	IN `P_ERROR` VARCHAR(500)
)
BEGIN
DECLARE Respuesta INT;
SET Respuesta = 500;
SELECT	Respuesta,	P_ERROR AS Mensaje;
END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_files
DROP PROCEDURE IF EXISTS `sp_files`;
DELIMITER //
CREATE PROCEDURE `sp_files`(
	IN `TIPO` INT,
	IN `P_IDOWNER` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_Nombre` VARCHAR(100),
	IN `P_Ruta` LONGTEXT,
	IN `P_ID` CHAR(36)
)
BEGIN

DECLARE Respuesta INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
            @errno = MYSQL_ERRNO,
            @text = MESSAGE_TEXT;

        SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
        CALL sp_error(@full_error);
    END;

   
     IF TIPO = 1 THEN
        INSERT INTO PLADI.files_gral (
            `ModificadoPor`,
            `CreadoPor`,
            `idowner`,
            `NombreFile`,
            `Ruta`
           
        ) VALUES (
            P_CreadoPor,
            P_CreadoPor,
            P_IDOWNER,
            P_Nombre,
            P_Ruta
        );
        
        
    ELSEIF TIPO = 2 THEN
        UPDATE `files_gral`
        SET `Deleted` = 1
        WHERE `Id` = P_Id;
        
    ELSEIF TIPO = 3 THEN
       
   
    
   SELECT 
 	Id,
	Deleted,
	UltimaActualizacion,
	FechaCreacion,
	ModificadoPor,
	CreadoPor,
	idowner,
	NombreFile,
   REPLACE(Ruta, '\\', '/') AS Ruta
   FROM PLADI.files_gral fg
    WHERE fg.idowner = P_IDOWNER;
   
   
    END IF;
    
  

    CALL sp_response();
END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_inapgral_01_01_CRUD
DROP PROCEDURE IF EXISTS `sp_inapgral_01_01_CRUD`;
DELIMITER //
CREATE PROCEDURE `sp_inapgral_01_01_CRUD`(
	IN `TIPO` INT,
	IN `P_Id` CHAR(36),
	IN `P_IdGral01` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_FechaEntregable` DATETIME,
	IN `P_Nombre` VARCHAR(200)
)
BEGIN

DECLARE Respuesta INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
            @errno = MYSQL_ERRNO,
            @text = MESSAGE_TEXT;

        SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
        CALL sp_error(@full_error);
    END;

    IF TIPO = 1 THEN
       
       SELECT COUNT(1)+1 INTO @clave FROM PLADI.inap_gral_01_01 WHERE IdGral01 =P_IdGral01 AND  Deleted=0;
    
    
        INSERT INTO PLADI.inap_gral_01_01 (
            `IdGral01`,
            `ModificadoPor`,
            `CreadoPor`,
            `FechaEntregable`,
             Clave,
            `Nombre`
           
        ) VALUES (
     
            P_IdGral01,
            P_CreadoPor,
            P_CreadoPor,
            P_FechaEntregable,
            @clave,
            P_Nombre
         
        );
    ELSEIF TIPO = 2 THEN
        UPDATE PLADI.inap_gral_01_01 
        SET
            `ModificadoPor` = P_CreadoPor,
            `FechaEntregable` = P_FechaEntregable,
            `Nombre` = P_Nombre
           
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 3 THEN
        UPDATE `inap_gral_01_01`
        SET `Deleted` = 1
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 4 THEN
        SELECT
            inap.Id,
            inap.IdGral01,
            inap.Clave,
            inap.Deleted,
            inap.UltimaActualizacion,
            inap.FechaCreacion,
            inap.ModificadoPor,
            inap.CreadoPor,
            inap.FechaEntregable,
            inap.Nombre
           
        FROM PLADI.inap_gral_01_01  inap;
    END IF;

    CALL sp_response();
END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_inapgral_01_02_CRUD
DROP PROCEDURE IF EXISTS `sp_inapgral_01_02_CRUD`;
DELIMITER //
CREATE PROCEDURE `sp_inapgral_01_02_CRUD`(
	IN `TIPO` INT,
	IN `P_Id` CHAR(36),
	IN `P_IdGral01` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_FechaActa` DATETIME,
	IN `P_NombreActa` VARCHAR(200)
)
BEGIN
    DECLARE Respuesta INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
            @errno = MYSQL_ERRNO,
            @text = MESSAGE_TEXT;

        SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
        CALL sp_error(@full_error);
    END;

    IF TIPO = 1 THEN
        INSERT INTO `inap_gral_01_02` (
           
            `IdGral01`,
            `ModificadoPor`,
            `CreadoPor`,
            `FechaActa`,
            `NombreActa`
         
        ) VALUES (
          
            P_IdGral01,
            P_CreadoPor,
            P_CreadoPor,
            P_FechaActa,
            P_NombreActa
         
        );
    ELSEIF TIPO = 2 THEN
        UPDATE `inap_gral_01_02`
        SET
            `ModificadoPor` = P_CreadoPor,
            `FechaActa` = P_FechaActa,
            `NombreActa` = P_NombreActa
          
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 3 THEN
        UPDATE `inap_gral_01_02`
        SET `Deleted` = 1
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 4 THEN
        SELECT
            inap.Id,
            inap.IdGral01,
            inap.Deleted,
            inap.UltimaActualizacion,
            inap.FechaCreacion,
            inap.ModificadoPor,
            inap.CreadoPor,
            inap.FechaActa,
            inap.NombreActa
           
        FROM `inap_gral_01_02` inap;
    END IF;

    CALL sp_response();

END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_inapgral_01_03_01_CRUD
DROP PROCEDURE IF EXISTS `sp_inapgral_01_03_01_CRUD`;
DELIMITER //
CREATE PROCEDURE `sp_inapgral_01_03_01_CRUD`(
	IN `TIPO` INT,
	IN `P_Id` CHAR(36),
	IN `P_IdGral0103` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_FechaPresupuesto` DATETIME,
	IN `P_FechaPAgo` DATETIME,
	IN `RouteSpei` LONGTEXT,
	IN `nombrefile` LONGTEXT
)
BEGIN
    DECLARE Respuesta INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
            @errno = MYSQL_ERRNO,
            @text = MESSAGE_TEXT;

        SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
        CALL sp_error(@full_error);
    END;

    IF TIPO = 1 THEN
        INSERT INTO `inap_gral_01_03_01` (
            
            `IdGral0103`,
            `ModificadoPor`,
            `CreadoPor`,
            `FechaPresupuesto`,
            `FechaPAgo`,
            RouteSpei,
            NombreFile
           
        ) VALUES (
          
            P_IdGral0103,
            P_CreadoPor,
            P_CreadoPor,
            P_FechaPresupuesto,
            P_FechaPAgo,
            RouteSpei,
            nombrefile
           
        );
    ELSEIF TIPO = 2 THEN
        UPDATE `inap_gral_01_03_01`
        SET
            `ModificadoPor` = P_CreadoPor,
            `FechaPresupuesto` = P_FechaPresupuesto,
            `FechaPAgo` = P_FechaPAgo
           
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 3 THEN
        UPDATE `inap_gral_01_03_01`
        SET `Deleted` = 1
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 4 THEN
        SELECT
            inap.Id,
            inap.IdGral0103,
            inap.Deleted,
            inap.UltimaActualizacion,
            inap.FechaCreacion,
            inap.ModificadoPor,
            inap.CreadoPor,
            inap.FechaPresupuesto,
            inap.FechaPAgo,
            RouteSpei,
            NombreFile
           
        FROM `inap_gral_01_03_01` inap
        WHERE inap.Deleted=0;
    END IF;

    CALL sp_response();


END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_inapgral_01_03_CRUD
DROP PROCEDURE IF EXISTS `sp_inapgral_01_03_CRUD`;
DELIMITER //
CREATE PROCEDURE `sp_inapgral_01_03_CRUD`(
	IN `TIPO` INT,
	IN `P_Id` CHAR(36),
	IN `P_IdGral01` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_FechaFactura` DATETIME,
	IN `P_Factura` VARCHAR(200),
	IN `P_Monto` DOUBLE(20, 2)
)
BEGIN
    DECLARE Respuesta INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
            @errno = MYSQL_ERRNO,
            @text = MESSAGE_TEXT;

        SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
        CALL sp_error(@full_error);
    END;

    IF TIPO = 1 THEN
        INSERT INTO `inap_gral_01_03` (
           
            `IdGral01`,
            `ModificadoPor`,
            `CreadoPor`,
            `FechaFactura`,
            `Factura`,
            `Monto`
        ) VALUES (
           
            P_IdGral01,
            P_CreadoPor,
            P_CreadoPor,
            P_FechaFactura,
            P_Factura,
            P_Monto
        );
    ELSEIF TIPO = 2 THEN
        UPDATE `inap_gral_01_03`
        SET
            `ModificadoPor` = P_CreadoPor,
            `FechaFactura` = P_FechaFactura,
            `Factura` = P_Factura,
            `Monto` = P_Monto
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 3 THEN
        UPDATE `inap_gral_01_03`
        SET `Deleted` = 1
        WHERE `Id` = P_Id;
    ELSEIF TIPO = 4 THEN
        SELECT
            inap.Id,
            inap.IdGral01,
            inap.Deleted,
            inap.UltimaActualizacion,
            inap.FechaCreacion,
            inap.ModificadoPor,
            inap.CreadoPor,
            inap.FechaFactura,
            inap.Factura,
            inap.Monto
        FROM `inap_gral_01_03` inap;
    END IF;

    CALL sp_response();
END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_inapgral_01_CRUD
DROP PROCEDURE IF EXISTS `sp_inapgral_01_CRUD`;
DELIMITER //
CREATE PROCEDURE `sp_inapgral_01_CRUD`(
	IN `TIPO` INT,
	IN `P_Id` CHAR(36),
	IN `P_IdGral` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_FechaConvenioinicio` DATETIME,
	IN `P_FechaConveniofin` DATETIME,
	IN `P_NombreConvenio` VARCHAR(200),
	IN `P_Objetivo` LONGTEXT,
	IN `P_Monto` VARCHAR(300),
	IN `P_FechaFiniquito` DATETIME
)
BEGIN DECLARE Respuesta INT;

DECLARE EXIT
HANDLER FOR
SQLEXCEPTION BEGIN GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
                                                             @errno = MYSQL_ERRNO,
                                                             @text = MESSAGE_TEXT;


SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
CALL sp_error(@full_error);



END;




IF TIPO = 1 THEN

INSERT INTO inap_gral_01 (
    IdGral,
    ModificadoPor,
    CreadoPor,
    FechaConvenioinicio,
    FechaConveniofin,
    NombreConvenio,
    Objetivo,
    Monto,
    FechaFiniquito
 
) VALUES (
     P_IdGral,
     P_CreadoPor,
     P_CreadoPor,
     P_FechaConvenioinicio,
     P_FechaConveniofin,
     P_NombreConvenio,
     P_Objetivo,
     P_Monto,
     P_FechaFiniquito
);

ELSEIF TIPO = 2 THEN
UPDATE inap_gral_01
SET
   
    ModificadoPor = P_CreadoPor,  
    FechaConvenioinicio = P_FechaConvenioinicio,
    FechaConveniofin = P_FechaConveniofin,
    NombreConvenio = P_NombreConvenio,
    Objetivo = P_Objetivo,
    Monto = P_Monto,
    FechaFiniquito = P_FechaFiniquito
  
WHERE
    Id = P_Id;  

ELSEIF TIPO = 3 THEN
UPDATE PLADI.inap_gral_01 inap
SET inap.Deleted=1
WHERE inap.Id = P_Id;

ELSEIF TIPO = 4 THEN
SELECT 
   inap01.Id,
	inap01.IdGral,
	inap01.Deleted,
	inap01.UltimaActualizacion,
	inap01.FechaCreacion,
	inap01.ModificadoPor,
	inap01.CreadoPor,
	inap01.Clave,
	inap01.FechaConvenioinicio,
	inap01.FechaConveniofin,
	inap01.NombreConvenio,
	inap01.Objetivo,
	inap01.Monto,
	inap01.FechaFiniquito

FROM PLADI.inap_gral_01 inap01
WHERE inap01.Deleted =0
ORDER BY inap01.FechaCreacion 
;

ELSEIF TIPO = 5 THEN
SELECT 
   inap01.Id,
	inap01.IdGral,
	inap01.Deleted,
	inap01.UltimaActualizacion,
	inap01.FechaCreacion,
	inap01.ModificadoPor,
	inap01.CreadoPor,
	inap01.Clave,
	inap01.FechaConvenioinicio,
	inap01.FechaConveniofin,
	inap01.NombreConvenio,
	inap01.Objetivo,
	inap01.Monto,
	inap01.FechaFiniquito

FROM PLADI.inap_gral_01 inap01 WHERE inap01.IdGral=P_IdGral
AND inap01.Deleted =0
ORDER BY inap01.FechaCreacion desc
;

ELSEIF TIPO = 6 THEN

SELECT
   -- entregable
	inap0101.Id AS inap0101_Id,
   inap0101.Clave AS inap0101_Clave,
	inap0101.IdGral01 AS inap0101_IdGral01,
	inap0101.Deleted AS inap0101_Deleted,
	inap0101.UltimaActualizacion AS inap0101_UltimaActualizacion,
	inap0101.FechaCreacion AS inap0101_FechaCreacion,
	inap0101.ModificadoPor AS inap0101_ModificadoPor,
	inap0101.CreadoPor AS inap0101_CreadoPor,
	inap0101.FechaEntregable AS inap0101_FechaEntregable,
	inap0101.Nombre AS inap0101_Nombre,

    -- actas
   inap0102.Id AS inap0102_Id,
	inap0102.IdGral01 AS inap0102_IdGral01,
	inap0102.Deleted AS inap0102_Deleted,
	inap0102.UltimaActualizacion AS inap0102_UltimaActualizacion,
	inap0102.FechaCreacion AS inap0102_FechaCreacion,
	inap0102.ModificadoPor AS inap0102_ModificadoPor,
	inap0102.CreadoPor AS inap0102_CreadoPor,
	inap0102.FechaActa AS inap0102_FechaActa,
	inap0102.NombreActa AS inap0102_NombreActa,

   -- facturas
   inap0103.Id AS inap0103_Id,
	inap0103.IdGral01 AS inap0103_IdGral01,
	inap0103.Deleted AS inap0103_Deleted,
	inap0103.UltimaActualizacion AS inap0103_UltimaActualizacion,
	inap0103.FechaCreacion AS inap0103_FechaCreacion,
	inap0103.ModificadoPor AS inap0103_ModificadoPor,
	inap0103.CreadoPor AS inap0103_CreadoPor,
	inap0103.FechaFactura AS inap0103_FechaFactura,
	inap0103.Factura AS inap0103_Factura,
	inap0103.Monto AS inap0103_Monto
  
   
FROM
	PLADI.inap_gral_01 inap01
LEFT JOIN PLADI.inap_gral_01_01 inap0101 ON  inap0101.IdGral01 =   inap01.Id
LEFT JOIN PLADI.inap_gral_01_02 inap0102 ON  inap0102.IdGral01 =   inap01.Id
LEFT JOIN PLADI.inap_gral_01_03 inap0103 ON  inap0103.IdGral01 =   inap01.Id
WHERE inap01.Id=P_IdGral
AND inap01.Deleted=0
;


ELSEIF TIPO = 7 THEN
SELECT 
inap010301.*
FROM
PLADI.inap_gral_01 inap01
LEFT JOIN PLADI.inap_gral_01_03 inap0103 ON  inap0103.IdGral01 =   inap01.Id
LEFT JOIN PLADI.inap_gral_01_03_01 inap010301 ON  inap0103.Id =   inap010301.IdGral0103
WHERE inap0103.Id=P_IdGral
AND inap0103.Deleted =0
ORDER BY inap010301.FechaCreacion 
;

ELSEIF TIPO = 8 THEN


SELECT
   -- entregable
	inap0101.Id,
   inap0101.Clave AS inap0101_Clave,
	inap0101.IdGral01 AS inap0101_IdGral01,
	inap0101.Deleted AS inap0101_Deleted,
	inap0101.UltimaActualizacion AS inap0101_UltimaActualizacion,
	inap0101.FechaCreacion AS inap0101_FechaCreacion,
	inap0101.ModificadoPor AS inap0101_ModificadoPor,
	inap0101.CreadoPor AS inap0101_CreadoPor,
	inap0101.FechaEntregable AS inap0101_FechaEntregable,
	inap0101.Nombre AS inap0101_Nombre

FROM
	PLADI.inap_gral_01 inap01
LEFT JOIN PLADI.inap_gral_01_01 inap0101 ON  inap0101.IdGral01 =   inap01.Id
WHERE inap01.Id=P_IdGral
and inap0101.Deleted = 0
ORDER BY inap0101.Clave asc
;


ELSEIF TIPO = 9 THEN

SELECT
    -- actas
   inap0102.Id,
	inap0102.IdGral01 AS inap0102_IdGral01,
	inap0102.Deleted AS inap0102_Deleted,
	inap0102.UltimaActualizacion AS inap0102_UltimaActualizacion,
	inap0102.FechaCreacion AS inap0102_FechaCreacion,
	inap0102.ModificadoPor AS inap0102_ModificadoPor,
	inap0102.CreadoPor AS inap0102_CreadoPor,
	inap0102.FechaActa AS inap0102_FechaActa,
	inap0102.NombreActa AS inap0102_NombreActa
   
FROM
	PLADI.inap_gral_01 inap01
LEFT JOIN PLADI.inap_gral_01_02 inap0102 ON  inap0102.IdGral01 =   inap01.Id
WHERE inap01.Id=P_IdGral
AND inap0102.Deleted = 0;

ELSEIF TIPO = 10 THEN


SELECT
   -- facturas
   inap0103.Id,
	inap0103.IdGral01 AS inap0103_IdGral01,
	inap0103.Deleted AS inap0103_Deleted,
	inap0103.UltimaActualizacion AS inap0103_UltimaActualizacion,
	inap0103.FechaCreacion AS inap0103_FechaCreacion,
	inap0103.ModificadoPor AS inap0103_ModificadoPor,
	inap0103.CreadoPor AS inap0103_CreadoPor,
	inap0103.FechaFactura AS inap0103_FechaFactura,
	inap0103.Factura AS inap0103_Factura,
	inap0103.Monto AS inap0103_Monto
  
FROM
	PLADI.inap_gral_01 inap01
LEFT JOIN PLADI.inap_gral_01_03 inap0103 ON  inap0103.IdGral01 =   inap01.Id
WHERE inap0103.IdGral01=P_IdGral
AND inap0103.Deleted =0
ORDER BY inap0103.FechaCreacion
;

END IF;


CALL sp_response();
END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_inapgral_CRUD
DROP PROCEDURE IF EXISTS `sp_inapgral_CRUD`;
DELIMITER //
CREATE PROCEDURE `sp_inapgral_CRUD`(
	IN `TIPO` INT,
	IN `P_Id` CHAR(36),
	IN `P_CreadoPor` CHAR(36),
	IN `P_FechaConveniogrlinicio` DATETIME,
	IN `P_FechaConveniogrlfin` DATETIME,
	IN `P_NombreConvenio` VARCHAR(200)
)
BEGIN DECLARE Respuesta INT;

DECLARE EXIT
HANDLER FOR
SQLEXCEPTION BEGIN GET DIAGNOSTICS CONDITION 1 @sqlstateno = RETURNED_SQLSTATE,
                                                             @errno = MYSQL_ERRNO,
                                                             @text = MESSAGE_TEXT;


SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
CALL sp_error(@full_error);



END;




IF TIPO = 1 THEN
 SELECT COUNT(1)+1 INTO @clave FROM PLADI.inap_gral WHERE Deleted=0;
INSERT INTO `inap_gral` (`ModificadoPor`, `CreadoPor`, `FechaConveniogrlinicio`, `FechaConveniogrlfin`,  `NombreConvenio`,Clave)
VALUES (P_CreadoPor, P_CreadoPor, P_FechaConveniogrlinicio, P_FechaConveniogrlfin,  P_NombreConvenio,@clave);

ELSEIF TIPO = 2 THEN
UPDATE `inap_gral`
SET `ModificadoPor` = P_CreadoPor,
    `FechaConveniogrlinicio` = P_FechaConveniogrlinicio,
    `FechaConveniogrlfin` = P_FechaConveniogrlfin,
    `NombreConvenio` = P_NombreConvenio
WHERE `Id` = P_Id;

ELSEIF TIPO = 3 THEN
UPDATE PLADI.inap_gral inap
SET inap.Deleted=1
WHERE inap.Id = P_Id;

ELSEIF TIPO = 4 THEN
SELECT inap.Id,
       inap.Clave,
       inap.Deleted,
       inap.UltimaActualizacion,
       inap.FechaCreacion,
       inap.ModificadoPor,
       inap.CreadoPor,
       inap.FechaConveniogrlinicio,
       inap.FechaConveniogrlfin,
       inap.NombreConvenio
FROM PLADI.inap_gral inap
WHERE  inap.Deleted=0
ORDER BY inap.Clave desc;

END IF;


CALL sp_response();
END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_login
DROP PROCEDURE IF EXISTS `sp_login`;
DELIMITER //
CREATE PROCEDURE `sp_login`(
	IN `P_Usuario` VARCHAR(50),
	IN `P_Password` VARCHAR(50)
)
BEGIN

-- Declara Respuesta como variable local
DECLARE Respuesta INT DEFAULT 200;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    GET DIAGNOSTICS CONDITION 1 
        @sqlstateno = RETURNED_SQLSTATE, 
        @errno = MYSQL_ERRNO, 
        @text = MESSAGE_TEXT;

    SET @full_error = CONCAT("ERROR:(", @errno, ") ", @sqlstateno, " - ", @text);
    CALL sp_error(@full_error);
END;

-- Utiliza la variable local para Respuesta


IF (SELECT Deleted FROM PLADI.usuarios WHERE NombreUsuario = P_Usuario) = 0 THEN
    SELECT * FROM PLADI.usuarios WHERE NombreUsuario = P_Usuario;
ELSE
   
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Usuario No Existe';
    
END IF;


CALL sp_response();

END//
DELIMITER ;

-- Volcando estructura para procedimiento PLADI.sp_response
DROP PROCEDURE IF EXISTS `sp_response`;
DELIMITER //
CREATE PROCEDURE `sp_response`()
BEGIN

DECLARE Respuesta INT;
SET Respuesta = 200;
SELECT	Respuesta,	'EXITO' AS Mensaje;

END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
