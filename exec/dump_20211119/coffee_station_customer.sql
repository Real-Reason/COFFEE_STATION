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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `sns_type` varchar(255) DEFAULT NULL,
  `firebase_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'customer0@coffee.station','고객영','ssafyssafy',NULL,'dlRjQ17fRHCQr8rvulH8Fk:APA91bHyopl598RxXamn6Vy1wGBNFWJSLzyHpciuZqzkxawloQcvGJ7oXGl1DmyFmzRHRi-Uia2FrbPbi7q-7k0ytni7EbzbFyilCdhcFE2nwRxwvg7TIT8YECr-zzUWO1DRgINSjm60'),(2,'customer1@coffee.station','고객일','ssafyssafy',NULL,'dPh0-s1ATZ6eazbDoCpriS:APA91bEwvCweZyQBG-l6CFym4ttycdKzK69fJeJS1ylokjPnImkEsuGSoJ8XgGjilOvbXJwkw2BpMU6T0t5XNIJ8HTapbOH_1bsr4Gz6JTscBY5Pbq-4yohpUg0M9Zcalec-LD6DAzim'),(3,'customer2@coffee.station','고객이','ssafyssafy',NULL,'dDhkuliySbeB_XgEynjRgr:APA91bFQEbjYGpXgWOpabfbK9qo3yFy5OWb7DfrRXoQ8S1lFDKNeppAPIUX1qO-jIoMGbTNyxubiHrz_aBoVckyYlapCSFuuuHHCo0ueUag0foT9hlvPAoAcGWcdMtq4ZnRp7UoVuc7j'),(4,'customer3@coffee.station','고객삼','ssafyssafy',NULL,'dlRjQ17fRHCQr8rvulH8Fk:APA91bHyopl598RxXamn6Vy1wGBNFWJSLzyHpciuZqzkxawloQcvGJ7oXGl1DmyFmzRHRi-Uia2FrbPbi7q-7k0ytni7EbzbFyilCdhcFE2nwRxwvg7TIT8YECr-zzUWO1DRgINSjm60'),(5,'customer4@coffee.station','고객사','ssafyssafy',NULL,NULL),(6,'customer5@coffee.station','고객오','ssafyssafy',NULL,'c0J_jF78RUijyYK2P1pq69:APA91bG8Z6YM79IzJ4I_c9TlL5mg-DmxVLSM65cDfzkAnqlcKQQMg2E_yqVRc6iEbXEOqKiwxuYnnqx29m2LIz0L7Mi5BcdaGXg8jq3D6wDcoLvnxSU9LHWZHoJ-T4Hsth9-wjTmY3QW'),(7,'customer6@coffee.station','고객육','ssafyssafy',NULL,'c0J_jF78RUijyYK2P1pq69:APA91bG8Z6YM79IzJ4I_c9TlL5mg-DmxVLSM65cDfzkAnqlcKQQMg2E_yqVRc6iEbXEOqKiwxuYnnqx29m2LIz0L7Mi5BcdaGXg8jq3D6wDcoLvnxSU9LHWZHoJ-T4Hsth9-wjTmY3QW'),(8,'customer7@coffee.station','고객칠','ssafyssafy',NULL,NULL),(9,'customer8@coffee.station','고객팔','ssafyssafy',NULL,NULL),(10,'customer9@coffee.station','고객구','ssafyssafy',NULL,NULL),(11,'test1111@ssafy.com','12qwaszx','12qwaszx12','LOCAL','fhPZdlpfQ0K6-t5mHnDdUC:APA91bE-BP-fs9xZAUlEWX5qSNWB6JfGuFmvqCT-g1ck0GekjFg3SDi2P7SwZTNRYaUEHY9UaE7frqS_-naW-OfJcdRwh64RgBqwYOXxeIZb7gDkdbiHc93NuXunW6SLZNeVRJ8DVFOr');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
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
