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
-- Table structure for table `shop_image`
--

DROP TABLE IF EXISTS `shop_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_image` (
  `shop_image_id` bigint NOT NULL AUTO_INCREMENT,
  `idx` int NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `shop_id` bigint NOT NULL,
  PRIMARY KEY (`shop_image_id`),
  KEY `FKhbt16qyh0yo02405h3lyopqbc` (`shop_id`),
  CONSTRAINT `FKhbt16qyh0yo02405h3lyopqbc` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_image`
--

LOCK TABLES `shop_image` WRITE;
/*!40000 ALTER TABLE `shop_image` DISABLE KEYS */;
INSERT INTO `shop_image` VALUES (1,1,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/4.jpg',1),(2,2,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/5.jpg',1),(3,1,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/6.jpg',2),(4,2,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/7.jpg',2),(5,1,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/8.jpg',3),(6,2,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/9.jpg',3),(7,1,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/shop/9.jpg',19);
/*!40000 ALTER TABLE `shop_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19  4:56:42
