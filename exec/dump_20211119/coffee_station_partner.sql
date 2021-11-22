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
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner` (
  `partner_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `firebase_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`partner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
INSERT INTO `partner` VALUES (1,'partner0@coffee.station','ssafyssafy','eYwBO1OCToKdcLMqQz0nqf:APA91bFlNUx7RaJqo8t4o2uHfWxHFT8OXB0unm3guhnD6r9maJR_pVTHmTTOrEbVb_0cWeocMazV26O9OqglD4ULdCDuHab8UGMe9lJ7ZOkwwuaZXIKn79F01JgsXrR8G40nRjx-UBuK'),(2,'partner1@coffee.station','ssafyssafy','dpeLmxKZTNuYINMNGSJRPR:APA91bF8PA_qgHDpSNHYv_-qi2WpZJiuW8j83GwFqhs5L-6mNzCV8z--TDSriLI4Xt0HUIhzbDDvb3ZWgzAijnGQ8fH8sV_2azFJBydo3LMLG_8vR3Hbzxko0k4CDaVEd7iQ-mpOGFny'),(3,'partner2@coffee.station','ssafyssafy','dpeLmxKZTNuYINMNGSJRPR:APA91bF8PA_qgHDpSNHYv_-qi2WpZJiuW8j83GwFqhs5L-6mNzCV8z--TDSriLI4Xt0HUIhzbDDvb3ZWgzAijnGQ8fH8sV_2azFJBydo3LMLG_8vR3Hbzxko0k4CDaVEd7iQ-mpOGFny'),(8,'tester0@ssafy.com','ssafyssafy','dpeLmxKZTNuYINMNGSJRPR:APA91bF8PA_qgHDpSNHYv_-qi2WpZJiuW8j83GwFqhs5L-6mNzCV8z--TDSriLI4Xt0HUIhzbDDvb3ZWgzAijnGQ8fH8sV_2azFJBydo3LMLG_8vR3Hbzxko0k4CDaVEd7iQ-mpOGFny'),(9,'tester2@ssafy.com','ssafyssafy','dpeLmxKZTNuYINMNGSJRPR:APA91bF8PA_qgHDpSNHYv_-qi2WpZJiuW8j83GwFqhs5L-6mNzCV8z--TDSriLI4Xt0HUIhzbDDvb3ZWgzAijnGQ8fH8sV_2azFJBydo3LMLG_8vR3Hbzxko0k4CDaVEd7iQ-mpOGFny'),(10,'tester3@ssafy.com','ssafyssafy','dpeLmxKZTNuYINMNGSJRPR:APA91bF8PA_qgHDpSNHYv_-qi2WpZJiuW8j83GwFqhs5L-6mNzCV8z--TDSriLI4Xt0HUIhzbDDvb3ZWgzAijnGQ8fH8sV_2azFJBydo3LMLG_8vR3Hbzxko0k4CDaVEd7iQ-mpOGFny'),(11,'tester4@ssafy.com','ssafyssafy','eYwBO1OCToKdcLMqQz0nqf:APA91bFlNUx7RaJqo8t4o2uHfWxHFT8OXB0unm3guhnD6r9maJR_pVTHmTTOrEbVb_0cWeocMazV26O9OqglD4ULdCDuHab8UGMe9lJ7ZOkwwuaZXIKn79F01JgsXrR8G40nRjx-UBuK'),(12,'tester6@ssafy.com','ssafyssafy',NULL),(15,'hk@coffee.station','ssafyssafy','eYwBO1OCToKdcLMqQz0nqf:APA91bFlNUx7RaJqo8t4o2uHfWxHFT8OXB0unm3guhnD6r9maJR_pVTHmTTOrEbVb_0cWeocMazV26O9OqglD4ULdCDuHab8UGMe9lJ7ZOkwwuaZXIKn79F01JgsXrR8G40nRjx-UBuK'),(16,'hk2@coffee.station','ssafyssafy','e0oGikU7S0iCn4_HYlSna4:APA91bEOX2CDbleGeRULBOYGehNoZL14hnrx9kl1dNxOvuq1-K-8Lefk88Rg9sJ4VJnYNLjtNYOZFxlKDKevMBFRA_74LTtdRrZzybG5MSdC1IL5j2l4MDHotYJvABkNxU2wLMEcPSmx'),(19,'partner4@coffee.station','ssafyssafy','eNHpfQxpQeS7WN9DVsJRp-:APA91bFfqrOaub9gC3O1BwUKtAH4vnhOgX_TuHfmiw81Wu44rjT1su6zgZ1NESAEiEaPkIO1El99rDppn9J401ctmDE6bR12AQBv1UN-qn_8ILKoY_IQai8v3WXuAEVDY4_8AGIajiaD'),(20,'partner99@coffee.station','ssafyssafy','eYwBO1OCToKdcLMqQz0nqf:APA91bFlNUx7RaJqo8t4o2uHfWxHFT8OXB0unm3guhnD6r9maJR_pVTHmTTOrEbVb_0cWeocMazV26O9OqglD4ULdCDuHab8UGMe9lJ7ZOkwwuaZXIKn79F01JgsXrR8G40nRjx-UBuK'),(21,'partner98@coffee.station','ssafyssafy','eYwBO1OCToKdcLMqQz0nqf:APA91bFlNUx7RaJqo8t4o2uHfWxHFT8OXB0unm3guhnD6r9maJR_pVTHmTTOrEbVb_0cWeocMazV26O9OqglD4ULdCDuHab8UGMe9lJ7ZOkwwuaZXIKn79F01JgsXrR8G40nRjx-UBuK'),(22,'test1119@ssafy.com','12qwaszx12','e-NbiQgVQrefRhQgKoGqV0:APA91bGBEG5zNfYpMc7mcrlUKy1ckcKRGBS2-qbN6MkvY1yjVWporhdOL7G9VSPcGOo8n71dP1jG7WPzBBViAmk4cJWoTm6MoDunKJD8qh8l7EgXn1HCqRFxH1HPbNXXFSrqvRgJmxnp');
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19  4:56:44
