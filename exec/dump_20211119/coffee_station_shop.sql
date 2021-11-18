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
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `shop_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `business_no` varchar(255) DEFAULT NULL,
  `close_at` varchar(255) DEFAULT NULL,
  `detail_address` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `intro` varchar(255) DEFAULT NULL,
  `location` geometry DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `open_at` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `partner_id` bigint DEFAULT NULL,
  `firebase_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`shop_id`),
  KEY `FKn3aoiyvuce9h0f8x6oo2uysg8` (`partner_id`),
  CONSTRAINT `FKn3aoiyvuce9h0f8x6oo2uysg8` FOREIGN KEY (`partner_id`) REFERENCES `partner` (`partner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'서울특별시 성북구 동소문동7가 2-21','8290901024','오후 8시','1층','@0_0.j','푸딩 찐맛집~ 너무 맛있다! 내가 주인이지만 맛있당. 마들렌도 맛있당~',_binary '\0\0\0\0\0\0\0\��E\�B@L�����_@','후와리','오전 10시 30분','050-6210-9747','OPEN','02830',1,''),(2,'서울특별시 성북구 아리랑로12길 3','1234567890','오후 11시','2층','@0_0.j','스터디하기 좋은 카페. 마카롱 찐맛집ㅋ',_binary '\0\0\0\0\0\0\0\��E\�B@L�����_@','아리랑로12길 3','오후 1시 30분','02-929-6664','READY','02827',2,NULL),(3,'서울특별시 성북구 동선동3가 28','6721200910','오후 8시','1층101호','@0_0.j','휘낭시에 아메리카노 맛집~ 분위기 좋고 유리잔 너무예쁨',_binary '\0\0\0\0\0\0\0��\�\�*\�B@���O�_@','Mobler','오후 12시','050-6210-9747','OPEN','02827',3,NULL),(14,'경기도 화성시','111110','11:00','동탄 반송동 2','yyy@naver.com','hello this is yujin',_binary '\0\0\0\0\0\0\0\0\0\0\0 \�A\0\0\0\00�@','yujin22','7:00','010-7475-2665','READY','31254',9,NULL),(15,'대전 서구 만년남로 8','1101941687','오후 11시 15분','제발좀','ㅎㅇㅋㅋㅋ','ㅎㅇㅋ',_binary '\0\0\0\0\0\0\0c�\�*3\�_@>�i\�.B@','건건커피','오전 09시 00분','01000000000','OPEN','35202',15,NULL),(16,'대전 서구 만년남로 8','1011115383','오후 11시 15분','우리집','ㅎㅇㅋㅋ','ㅋㅋ루삥뽕',_binary '\0\0\0\0\0\0\0c�\�*3\�_@>�i\�.B@','건타벅스','오전 09시 00분','01012345678','OPEN','35202',16,NULL),(19,'서울 성북구 돈암동 639','2152050584','오후 10시 00분','니가사는그집','아이롱포뎃','히얼위고',_binary '\0\0\0\0\0\0\0U�+��\�B@:\�\�\���_@','건스커피','오전 09시 00분','01012345678','OPEN','02827',19,NULL),(20,'경기 성남시 분당구 판교백현로 104','1101228496','오후 01시 09분','fff','dfdfdfd@instagram','this is yujin cafe',_binary '\0\0\0\0\0\0\0D[���B@�\�o\�_@','yyyujin','오전 05시 15분','00000000000','OPEN','13541',9,NULL);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19  4:56:43
