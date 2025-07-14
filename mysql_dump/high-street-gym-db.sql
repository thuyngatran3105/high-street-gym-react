-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: high-street-gym-fullstack
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(45) NOT NULL,
  `activity_description` varchar(600) NOT NULL,
  `activity_duration` varchar(50) NOT NULL,
  `activity_removed` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `activity_id_UNIQUE` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga','Our gym yoga classes offer a blend of physical postures, breathing exercises, and mindfulness techniques to promote overall well-being. Led by experienced instructors, these sessions cater to all levels and focus on enhancing flexibility, strength, and mental clarity. Participants can expect a serene environment conducive to relaxation and self-discovery, fostering stress relief and inner peace. Whether you a beginner or experienced yoga, our classes provide a welcoming space to rejuvenate your body and mind.','30 minutes',0),(2,'Pilates','\nPilates at High Street Gym emphasizes core strength, flexibility, and alignment. Led by certified instructors, our classes offer a balanced workout through controlled movements and mindful exercises, suitable for all levels. Experience the benefits of improved posture, muscle tone, and relaxation with Pilates at High Street Gym.','30 minutes',0),(3,'Abs','\nOur Abs classes provide tailored workouts to strengthen core muscles effectively. Led by experienced trainers, sessions feature a variety of exercises such as crunches and leg raises. Enhance core stability, improve posture, and achieve a toned midsection. Whether you\'re aiming for a sculpted six-pack or overall core strength, our classes cater to diverse fitness goals. Join us to experience dynamic workouts and transform your abdominal muscles.','30 minutes',0),(4,'HIIT','At High Street Gym, our HIIT (High-Intensity Interval Training) classes are designed to push your limits and maximize your workout in minimal time. HIIT involves short bursts of intense exercise followed by brief recovery periods, allowing you to burn calories, improve cardiovascular fitness, and boost metabolism effectively. Led by skilled trainers, our HIIT sessions cater to all fitness levels, making them an ideal choice for those looking to challenge themselves and achieve results efficiently.','30 minutes',0),(5,'Indoor cycling','Indoor cycling classes at High Street Gym provide a high-energy workout experience, led by expert instructors. Pedal through exhilarating routines set to music, engaging your entire body and enhancing cardiovascular fitness. It\'s an invigorating way to achieve your fitness goals while enjoying a motivating group atmosphere.','1 hour',0),(6,'Boxing','High Street Gym\'s boxing classes deliver high-energy workouts led by expert instructors. Perfect for all fitness levels, these sessions blend punch combinations, footwork drills, and cardio exercises to enhance strength and agility. Join us to experience a dynamic and empowering boxing experience!','1 hour',0),(9,'Zumba','Zumba at High Street Gym is a dynamic dance fitness program that blends Latin rhythms with easy-to-follow moves. Led by certified instructors, a fun way to burn calories and improve fitness. Join us for an energetic workout that will leave you feeling invigorated!','1 hour',1),(10,'Zumba','Zumba at High Street Gym is a dynamic dance fitness program that blends Latin rhythms with easy-to-follow moves. Led by certified instructors, a fun way to burn calories and improve fitness. Join us for an energetic workout that will leave you feeling invigorated!','1 hour',0),(126,'Meditation','Our Meditation classes at High Street Gym offer a tranquil environment \n            where participants can focus on mindfulness, relaxation, and inner peace. Led by experienced \n            instructors, these sessions guide you through various meditation techniques designed to \n            reduce stress, improve mental clarity, and promote overall well-being. Whether you are new \n            to meditation or an experienced practitioner, our classes provide a welcoming space to \n            rejuvenate your mind and spirit.','30 minutes',0),(127,'Tai Chi','Our Tai Chi classes offer a low-impact workout that promotes relaxation, balance, and \n            overall well-being. This ancient Chinese practice involves slow, flowing movements and deep breathing, \n            making it an excellent choice for reducing stress and improving mental clarity. Suitable for all fitness levels, \n            Tai Chi provides a holistic approach to health and wellness.','1 hour',0),(128,'Breathwork','Breathwork at High Street Gym is designed to help participants harness the power of controlled \n            breathing to reduce stress, increase energy, and enhance mental focus. These sessions are led by expert \n            instructors who guide you through various breathing techniques, making it a perfect complement to your fitness routine.','30 minutes',0),(129,'Meditation','Our Meditation classes at High Street Gym offer a tranquil environment \n            where participants can focus on mindfulness, relaxation, and inner peace. Led by experienced \n            instructors, these sessions guide you through various meditation techniques designed to \n            reduce stress, improve mental clarity, and promote overall well-being. Whether you are new \n            to meditation or an experienced practitioner, our classes provide a welcoming space to \n            rejuvenate your mind and spirit.','30 minutes',0),(130,'Tai Chi','Our Tai Chi classes offer a low-impact workout that promotes relaxation, balance, and \n            overall well-being. This ancient Chinese practice involves slow, flowing movements and deep breathing, \n            making it an excellent choice for reducing stress and improving mental clarity. Suitable for all fitness levels, \n            Tai Chi provides a holistic approach to health and wellness.','1 hour',0),(131,'Breathwork','Breathwork at High Street Gym is designed to help participants harness the power of controlled \n            breathing to reduce stress, increase energy, and enhance mental focus. These sessions are led by expert \n            instructors who guide you through various breathing techniques, making it a perfect complement to your fitness routine.','30 minutes',0),(132,'Meditation','Our Meditation classes at High Street Gym offer a tranquil environment \n            where participants can focus on mindfulness, relaxation, and inner peace. Led by experienced \n            instructors, these sessions guide you through various meditation techniques designed to \n            reduce stress, improve mental clarity, and promote overall well-being. Whether you are new \n            to meditation or an experienced practitioner, our classes provide a welcoming space to \n            rejuvenate your mind and spirit.','30 minutes',0),(133,'Tai Chi','Our Tai Chi classes offer a low-impact workout that promotes relaxation, balance, and \n            overall well-being. This ancient Chinese practice involves slow, flowing movements and deep breathing, \n            making it an excellent choice for reducing stress and improving mental clarity. Suitable for all fitness levels, \n            Tai Chi provides a holistic approach to health and wellness.','1 hour',0),(134,'Breathwork','Breathwork at High Street Gym is designed to help participants harness the power of controlled \n            breathing to reduce stress, increase energy, and enhance mental focus. These sessions are led by expert \n            instructors who guide you through various breathing techniques, making it a perfect complement to your fitness routine.','30 minutes',0),(135,'Tai Chi','Our Tai Chi classes offer a low-impact workout that promotes relaxation, balance, and \n            overall well-being. This ancient Chinese practice involves slow, flowing movements and deep breathing, \n            making it an excellent choice for reducing stress and improving mental clarity. Suitable for all fitness levels, \n            Tai Chi provides a holistic approach to health and wellness.','1 hour',0),(136,'Meditation','Our Meditation classes at High Street Gym offer a tranquil environment \n            where participants can focus on mindfulness, relaxation, and inner peace. Led by experienced \n            instructors, these sessions guide you through various meditation techniques designed to \n            reduce stress, improve mental clarity, and promote overall well-being. Whether you are new \n            to meditation or an experienced practitioner, our classes provide a welcoming space to \n            rejuvenate your mind and spirit.','30 minutes',0),(137,'Breathwork','Breathwork at High Street Gym is designed to help participants harness the power of controlled \n            breathing to reduce stress, increase energy, and enhance mental focus. These sessions are led by expert \n            instructors who guide you through various breathing techniques, making it a perfect complement to your fitness routine.','30 minutes',0),(138,'Meditation','Our Meditation classes at High Street Gym offer a tranquil environment \n            where participants can focus on mindfulness, relaxation, and inner peace. Led by experienced \n            instructors, these sessions guide you through various meditation techniques designed to \n            reduce stress, improve mental clarity, and promote overall well-being. Whether you are new \n            to meditation or an experienced practitioner, our classes provide a welcoming space to \n            rejuvenate your mind and spirit.','30 minutes',0),(139,'Breathwork','Breathwork at High Street Gym is designed to help participants harness the power of controlled \n            breathing to reduce stress, increase energy, and enhance mental focus. These sessions are led by expert \n            instructors who guide you through various breathing techniques, making it a perfect complement to your fitness routine.','30 minutes',0),(140,'Tai Chi','Our Tai Chi classes offer a low-impact workout that promotes relaxation, balance, and \n            overall well-being. This ancient Chinese practice involves slow, flowing movements and deep breathing, \n            making it an excellent choice for reducing stress and improving mental clarity. Suitable for all fitness levels, \n            Tai Chi provides a holistic approach to health and wellness.','1 hour',0);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_datetime` datetime NOT NULL,
  `post_user_id` int NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_content` varchar(600) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_post_user_idx` (`post_user_id`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`post_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (66,'2024-06-03 23:30:08',3,'HOW TO STAY HEALTH','Be physically active for 30 minutes most days of the week. Break this up into three 10-minute sessions when pressed for time. Healthy movement may include walking, sports, dancing, yoga, running or other activities you enjoy. Eat a well-balanced, low-fat diet with lots of fruits, vegetables and whole grains, vegetables and whole grains'),(68,'2024-08-17 20:11:56',2,'This is a new blog','Today is Sunday'),(71,'2024-08-17 20:15:16',10,'THIS IS ANOTHER NEW POST','Yesterday is Saturday');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_user_id` int NOT NULL,
  `booking_class_id` int NOT NULL,
  `booking_created_datetime` datetime NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_booking_user_idx` (`booking_user_id`),
  KEY `fk_booking_class_idx` (`booking_class_id`),
  CONSTRAINT `fk_booking_class` FOREIGN KEY (`booking_class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `fk_booking_user` FOREIGN KEY (`booking_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (18,2,6,'2024-04-28 06:11:14'),(25,10,10,'2024-04-30 22:54:48'),(59,2,32,'2024-06-02 15:42:10'),(60,2,1,'2024-06-02 15:42:16'),(61,2,17,'2024-06-02 15:42:31'),(62,2,2,'2024-06-02 15:42:37'),(63,2,13,'2024-06-02 15:42:55'),(64,10,1,'2024-06-02 15:43:31'),(65,10,17,'2024-06-02 15:43:40'),(66,10,19,'2024-06-02 15:44:05'),(72,10,5,'2024-06-02 12:19:08'),(74,10,21,'2024-06-02 12:20:32'),(87,66,32,'2024-06-03 08:32:06'),(103,66,39,'2024-09-07 06:53:26'),(124,66,40,'2024-09-09 15:04:30'),(125,66,41,'2024-09-09 15:04:43'),(126,10,41,'2024-09-09 15:06:44'),(127,10,42,'2024-09-09 15:06:46'),(128,10,40,'2024-09-09 15:06:50'),(129,72,43,'2024-09-09 17:36:44'),(130,72,42,'2024-09-09 17:38:18'),(131,66,43,'2024-09-10 04:54:26'),(132,66,44,'2024-09-11 11:18:51'),(149,66,42,'2024-09-13 20:09:48'),(150,66,2,'2024-09-23 01:56:17'),(153,87,13,'2024-09-23 11:46:37'),(154,87,8,'2024-09-23 11:47:02'),(155,87,16,'2024-09-23 11:47:07'),(156,87,5,'2024-09-23 11:47:51'),(160,72,8,'2024-09-23 11:55:07'),(161,72,9,'2024-09-23 11:55:10'),(162,72,13,'2024-09-23 11:55:15'),(163,72,5,'2024-09-23 12:10:30'),(169,66,18,'2024-10-09 14:05:35'),(178,66,34,'2024-10-18 01:42:47'),(179,66,5,'2024-10-23 15:46:13');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_datetime` datetime NOT NULL,
  `class_location_id` int NOT NULL,
  `class_activity_id` int NOT NULL,
  `class_trainer_user_id` int NOT NULL,
  `class_removed` tinyint NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `fk_class_activity_idx` (`class_activity_id`),
  KEY `fk_class_location_idx` (`class_location_id`),
  KEY `fk_class_user_idx` (`class_trainer_user_id`),
  CONSTRAINT `fk_class_activity` FOREIGN KEY (`class_activity_id`) REFERENCES `activities` (`activity_id`),
  CONSTRAINT `fk_class_location` FOREIGN KEY (`class_location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `fk_class_user` FOREIGN KEY (`class_trainer_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'2024-09-23 18:00:00',1,1,5,1),(2,'2024-09-23 17:30:00',2,2,5,1),(5,'2024-10-24 18:30:00',3,5,4,1),(6,'2024-09-01 18:30:00',4,6,5,1),(8,'2024-10-15 17:00:00',3,1,4,0),(9,'2024-10-09 18:30:00',2,9,5,1),(10,'2024-09-25 18:30:00',2,3,5,1),(12,'2024-09-25 17:30:00',5,4,5,1),(13,'2024-10-16 18:00:00',2,4,5,1),(16,'2024-09-22 17:30:00',2,5,4,1),(17,'2024-09-28 18:00:00',4,6,5,1),(18,'2024-10-16 18:30:00',2,1,4,0),(19,'2024-10-16 17:00:00',3,2,4,0),(21,'2024-06-05 18:30:00',2,6,4,1),(22,'2024-05-25 18:30:00',1,1,4,1),(23,'2024-10-16 17:30:00',1,9,90,1),(24,'2024-05-29 00:00:00',1,4,4,1),(25,'2024-06-01 17:30:00',1,5,4,1),(26,'2024-10-17 18:30:00',1,1,90,0),(27,'2024-10-11 18:30:00',2,4,5,1),(28,'2024-05-30 18:00:00',1,4,4,1),(29,'2024-05-31 17:30:00',3,2,4,1),(32,'2024-10-17 18:00:00',3,5,5,0),(33,'2024-10-17 17:30:00',3,5,4,0),(34,'2024-10-18 18:00:00',3,9,93,1),(38,'2024-10-18 17:30:00',2,1,5,1),(39,'2024-10-10 17:00:00',1,1,5,0),(40,'2024-09-10 18:00:00',1,1,4,0),(41,'2024-09-10 17:30:00',2,2,5,0),(42,'2024-09-14 17:30:00',3,2,4,0),(43,'2024-09-01 17:30:00',3,5,4,1),(44,'2024-10-14 18:30:00',4,6,5,1),(45,'2024-09-24 18:30:00',3,5,90,0);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(45) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Ashgrove'),(2,'Brisbane City'),(3,'Chermside'),(4,'Graceville'),(5,'Westlake'),(101,'Coorparoo'),(102,'Paddington'),(103,'Riverhills'),(104,'Kangaroo Point'),(105,'Kelvin Grove'),(106,'Coorparoo'),(107,'Riverhills'),(108,'Paddington'),(109,'Kelvin Grove'),(110,'Kangaroo Point'),(111,'Coorparoo'),(112,'Riverhills'),(113,'Paddington'),(114,'Kangaroo Point'),(115,'Kelvin Grove'),(116,'Coorparoo'),(117,'Paddington'),(118,'Riverhills'),(119,'Kelvin Grove'),(120,'Kangaroo Point');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(75) NOT NULL,
  `user_role` enum('Member','Admin','Trainer') NOT NULL,
  `user_phone` varchar(45) NOT NULL,
  `user_firstname` varchar(50) NOT NULL,
  `user_lastname` varchar(50) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_removed` tinyint NOT NULL DEFAULT '0',
  `user_auth_key` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'jane@gmail.com','$2a$10$AaEGxkXsoIG1/Mp37T5He.EnQB2SVrgdVOLVnbCNWTRIkQtS/iG.G','Member','0223456789','Jane','Doe','38 Ara Street, Camp Hill',0,NULL),(3,'rachel@gmail.com','$2a$10$EVS7ULrW8m2B9L4Z7QWxEeDlSW6jYYHQLdbxnKdvsvYxEvejgWqs2','Admin','0000000000','Rachel','Doe','1 Newdegate Street, Greenslopes',0,'7b450475-ad06-4991-875c-29ac51e405e0'),(4,'jessica@gmail.com','$2a$10$ho0P3.YqUYNSnQDLqgzSkOiXm4bkZeJBH2Hkmhph5LpwubvZNiFO2','Trainer','0412345678','Jessica','Doe','10 Newdegate Street, Greenslopes',0,NULL),(5,'haley@gmail.com','$2a$10$LyNQK1V7yZLddHG1ILaBy.JAQpl5wYR/qvzYPjHxB2S1OPhh87zri','Trainer','0200000002','Haley','Bell','20 Ara Street, Camp Hill',0,NULL),(10,'kat@gmail.com','$2a$10$JlviPPE1y35vXJiT3fnexOM4Y/QbqR29A9NqKlIGPZE09yqVgTfRG','Member','0400000000','Kat','Tran','250 Sumners Road, Riverhills',0,NULL),(66,'jess@gmail.com','$2a$10$uiLCPlElJJtAc0CbajEELuDafutyt0p.rN3QF4uKaqxr0I8DHo1V6','Member','0300000004','Jess','King','33 Kirkland Avenue, Coorparoo',0,NULL),(72,'jayde@gmail.com','$2a$10$CcpP0gxz2USuvuTNEwCYF.BtFHP.bs/lW4sEZZ56YbeIF8YHglYD2','Member','0800000000','Jayde','Doe','23 Kirkland Avenue, Coorparoo',0,NULL),(87,'jasper@gmail.com','$2a$10$K/Cm.lD1MCP/uyEEPVYqFOn4fvDDoE/K9fnks3aeOcAXCJIXwj7lC','Member','0240000000','Jasper','Riedel-Rutterford','16 Kirkland Avenue, Coorparoo',0,NULL),(90,'mason@gmail.com','$2a$10$e5ZOwLZfoea.b2jGpqDNLu7CDQTGjmr4NBtCLbop/1k6OIRAhcol2','Trainer','0700000000','Mason','Bell','250 Sumners Road, Riverhills',0,NULL),(93,'harry@gmail.com','$2a$10$1omR1mgRSn.Ly2jO5q1uwuecBYKPSc0Pkjd6tCr86EvnYUCm6/.MW','Trainer','0300000005','Harry','Bell','22 Kirkland Avenue, Coorparoo',0,NULL);
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

-- Dump completed on 2025-07-14 11:23:24
