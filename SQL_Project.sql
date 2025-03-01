-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2025 at 01:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `products_db`
--
CREATE DATABASE IF NOT EXISTS `products_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `products_db`;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `image`, `content`, `path`) VALUES
(1, 'ניהול מלאי', 'productsImage', 'מעקב אחר מצב המלאי בעגלת הקפה.', '/manger-product'),
(2, 'ניהול עובדים', 'arrangementImage', 'ניהול סידורי העבודה עבור העובדים.', '/arrangement'),
(3, 'דוחות', 'reportsImage', 'צפייה בדוחות המכירות היומיים, שבועיים וחודשיים.', '/reports'),
(4, 'מבצעים ואירועים', 'messegeImage', 'ניהול מבצעים ואירועים עבור לקוחות העגלה.', '/messege'),
(5, 'תחזוקה', 'salesImage', 'צפייה בהתראות תחזוקה וטיפול בציוד.', '/sales');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `SKU` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `experienceDate` date NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `SKU`, `price`, `experienceDate`, `quantity`) VALUES
(28, 'לחמניות', 'אגמי', 10.99, '2025-02-26', 25),
(29, 'גבינה לבנה 9%', 'תנובה', 6.99, '2025-02-18', 40),
(34, '444', '444', 44.00, '2025-02-03', 44),
(35, 'gffg', '3', 33.00, '2025-02-11', 33),
(36, '33', 'TF123', 55.00, '2025-02-18', 55);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_number`, `email`, `phone`, `first_name`, `last_name`, `username`, `password_hash`, `role`) VALUES
(6, '123456789', 'Admin@gmail.com', '1234567899', 'Admin', 'Admin', 'Admin123456', '$2b$10$61oil02IkQS5I/GpfhhXWOupUfCPfpOQYJydp7CdRPniGjDX1m7ae', 'admin'),
(7, '123456789', 'User@gmail.com', '1234567899', 'User', 'User', 'User123456', '$2b$10$N7TRe83wS19ewuE6BfATLOWlDBf37LN0ZdfXaocropEv0wJ.wCPuW', 'user'),
(8, '201519329', 'AvidanUser@gmail.com', '1234567899', 'Avidan', 'Salumi', 'AvidanUser123', '$2b$10$K2j3QNzQAvoE8DF19g4ETeyvMIX8vwKjIQ6ssoZdVPwCST5SwDQF2', 'user'),
(9, '123456789', 'Avidan@gmail.com', '1234567899', 'Avidan', 'Salumi', 'AvidanAdmin123', '$2b$10$3EJ1jL.XYjP3rsfo.HOtnuImLB3qqFmtmnyfG5q.xMOQmu9Yuz.XS', 'admin'),
(10, '318880119', 'sahh0123@gmail.com', '0545218003', 'סהר', 'וויסברוט', 'Sahar123456', '$2b$10$FIemel2XglKSzVbBMB5vtehcCbb3Xgu31lp9nPNztJqSLHO4QXaMC', 'admin'),
(11, '123456789', 'aaaa@gmail.com', '0506456887', 'bar', 'cohen', 'BarCohen123', '$2b$10$djlUTewOEHUR74pPNvA9ceJ4mYJEm/LDILIzVrDtHWDCzuR8S78Yi', 'admin'),
(12, '123456789', 'bar@gmail.com', '0506456887', 'bar', 'cohen', 'Bar123456', '$2b$10$aCj/Ml0YYBI1qBI86BMt4utZxeLWl0qxT0R2IJqExRhK8xuGXx6oW', 'admin'),
(13, '316397389', 'bar54547@gmail.com', '0506456887', 'bar', 'cohen', 'Bar1234567', '$2b$10$p8dzXOR1MCrquuvYMbFAhuiD4HU1aipAXZSfwPIAme0J1ADdqEEgC', 'admin'),
(14, '123456789', 'baraa@gmail.com', '1234567891', 'bar', 'cohen', '123456789', '$2b$10$VoevtBbumgfZzSOMoVzGx.1xdkuhve9za3U/nAee7bChVq4L7kR1.', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `day` varchar(10) DEFAULT NULL,
  `employee_name` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `hours` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`day`, `employee_name`, `date`, `hours`) VALUES
('ראשון', 'בר ', '2025-02-09', '08:00-15:00'),
('ראשון', 'אבידן ', '2025-02-09', '11:00-17:00'),
('ראשון', 'סהר', '2025-02-09', '14:00-20:00'),
('שני', 'בר ', '2025-02-09', '08:00-15:00'),
('שני', 'סהר', '2025-02-09', '11:00-17:00'),
('שני', 'אבידן ', '2025-02-09', '14:00-20:00'),
('שלישי', 'בר ', '2025-02-09', '08:00-15:00'),
('שלישי', 'סהר', '2025-02-09', '11:00-17:00'),
('שלישי', 'אבידן ', '2025-02-09', '14:00-20:00'),
('רביעי', 'בר ', '2025-02-09', '08:00-15:00'),
('רביעי', 'סהר', '2025-02-09', '11:00-17:00'),
('רביעי', 'אבידן ', '2025-02-09', '14:00-20:00'),
('חמישי', 'בר ', '2025-02-09', '08:00-15:00'),
('חמישי', 'אבידן ', '2025-02-09', '11:00-17:00'),
('חמישי', 'סהר', '2025-02-09', '14:00-20:00'),
('שישי', 'בר ', '2025-02-09', '08:00-15:00'),
('שישי', 'אבידן ', '2025-02-09', '11:00-17:00'),
('שישי', 'סהר', '2025-02-09', '14:00-20:00'),
('שבת', 'אבידן ', '2025-02-09', '08:00-15:00'),
('שבת', 'סהר', '2025-02-09', '11:00-17:00'),
('שבת', 'בר ', '2025-02-09', '14:00-20:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
