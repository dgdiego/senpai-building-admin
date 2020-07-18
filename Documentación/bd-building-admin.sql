-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: bulding-admin
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `apartaments`
--

DROP TABLE IF EXISTS `apartaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `building_id` int NOT NULL,
  `type` varchar(2) NOT NULL,
  `state` varchar(10) DEFAULT NULL,
  `contribution_type` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `apartament_building_type` (`number`,`building_id`,`type`),
  KEY `buildings_idx` (`building_id`),
  KEY `FK_apartments_contributionTypes_idx` (`contribution_type`),
  CONSTRAINT `buildings` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`),
  CONSTRAINT `FK_apartments_contributionTypes` FOREIGN KEY (`contribution_type`) REFERENCES `contribution_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartaments`
--

LOCK TABLES `apartaments` WRITE;
/*!40000 ALTER TABLE `apartaments` DISABLE KEYS */;
INSERT INTO `apartaments` VALUES (1,403,1,'IN','ARRENDADO',1),(8,404,1,'IN','ARRENDADO',1),(9,405,1,'IN','ARRENDADO',1),(21,406,1,'IN','ARRENDADO',1),(22,408,1,'IN','ARRENDADO',1),(23,101,14,'PR','',2),(24,102,14,'PR',NULL,2),(25,201,14,'PR',NULL,2),(26,202,14,'PR',NULL,2),(27,1,15,'IN','ARRENDADO',3),(28,2,15,'IN','ARRENDADO',3);
/*!40000 ALTER TABLE `apartaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buildings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES (1,'Quijote','Bonaparte 3179'),(14,'Nueva Palmira','Nueva Palmira 3654'),(15,'Torre Golf','Bvar Artigas 815'),(16,'Nogerol','Agraciada 2835'),(17,'Mirador','Benito Blanco 565'),(19,'Torres Maldivas','26 de Marzo 3566');
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contribution_types`
--

DROP TABLE IF EXISTS `contribution_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contribution_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building_id` int NOT NULL,
  `expenses_type` varchar(1) NOT NULL,
  `expenses_value` float NOT NULL,
  `saving_type` varchar(1) DEFAULT NULL,
  `saving_value` float DEFAULT NULL,
  `init_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_building_expensesType` (`building_id`,`expenses_type`),
  CONSTRAINT `FK_payments_building_id` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contribution_types`
--

LOCK TABLES `contribution_types` WRITE;
/*!40000 ALTER TABLE `contribution_types` DISABLE KEYS */;
INSERT INTO `contribution_types` VALUES (1,1,'$',1000,'$',600,'2020-01-01',NULL),(2,14,'$',500,'$',500,'2020-07-01',NULL),(3,15,'%',0.2566,'$',1000,'2020-07-01',NULL);
/*!40000 ALTER TABLE `contribution_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building_id` int NOT NULL,
  `date` date NOT NULL,
  `description` varchar(45) NOT NULL,
  `amount` float NOT NULL,
  `computable_amount` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `building_id_idx` (`building_id`),
  CONSTRAINT `building_id` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,1,'2020-01-01','Descripción',5000,0);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funds`
--

DROP TABLE IF EXISTS `funds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building_id` int NOT NULL,
  `date` date NOT NULL,
  `initial_amount` float NOT NULL,
  `credits` float NOT NULL,
  `debits` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `building_id_date` (`building_id`,`date`),
  CONSTRAINT `FK_building_id` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funds`
--

LOCK TABLES `funds` WRITE;
/*!40000 ALTER TABLE `funds` DISABLE KEYS */;
INSERT INTO `funds` VALUES (1,1,'2020-01-01',15000,10000,5000);
/*!40000 ALTER TABLE `funds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apartament_id` int NOT NULL,
  `date` date NOT NULL,
  `amount` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apartament_id_idx` (`apartament_id`),
  CONSTRAINT `apartament_id` FOREIGN KEY (`apartament_id`) REFERENCES `apartaments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'2020-06-01',2000),(2,1,'2020-07-01',2000),(3,8,'2020-06-01',2000),(4,8,'2020-07-01',2000),(5,9,'2020-06-01',2500),(6,9,'2020-07-01',2660),(7,21,'2020-06-01',3000),(8,21,'2020-07-01',3500),(9,22,'2020-06-03',1560),(10,22,'2020-07-08',2540);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summaries`
--

DROP TABLE IF EXISTS `summaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_summaries_building_date` (`building_id`,`date`),
  KEY `FK_summaries_buildingID_idx` (`building_id`),
  CONSTRAINT `FK_summaries_buildingID` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summaries`
--

LOCK TABLES `summaries` WRITE;
/*!40000 ALTER TABLE `summaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `summaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summaries_apartaments`
--

DROP TABLE IF EXISTS `summaries_apartaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summaries_apartaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `summary_id` int NOT NULL,
  `apartament_id` int NOT NULL,
  `old_owe` float NOT NULL,
  `payment_amount` float NOT NULL,
  `new_owe` float NOT NULL,
  `new_expenses_amount` float NOT NULL,
  `new_saving_amount` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_summaryID_idx` (`summary_id`),
  KEY `FK_apartamentID_idx` (`apartament_id`),
  CONSTRAINT `FK_apartamentID` FOREIGN KEY (`apartament_id`) REFERENCES `apartaments` (`id`),
  CONSTRAINT `FK_summaryID` FOREIGN KEY (`summary_id`) REFERENCES `summaries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summaries_apartaments`
--

LOCK TABLES `summaries_apartaments` WRITE;
/*!40000 ALTER TABLE `summaries_apartaments` DISABLE KEYS */;
/*!40000 ALTER TABLE `summaries_apartaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summaries_debits`
--

DROP TABLE IF EXISTS `summaries_debits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summaries_debits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `summary_id` int NOT NULL,
  `expense_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_summariesDebits_sumaries_idx` (`summary_id`),
  KEY `FK_summariesDebits_expenses_idx` (`expense_id`),
  CONSTRAINT `FK_summariesDebits_expenses` FOREIGN KEY (`expense_id`) REFERENCES `expenses` (`id`),
  CONSTRAINT `FK_summariesDebits_sumaries` FOREIGN KEY (`summary_id`) REFERENCES `summaries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summaries_debits`
--

LOCK TABLES `summaries_debits` WRITE;
/*!40000 ALTER TABLE `summaries_debits` DISABLE KEYS */;
/*!40000 ALTER TABLE `summaries_debits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Nueva','Es una nueva tarea'),(2,'Nueva II','Otra nueva tarea');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dgdiego','437694182d483e38ac422739bd9932a1',0),(2,'admin','c93ccd78b2076528346216b3b2f701e6',1),(6,'otrouser','bdb930f006a482ae2d4af266f816cf73',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-17 18:40:36
