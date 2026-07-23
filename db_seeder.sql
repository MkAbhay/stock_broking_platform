-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: internal_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `pan` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_code` (`client_code`),
  UNIQUE KEY `client_code_2` (`client_code`),
  UNIQUE KEY `client_code_3` (`client_code`),
  UNIQUE KEY `client_code_4` (`client_code`),
  UNIQUE KEY `client_code_5` (`client_code`),
  UNIQUE KEY `client_code_6` (`client_code`),
  UNIQUE KEY `client_code_7` (`client_code`),
  UNIQUE KEY `client_code_8` (`client_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rm`
--

DROP TABLE IF EXISTS `rm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rm` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'employee',
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_code` (`employee_code`),
  UNIQUE KEY `employee_code_2` (`employee_code`),
  UNIQUE KEY `employee_code_3` (`employee_code`),
  UNIQUE KEY `employee_code_4` (`employee_code`),
  UNIQUE KEY `employee_code_5` (`employee_code`),
  UNIQUE KEY `employee_code_6` (`employee_code`),
  UNIQUE KEY `employee_code_7` (`employee_code`),
  UNIQUE KEY `employee_code_8` (`employee_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rm_client_mapping`
--

DROP TABLE IF EXISTS `rm_client_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rm_client_mapping` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `rm_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rm_client_mapping_client_id_rm_id` (`client_id`,`rm_id`),
  KEY `rm_id` (`rm_id`),
  CONSTRAINT `rm_client_mapping_ibfk_15` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rm_client_mapping_ibfk_16` FOREIGN KEY (`rm_id`) REFERENCES `rm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trades`
--

DROP TABLE IF EXISTS `trades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trades` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `trade_id` varchar(20) NOT NULL,
  `client_id` int unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `symbol` varchar(10) NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `brokerage` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trade_id` (`trade_id`),
  UNIQUE KEY `trade_id_2` (`trade_id`),
  UNIQUE KEY `trade_id_3` (`trade_id`),
  UNIQUE KEY `trade_id_4` (`trade_id`),
  UNIQUE KEY `trade_id_5` (`trade_id`),
  UNIQUE KEY `trade_id_6` (`trade_id`),
  UNIQUE KEY `trade_id_7` (`trade_id`),
  UNIQUE KEY `trade_id_8` (`trade_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `trades_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-23  9:56:20
