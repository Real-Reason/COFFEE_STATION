-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 3.38.99.110    Database: coffee_station
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `menu_size`
--

DROP TABLE IF EXISTS `menu_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_size` (
  `menu_size_id` bigint NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `menu_id` bigint NOT NULL,
  `size_id` bigint NOT NULL,
  PRIMARY KEY (`menu_size_id`),
  KEY `FKg4g774pubin2py1ktvlhemd00` (`menu_id`),
  KEY `FK9b29wg6xg4ml0mpt5qti10idd` (`size_id`),
  CONSTRAINT `FK9b29wg6xg4ml0mpt5qti10idd` FOREIGN KEY (`size_id`) REFERENCES `size` (`size_id`),
  CONSTRAINT `FKg4g774pubin2py1ktvlhemd00` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_size`
--

LOCK TABLES `menu_size` WRITE;
/*!40000 ALTER TABLE `menu_size` DISABLE KEYS */;
INSERT INTO `menu_size` VALUES (1,0,1,1),(2,0,2,1),(3,0,4,1),(4,0,5,2),(5,500,5,3),(6,800,5,4),(7,0,6,1),(8,0,8,1),(9,0,9,5),(10,500,9,6),(11,1000,9,7),(12,1000,10,1),(13,1000,12,1),(14,0,3,1),(15,0,7,1),(16,0,11,1),(17,300,15,2),(18,300,15,2),(19,500,15,3),(20,500,15,3),(21,500,15,3),(22,800,15,4),(23,800,15,4),(24,800,15,4),(25,800,15,4),(26,800,15,4),(27,800,15,4),(28,800,15,4),(29,800,15,4),(30,800,15,4),(31,800,15,4),(32,1000,15,5),(33,1000,15,5),(34,1000,15,5),(35,1000,15,5),(36,0,15,1),(37,800,15,4),(38,1200,15,6),(39,1500,15,7),(40,800,15,4),(41,800,15,4),(42,1000,15,5),(43,1000,15,5),(44,1200,15,6),(45,1200,15,6),(46,1500,15,7),(47,1500,15,7),(48,300,15,2),(49,300,15,2),(50,300,15,2),(51,300,15,2),(52,500,15,3),(53,800,15,4),(54,800,15,4),(55,1000,15,5),(56,1000,15,5),(57,0,15,1),(63,0,19,1),(64,300,19,2),(65,500,19,3),(67,800,19,4),(70,1000,19,5),(71,1200,19,6),(72,1500,19,7),(73,0,20,1),(74,0,21,1),(79,300,21,2),(80,500,21,3),(81,0,23,1),(82,500,23,3),(83,1000,23,5),(85,1500,23,7),(86,0,24,1),(87,300,24,2),(88,500,24,3),(89,800,24,4),(90,1000,24,5),(91,1200,24,6),(92,1500,24,7);
/*!40000 ALTER TABLE `menu_size` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19  4:56:45
