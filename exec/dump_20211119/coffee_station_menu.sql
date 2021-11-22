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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` bigint NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  `is_signature` bit(1) DEFAULT NULL,
  `menu_status` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `category_id` bigint NOT NULL,
  `shop_id` bigint NOT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `FKww84tou7nixng06lmxawvcre` (`category_id`),
  KEY `FK15isgm71fu9ptldp68fa4xa5y` (`shop_id`),
  CONSTRAINT `FK15isgm71fu9ptldp68fa4xa5y` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
  CONSTRAINT `FKww84tou7nixng06lmxawvcre` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444616_20200525172108461.png',_binary '','SALE','아메리카노',4000,1,1),(2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XxrBZvxtqfDdAfTfZonb2GlvSyYAZPZXli4PKd-5VC-5hjCcs76NMSDewwyuTDI8Qlc&usqp=CAU',_binary '\0','SALE','망고스무디',6000,2,1),(3,'https://contents.sixshop.com/thumbnails/uploadedFiles/122679/product/image_1585185767953_750.jpg',_binary '','SOLD_OUT','휘낭시에',3800,3,1),(4,'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/e0xcwlaaBnhuIemLaGQD5P-jX1U.JPG',_binary '\0','NOT_SALE','아포가토',5500,1,1),(5,'https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444616_20200525172108461.png',_binary '','SALE','아메리카노',4000,1,2),(6,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XxrBZvxtqfDdAfTfZonb2GlvSyYAZPZXli4PKd-5VC-5hjCcs76NMSDewwyuTDI8Qlc&usqp=CAU',_binary '\0','SALE','망고스무디',6000,2,2),(7,'https://contents.sixshop.com/thumbnails/uploadedFiles/122679/product/image_1585185767953_750.jpg',_binary '','SOLD_OUT','휘낭시에',3800,3,2),(8,'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/e0xcwlaaBnhuIemLaGQD5P-jX1U.JPG',_binary '\0','SALE','아포가토',5500,1,2),(9,'https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444616_20200525172108461.png',_binary '','SALE','아메리카노',4000,1,3),(10,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XxrBZvxtqfDdAfTfZonb2GlvSyYAZPZXli4PKd-5VC-5hjCcs76NMSDewwyuTDI8Qlc&usqp=CAU',_binary '\0','SALE','망고스무디',6000,2,3),(11,'https://contents.sixshop.com/thumbnails/uploadedFiles/122679/product/image_1585185767953_750.jpg',_binary '','SALE','휘낭시에',3800,3,3),(12,'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/e0xcwlaaBnhuIemLaGQD5P-jX1U.JPG',_binary '\0','SOLD_OUT','아포가토',5500,1,3),(13,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/6f7b62e2-a4d3-4a76-a3b9-85eda9dc41d3/1',_binary '\0','NOT_SALE','cofi',1000,1,2),(15,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/eb4a0bd3-2ca0-4027-9bc4-a06148f9bd8f/1',_binary '\0','NOT_SALE','11',100,4,2),(17,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/19633c77-2a3f-42ca-a663-6f83e2a42fb4/1',_binary '\0','NOT_SALE','test0219',1234,3,2),(19,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/2938ad42-c609-46c0-ab2f-e7e5ec60adb3/1',_binary '\0','NOT_SALE','good cofe',10000,2,2),(20,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/9ec5ca04-c6e2-4b2d-a6ef-ba603323401f/1',_binary '\0','NOT_SALE','good c',1000,3,2),(21,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/4b46065f-3c67-43ab-8034-3f93737d124b/1',_binary '\0','NOT_SALE','test0241',111111,1,2),(22,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/b1626733-1560-4b21-b26f-ccf274320f95/1',_binary '\0','NOT_SALE','hahah',123456,2,2),(23,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/69caf031-51fe-4bff-bf9c-766c52f82361/1',_binary '\0','NOT_SALE','qwqwqw',12345,4,2),(24,'https://coffee-station.s3.ap-northeast-2.amazonaws.com/menu/ed6712cf-cd98-4afa-a09a-d700d5ac0a89/1',_binary '\0','NOT_SALE','test22332',1234,4,2);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19  4:56:46
